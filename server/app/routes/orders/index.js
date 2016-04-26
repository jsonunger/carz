
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
			shipping: {},
			billing: {}
		};
	} else {
		var userId = req.user.isAdmin ? req.body.user._id || req.user._id : req.user._id;
		Order.create({user: userId})
		.then(function (newOrder) {
			res.status(200).json(newOrder);
		})
		.catch(next);
	}
});

router.get('/currentOrder',  (req, res, next) => {
	if (!req.user) {
		res.json(req.session.order);
	}
	else {
		var userId = req.user.isAdmin ? req.body.user._id || req.user._id : req.user._id;
		Order.findOne({user: userId, completed: false}).populate('cars')
		.then(function (returnedOrder) {
			res.json(returnedOrder);
		})
		.catch(next);
	};
});

router.put('/order', (req, res, next) => {
	if (!req.user) {
		Object.keys(req.body).forEach(key => req.session.order[key] = req.body[key]);
		res.json(req.session.order);
	} else {
		var userId = req.user.isAdmin ? req.body.user._id || req.user._id : req.user._id;
		Order.findOne({user: userId, completed: false})
		.then(function (returnedOrder) {
			if (req.body.cars) req.body.cars = req.body.cars.map(car => {
				if (typeof car === 'object') return car._id;
				else return car;
			});
			Object.keys(req.body).forEach(key => returnedOrder[key] = req.body[key]);
			return returnedOrder.save();
		})
		.then((updatedOrder) => res.json(updatedOrder))
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
		var userId = req.user.isAdmin ? req.body.user._id || req.user._id : req.user._id;
		Order.findOneAndRemove({user: userId, completed: false})
		.then(() => res.sendStatus(204))
		.then(null, next);
	}
});

module.exports = router;
