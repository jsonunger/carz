
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', (req, res, next) => {
	User.find({})
	.then(users => res.json(users))
	.then(null, next);
});

router.post('/', (req, res, next) => {
	User.create(req.body)
	.then((user) => res.status(201).json(user))
	.then(null, next);
});

router.param('id', function(req, res, next, id){
	User.findById(id)
	.then((user) => {
		req.loggedIn = user;
		next();
	})
	.catch(next);
});

router.get("/:id", (req, res, next) => {
	res.json(req.loggedIn);
});

router.put('/:id', (req, res, next) => {
	User.update(req.loggedIn, req.body, 
		{new: true, runValidators: true})
	.then((user) => res.json(user))
	.then(null, next);
});

router.delete('/:id', (req, res, next) => {
	User.remove(req.loggedIn)
	.then(() => res.sendStatus(204))
	.then(null, next);
});


router.use("/:id/orders", require('../orders'));

module.exports = router;


