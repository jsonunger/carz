'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var _ = require('lodash');

router.get('/', (req, res, next) => {
	if(!req.user) res.sendStatus(401);
	else if(!req.user.isAdmin) res.sendStatus(403);
	else {
		User.find({})
		.then(users => res.json(users))
		.then(null, next);
	}
});

router.post('/', (req, res, next) => {
	User.create(req.body)
	.then((user) => res.status(201).json(user))
	.then(null, next);
});

router.param('id', function(req, res, next, id){
	User.findById(id)
	.then((user) => {
		req.requestedUser = user;
		next();
	})
	.catch(next);
});

router.get("/:id", (req, res, next) => {
    if(!req.user) res.sendStatus(401);
	else if(req.user.isAdmin || req.user.equals(req.requestedUser)) {
		res.json(req.requestedUser);
	} else res.sendStatus(401);
});

router.put('/:id', (req, res, next) => {
    if(!req.user) res.sendStatus(401);
	else if(req.user.isAdmin || req.user.equals(req.requestedUser)) {
        req.requestedUser = _.merge(req.requestedUser, req.body);
        req.requestedUser.save()
		.then(user => res.json(user))
		.then(null, next);
	} else res.sendStatus(401);
});

router.delete('/:id', (req, res, next) => {
    if(!req.user) res.sendStatus(401);
	else if(req.user.isAdmin || req.user.equals(req.requestedUser)) {
		User.remove(req.requestedUser)
		.then(() => res.sendStatus(204))
		.then(null, next);
	} else res.sendStatus(401);
});

router.use('/:id/reviews', require('./reviews'));
module.exports = router;


