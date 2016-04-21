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

mongoose.model('Review', schema);