
var router = require('express').Router();
var mongoose = require('mongoose');
var Order = mongoose.model('Order');

router.get('/', (req, res, next) => {
	if(!req.user) res.sendStatus(401);
	else if(req.user.isAdmin) {
		Order.find(req.query)
		.then((orders) => res.json(orders))
		.then(null, next);
	} else res.sendStatus(401);
});

router.post('/', (req, res, next) => {
	if (!req.user) {
		req.session.order = {
			cars: [],
			completed: false,
			price: 0,
			shipping: {
				name: '',
				street: '',
				city: '',
				state: '',
				zip: ''
			},
			billing: {
				name: '',
				street: '',
				city: '',
				state: '',
				zip: ''
			}
		};
		res.json({data: req.session.order});
	} else {
		Order.create({user: req.user._id})
		.then(function (newOrder) {
			res.status(200).json(newOrder);
		})
		.catch(next);
	}
});

router.get('/currentOrder', (req, res, next) => {
	if (!req.user) {
		if (req.session.order && req.session.order.completed) return res.json({});
		else if (!req.session.order) {
			req.session.order = {
				cars: [],
				completed: false,
				price: 0,
				shipping: {
					name: '',
					street: '',
					city: '',
					state: '',
					zip: ''
				},
				billing: {
					name: '',
					street: '',
					city: '',
					state: '',
					zip: ''
				}
			};
		} 
		return res.json(req.session.order);
	}
	else {
		Order.findOne({user: req.user._id, completed: false}).populate('cars')
		.then(function (returnedOrder) {
			return returnedOrder ? returnedOrder : Order.create({user: req.user._id});
		})
		.then(function (order) {
			res.json(order);
		})
		.catch(next);
	};
});

router.get('/previousOrders', (req,res,next) => {
	if (!req.user) return res.sendStatus(401);
	Order.find({user: req.user._id, completed: true})
	.then(prevOrders => res.json(prevOrders))
	.catch(next);
});

router.put('/order', (req, res, next) => {
	if (!req.user) {
		if (req.body.completed) req.body.cars = req.body.orderedCars;
		Object.keys(req.body).forEach(key => req.session.order[key] = req.body[key]);
		req.session.order.price = req.session.order.cars.reduce((tot,car) => tot + car.price,0);
		res.json(req.session.order);
	} else {
		Order.findOne({user: req.user._id, completed: false})
		.then(function (returnedOrder) {
			if (req.body.cars) req.body.cars = req.body.cars.map(car => {
				if (typeof car === 'object') return car._id;
				else return car;
			});
				Object.keys(req.body).forEach(key => returnedOrder[key] = req.body[key]);
				return returnedOrder.save();
			})
		.then(updatedOrder => res.json(updatedOrder))
		.then(null, next);
	}
});

router.delete('/order', (req, res, next) => {
	if(!req.user) {
		req.session.order = {
			cars: [],
			completed: false,
			price: 0,
			shipping: {},
			billing: {}
		};
	} else {
		Order.findOneAndRemove({user: req.user._id, completed: false})
		.then(() => res.sendStatus(204))
		.then(null, next);
	}
});

module.exports = router;
