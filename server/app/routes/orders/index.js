
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Order = mongoose.model('Order');

router.get('/', (req, res, next) => {
    if(!req.user) res.sendStatus(401);
	else if(req.user.isAdmin || req.user.equals(req.requestedUser)) {
		Order.find({user: req.requestedUser._id}).populate('cars')
		.then((orders) => res.json(orders))
		.then(null, next);
	} else res.sendStatus(401);
});

router.post('/', (req, res, next) => {
	Order.findOrCreate(req.body.user)
	.then(function(order){
		res.status(200).json(order);
	}) 
	.then(null, next);
});

router.param('orderId', (req, res, next, orderId) => {
	Order.findById(orderId).populate('cars')
	.then(function (order) {
		if (!order) res.sendStatus(404);
		req.order = order;
		next();
	})
	.then(null, next);
});

router.get('/:orderId',  (req, res, next) => {
    if(!req.user) res.sendStatus(401);
	else if(req.user.isAdmin || req.user.equals(req.requestedUser)) res.json(req.order);
	else res.sendStatus(401);
});

router.put('/:orderId', (req, res, next) => {
    if(!req.user) res.sendStatus(401);
	else if(req.user.isAdmin || req.user.equals(req.requestedUser)) {
		Object.keys(req.body).forEach(key => req.order[key] = req.body[key]);
		req.order.save()
		.then((updatedOrder) => res.json(updatedOrder))
		.then(null, next);
	} else res.sendStatus(401);
});

router.delete('/:orderId', (req, res, next) => {
    if(!req.user) res.sendStatus(401);
    else if(!req.user.isAdmin) res.sendStatus(403)
    else {
		Order.findByIdAndRemove(req.order._id)
		.then(() => res.sendStatus(204))
		.then(null, next);
	}
});

module.exports = router;
