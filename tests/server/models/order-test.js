var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Order = mongoose.model('Order');
var User = mongoose.model('User');
var Car = mongoose.model('Car');

describe('Order model', function () {
   beforeEach('Establish DB connection', function (done) {
      if (mongoose.connection.db) return done();
      mongoose.connect(dbURI, done);
   });

   afterEach('Clear test database', function (done) {
      clearDB(done);
   });

   var users, cars, orders;
   beforeEach('Creates an order', function (done) {
      User.create([{email: 'zeke@zeke.zeke', password: '123'}, {email: 'omri@zeke.zeke', password: '123'}])
      .then(function (createdUsers) {
         users = createdUsers;
         var carsToCreate = [
            {
               model: 'Huracan',
               description: 'It\'s a Lamborghini, what did you expect?',
               price: 100000,
               make: 'Lamborghini',
               year: 2016,
               type: 'Car'
            },
            {
               model: 'GLK250',
               description: 'The nicest SUV you\'ll ever drive',
               price: 38000,
               make: 'Mercedez-Benz',
               year: 2015,
               type: 'SUV',
               quantity: 1
            }
         ];
         return Car.create(carsToCreate);
      })
      .then(function (createdCars) {
         cars = createdCars;
         return Order.create([{user: users[0]._id, cars: [cars[0]._id, cars[1]._id]}, {user: users[1]._id, cars: [cars[0]._id, cars[1]._id]}]);
      })
      .then((createdOrders) => {
         orders = createdOrders;
         done();
      })
      .catch(done);
   });

   it('should exist', function () {
      expect(Order).to.be.a('function');
   });

   describe('populateCars', function () {
      it('should give the cars in the order as objects, not references', function () {
         orders[0].populateCars()
         .then(function (returnedCars) {
            expect(returnedCars[0].model).to.be('Huracan');
            expect(returnedCars[1].make).to.be('Mercedez-Benz');
         });
      });
   });

   describe('setPrice', function () {
      it('should return the price of a specific order', function (done) {
         orders[0].setPrice()
         .then(function (pricedOrder) {
            expect(pricedOrder.price).to.be.ok;
            expect(pricedOrder.price).to.equal(138000);
            done();
         })
         .catch(done);
      });
   });

   describe('Inventory updating', function () {
      beforeEach('complete an order', function (done) {
         Order.findById(orders[0]._id).populate('cars')
         .then(function (ourOrder) {
            ourOrder.completed = true;
            return ourOrder.save();
         })
         .then(() => done())
         .catch(done);
      });

      it('should update the quantity of the cars in the database', function (done) {
         orders[0].populateCars()
         .then(function (popCars) {
            expect(popCars[0].quantity).to.equal(4);
            expect(popCars[1].quantity).to.equal(0);
            done();
         })
         .catch(done);
      });

      it('should remove the car from other orders if quantity is now 0', function (done) {
         Order.findById(orders[1]._id)
         .then(function (order) {
            expect(order.cars).to.not.include(cars[1]._id);
            expect(order.cars).to.include(cars[0]._id);
            done();
         })
         .catch(done);
      });
   });
});



















