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
    }
});

schema.methods.getRating = function () {
    return mongoose.model('Review').find({car: this.id})
    .then(reviews => {
        if (!reviews.length) return;
        var sum = 0;
        reviews.forEach(review => sum += review.stars);
        return Math.floor(sum / reviews.length);
    });
};

mongoose.model('Car', schema);