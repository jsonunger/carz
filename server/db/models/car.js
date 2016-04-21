'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    model: {
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
       default: 5
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
    type: {
        type: String,
        required: true,
        enum: ['Car','Truck','SUV','Van','Minivan']
    },
    rating: {
        type: Number
    }
});

schema.methods.setRating = function () {
    return mongoose.model('Review').find({car: this.id})
    .then(function (reviews) {
        if (!reviews.length) return;
        var sum = reviews.reduce((total,review) => total + review.stars,0);
        return Math.floor(sum / reviews.length);
    });
};

mongoose.model('Car', schema);