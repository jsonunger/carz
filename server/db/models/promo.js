'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	code:  {String, required: true},
	discount: {Number, required: true},
	
})

mongoose.model('Promo', schema);