'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

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
    }
});

mongoose.model('Review', schema);
