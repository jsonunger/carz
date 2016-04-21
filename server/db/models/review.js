'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    },
    stars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    content: {
        type: String,
        required: true,
        min: 1,
        max: 140
    },
    likes: Number,
    dislikes: Number
});

// // BONUS
// schema.virtual('weight').get(function () {
//     return this.likes / (this.likes+this.dislikes > 0 ? this.likes+this.dislikes : 1);
// });

schema.post('save', function (doc,next) {
    var car;
    mongoose.model('Car').findById(doc.car)
    .then(function (ourCar) {
        car = ourCar;
        return ourCar.setRating();
    })
    .then(function (rating) {
        car.rating = rating;
        return car.save();
    })
    .then(function () {
        next();
    })
    .catch(next);
});

mongoose.model('Review', schema);