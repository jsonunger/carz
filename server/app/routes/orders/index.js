
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

router.get('/', (req, res, next) => {
	if(req.user.isAdmin || req.user.equals(req.loggedIn)) {
		Order.find({user: req.loggedIn._id}).populate('cars')
		.then((orders) => res.json(orders))
		.then(null, next);
	} else {res.sendStatus(401)}
});

router.get('/:orderId',  (req, res, next) => {
	if(req.user.isAdmin || req.user.equals(req.loggedIn)) {
		Order.findById(req.params.orderId).populate('cars')
		.then((order) => res.json(order))
		.then(null, next);
	} else {res.sendStatus(401)}
});

router.post('/', (req, res, next) => {
	if(req.user.isAdmin || req.user.equals(req.loggedIn)) {
		Order.create(req.body)
		.then((order) => res.status(201).json(order))
		.then(null, next);
	} else {res.sendStatus(401)}
});

router.put('/:orderId', (req, res, next) => {
	if(req.user.isAdmin || req.user.equals(req.loggedIn)) {
		Order.findOneAndUpdate({_id: req.params.orderId}, req.body, 
			{new: true, runValidators: true})
		.then((order) => res.json(order))
		.then(null, next);
	} else {res.sendStatus(401)}
});

router.delete('/:orderId', (req, res, next) => {
	if(req.user.isAdmin) {
		Order.findOneAndRemove({_id: req.params.orderId})
		.then(() => res.sendStatus(204))
		.then(null, next);
	} else {res.sendStatus(401)}
});

module.exports = router;