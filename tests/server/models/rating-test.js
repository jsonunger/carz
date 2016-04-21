var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var expect = require('chai').expect;
var mongoose = require('mongoose');
var lorem = require('lorem-ipsum');

// Require in all models.
require('../../../server/db/models');

var Car = mongoose.model('Car');
var Review = mongoose.model('Review');
var User = mongoose.model('User');

describe('Testing the rating system', function () {
   beforeEach('Establish DB connection', function (done) {
      if (mongoose.connection.db) return done();
      mongoose.connect(dbURI, done);
   });

   var users, cars;
   beforeEach('Create some cars', function (done) {
      var carsToCreate = [
         {
            model: 'Camaro',
            price: 23500,
            make: 'Chevrolet',
            year: 2015,
            type: 'Car',
            description: 'Chevy Camaro'
         },
         {
            model: 'GLK350',
            price: 38000,
            make: 'Mercedes-Benz',
            year: 2015,
            type: 'SUV',
            description: 'Mercedes GLK350'
         },
         {
            model: 'Huracan',
            price: 100000,
            make: 'Lamborghini',
            year: 2016,
            type: 'Car',
            description: 'Lamborghini Huracan'
         },
         {
            model: 'i3',
            price: 42000,
            make: 'BMW',
            year: 2015,
            type: 'Car',
            description: 'BMW i3'
         }
      ];

   Car.create(carsToCreate)
   .then(function (returnedCars) {
      cars = returnedCars;
      done();
   })
   .catch(done);
});

   beforeEach('Create some users', function (done) {
      var usersToCreate = [
      {
       email: 'i.mohamed037@gmail.com',
       password: 'qwerty',
       isAdmin: true
    },
    {
       email: 'jasonscottunger@gmail.com',
       password: 'carz',
       isAdmin: true
    }
    ];

    User.create(usersToCreate)
    .then(function (returnedUsers) {
      users = returnedUsers;
      done();
   })
    .catch(done);
 });

   beforeEach('Create some reviews', function (done) {
      var reviewsToCreate = [
         {
            content: lorem(),
            stars: 4,
            user: users[0]._id,
            car: cars[2]._id
         },
         {
            content: lorem(),
            stars: 3,
            user: users[0]._id,
            car: cars[1]._id
         },
         {
            content: lorem(),
            stars: 5,
            user: users[1]._id,
            car: cars[0]._id
         },
         {
            content: lorem(),
            stars: 2,
            user: users[1]._id,
            car: cars[1]._id
         }
      ];

      Review.create(reviewsToCreate)
      .then(function (returnedReviews) {
         done();
      })
      .catch(done);
   });

   afterEach('Clear test database', function (done) {
      clearDB(done);
   });

   it('should exist', function () {
      expect(Review).to.be.a('function');
   });

   it('should not have a rating if no reviews', function (done) {
      Car.findById(cars[3]._id)
      .then(function (foundCar) {
         expect(foundCar.rating).to.not.exist;
         done();
      })
      .catch(done);
   });

   it('should have a rating if only one review', function (done) {
      Car.findById(cars[0]._id)
      .then(function (foundCar) {
         expect(foundCar.rating).to.equal(5);
         return Review.find({car: cars[0]._id});
      })
      .then(function (foundReviews) {
         expect(foundReviews).to.have.length(1);
         done();
      })
      .catch(done);
   });

   it('should have a rating which is the average of all reviews for that car', function (done) {
      Car.findById(cars[1]._id)
      .then(function (foundCar) {
         expect(foundCar.rating).to.equal(2);
         return Review.find({car: cars[1]._id});
      })
      .then(function (foundReviews) {
         expect(foundReviews).to.have.length(2);
         done();
      })
      .catch(done);
   });   
});