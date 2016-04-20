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
    price: {
        type: Number,
        default: 0
    },
    shipping: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zip: {
            type: String,
            validator: function (v) {
                return /^\d{5}$/.test(v);
            }
        }
    },
    billing: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zip: {
            type: String,
            validator: function (v) {
                return /^\d{5}$/.test(v);
            }
        }
    }
});

mongoose.model('Order', schema);

schema.methods.getPrice = function () {
    return this.constructor.findById(this.id).populate('cars')
    .then(order => order.cars.reduce((total,car) => total += car.price,0));
};

schema.statics.populateCars = function (carRefs) {
    return Car.find({_id: {$in: carRefs}});
};

schema.post('save', function (doc) {
    if (doc.completed) {
        var updates = doc.cars.map(car => {
            car.quantity--; // Reduces the quantity of all of the cars in the purchase by 1
            return car.save();
        }); // updates is an array of Promises
        return Promise.all(updates)
        .then(function (updatedCars) {
            updatedCars.map(function (car) {
                if (car.quantity === 0) { // If a car still has inventory, skip
                    return mongoose.model('Order').find({cars: car._id, completed: false}) // Finds all orders that include the carId and are not completed
                    .then(function (orders) {
                        orders = orders.map(function (order) {
                            order.cars.splice(order.cars.indexOf(car._id), 1); // Removes the car from the array of carIds in the order
                            return order.save();
                        });
                        return Promise.all(orders); // Resolve all of the modified orders
                    })
                    .then(null, console.error.bind(console));
                }
            });
        })
        .then(null,console.error.bind(console));
    }
});

schema.virtual('quantity').get(function () { return this.cars.length; });
