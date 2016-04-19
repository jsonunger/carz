'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
       type: Number,
       default: 1
    },
    photo: {
        type: String,
        default: 'http://fillmurray.com/200/200'
    },
    make: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Sedan','Crossover','Luxury','Coupe','SUV','Hybird','Truck','Wagon','Hatchback','Convertible','Van','Electric']
    }
});

mongoose.model('Car', schema);
