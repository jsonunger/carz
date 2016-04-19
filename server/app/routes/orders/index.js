
var router = require('express').Router();
var User = mongoose.model('User');
var Order = mongoose.model('Order');

router.get('/', (req, res, next) => {
	Order.find({user: req.params.id})
	.then((orders) => res.json(orders))
	.catch(next);
});

router.get('/:orderId',  (req, res, next) => {
	Order.findById(req.params.orderId)
	.then((order) => res.json(order))
	.catch(next);
});

router.post('/', (req, res, next) => {
	Order.create(req.body)
	.then((order) => res.status(201).json(order))
	.catch(next);
});

router.put('/:orderId', (req, res, next) => {
	Order.findOneAndUpdate({_id: req.params.orderId}, req.body, {new: true})
	.then((order) => res.json(order))
	.catch(next);
});

router.delete('/:orderId', (req, res, next) => {
	Order.findOneAndRemove({_id: req.params.orderId})
	.then(() => res.sendStatus(204))
	.catch(next);
});

module.exports = router;