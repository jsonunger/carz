
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

router.get('/', (req, res, next) => {
	Order.find({user: req.loggedIn._id})
	.then((orders) => res.json(orders))
	.then(null, next);
});

router.get('/:orderId',  (req, res, next) => {
	Order.findById(req.params.orderId)
	.then((order) => res.json(order))
	.then(null, next);
});

router.post('/', (req, res, next) => {
	Order.create(req.body)
	.then((order) => res.status(201).json(order))
	.then(null, next);
});

router.put('/:orderId', (req, res, next) => {
	Order.findOneAndUpdate({_id: req.params.orderId}, req.body, 
		{new: true, runValidators: true})
	.then((order) => res.json(order))
	.then(null, next);
});

router.delete('/:orderId', (req, res, next) => {
	Order.findOneAndRemove({_id: req.params.orderId})
	.then(() => res.sendStatus(204))
	.then(null, next);
});

module.exports = router;