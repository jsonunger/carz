// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest');
var app = require('../../../server/app');



describe('Order Route', () => {

	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	beforeEach('Makes a user for tests', function(done) {

		User.create({
			email: 'bill.gates@com.com',
			password: "imBallin24/7"
		}, done);
	});

	beforeEach('Makes an Order', function(done) {
		
		User.findOne({email: 'bill.gates@com.com'})
		.then((foundUser) => {
			return Order.create({
				user: foundUser._id
			});
		})
		.then(() => {
			done();
		});
		
	})

	afterEach('Clear test database', function (done) {
		console.log('make an order');
	});


	describe('add and order', () => {

		var guestAgent;

		beforeEach('Create guest user', function (done){
			guestAgent = supertest.agent(app);
			done();
		});

		it('should add an order to a User', (done) => {
			console.log('hey')
			User.findOne({email: 'bill.gates@com.com'})
			.then((user) => {
				console.log(user)
				guestAgent.post('/api/users/' + user._id + '/orders')
				.expect(201)
			}).then(() => {
				done();
			}); 
			
		})

	});

	// describe('Get All Orders', () => {

	// 	var guestAgent;

	// 	beforeEach('Create guest agent', function () {
	// 		guestAgent = supertest.agent(app);
	// 	});

	// 	var userId = ""
	// })
});