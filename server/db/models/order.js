'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    cars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }],
    completed: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
    }
});

schema.methods.getPrice = function () {
    return this.constructor.findById(this.id).populate('cars')
    .then(cars => cars.reduce((total,car) => total += car.price,0));
};

schema.virtual('quantity').get(function () { return this.cars.length; });

mongoose.model('Order', schema);