'use strict';
var mongoose = require('mongoose');
var Car = mongoose.model('Car');
var Promise = require('bluebird');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }],
    orderedCars: [Car.schema],
    completed: {
        type: Boolean,
        default: false
    },
    datePlaced: Date,
    price: {
        type: Number,
        default: 0
    },
    shipping: {
        type: Number,
        default: 0
    },
    tax: {
        type: Number,
        default: 0
    },
    shipping: require('./address.js'),
    billing: require('./address.js')
});

schema.statics.findOrCreate = function(user){
    var self = this;
    return self.findOne({user: user, completed: false})
    .then(function(order){
        if(!order) return self.create({user: user});
        return order;
    })
    .then(null, console.error.bind(console));
};

schema.methods.populateCars = function () {
    return Car.find({_id: {$in: this.cars}});
};

schema.methods.getPrice = function () {
    let self = this;
    return self.populateCars()
    .then(function (cars) {
        return cars.reduce((total,car) => total += car.price,0);
    })
    .then(null, console.error.bind(console));
};

schema.pre('save', function (next) {
    let self = this;
    this.getPrice()
    .then(function (price) {
        self.price = price;
        next();
    })
    .then(null, next);
});

/*
This post-save hook functions as inventory control when a car is no longer in stock.
The hook goes through all pending orders which include the car in question and removes the car from all
of the orders.
*/
schema.post('save', function (doc, next) {
    if (!doc.completed) return next();

    var updates = doc.cars.map(function (car) {
        console.log(car);
        car.quantity--; // Reduces the quantity of all of the cars in the purchase by 1
        return car.save();
    }); // updates is an array of Promises

    Promise.all(updates)
    .then(function (updatedCars) {
        return updatedCars.filter(car => car.quantity === 0);
    })
    .then(function (zeroQuantityCars) {
        return Promise.all(zeroQuantityCars.map(function (car) {
            return mongoose.model('Order').find({cars: car._id, completed: false})
            .then(function (orders) {
                orders = orders.map(function (order) {
                    order.cars.splice(order.cars.indexOf(car._id), 1); // Removes the car from the array of carIds in the order
                    return order.save();
                });
                return Promise.all(orders);
            })
            .then(function (resolvedOrders) {
                next();
            })
            .then(null, console.error.bind(console))
        }));
    })
    .then(function () {
        next();
    })
    .then(null,next);
});

schema.virtual('quantity').get(function () { return this.cars.length; });

mongoose.model('Order', schema);
