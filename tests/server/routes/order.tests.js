// Instantiate all models
var mongoose = require('mongoose');
require('../../../server/db/models');
var User = mongoose.model('User');
var Order = mongoose.model('Order');
var Car = mongoose.model('Car');

var expect = require('chai').expect;

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var supertest = require('supertest-as-promised');
var app = require('../../../server/app');

describe('Order Route', () => {
	var car;
	var guestAgent;
	beforeEach('Establish DB connection', function (done) {
		if (mongoose.connection.db) return done();
		mongoose.connect(dbURI, done);
	});

	beforeEach('Makes a user for tests', function(done) {
		guestAgent = supertest.agent(app);

		var user1 = {
			email: 'bill.gates@com.com',
			password: "imBallin24/7",
			isAdmin: true
		};

		User.create(user1)
		.then((user) => {
			guestAgent.post('/login')
			.send(user1)
			.end(done);
		})
		.catch(done);

	});

	beforeEach('Makes an Order', function(done) {

		User.findOne({email: 'bill.gates@com.com'})
		.then((foundUser) => {
			return Order.create({
				user: foundUser._id
			});
		})
		.then(() => done());
	});

	beforeEach("Makes a car", (done) => {
		car = {
			model: '488',
			description: 'fast car',
			price: 350000,
			make: 'Ferrari',
			year: 2016,
			type: 'Car'
		};

		Car.create(car)
		.then((newCar) => car = newCar)
		.then(() => done())
	});

	afterEach('Clear test database', function (done) {
		clearDB(done);
	});

	describe('add and order', () => {

		it('should add an order to a User', (done) => {
			User.findOne({email: 'bill.gates@com.com'})
			.then((user) => {
				return guestAgent.post('/api/users/' + user._id + '/orders')
				.send({
					user: user._id,
					cars: [car._id]
				})
				.expect(201);
			})
			.then(() => Order.find({cars: [car._id]}))
			.then((orders) => {
				expect(orders.length).to.equal(1);
				done();
			})
			.catch(done);
		});
	});

	describe('deletes an order', function (done) {

		beforeEach('Creates order', function (done){
			User.findOne({email: 'bill.gates@com.com'})
			.then((user) => {
				return guestAgent.post('/api/users/' + user._id + '/orders')
				.send({
					user: user._id,
					cars: [car._id]
				});
			})
			.then((order) => done())
			.catch(done);
		});

		it("should delete an order from a User", (done) => {
			User.findOne({email: 'bill.gates@com.com'})
			.then(foundUser => {
				user = foundUser;
				return Order.findOne({user: user._id})
			})
			.then((order) => {
				return guestAgent.delete('/api/users/' + user._id + '/orders/' + order._id)
				.expect(204);
			})
			.then(() => done())
			.catch(done);
		});
		it("should update an order", (done)=>{
            User.findOne({email: 'bill.gates@com.com'})
            .then(foundUser => {
                return Order.findOne({user: foundUser._id})
            })
            .then((order) => {
                return guestAgent.put('/api/users/' + user._id + '/orders/' + order._id, {
                        shipping: {
                            street: "432 Park Ave",
                            city: 'New York',
                            state: 'NY',
                            zipcode: 10001
                       }
                   })
                .expect(200);
            })
            .then(() => done())
            .catch(done);
        }); 
	});
});
