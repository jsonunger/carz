'use strict';
var mongoose = require('mongoose');

var schema = mongoose.Schema({
   name: String,
   
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
});

mongoose.model('Address', schema);