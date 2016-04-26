'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
module.exports = router;

router.get('/', (req,res,next) => {
  Review.find({user: req.requestedUser._id}).populate('car')
  .then(reviews => res.json(reviews))
  .catch(next);
});

router.post('/', (req,res,next) => {
  Review.create(req.body)
  .then(newReview => res.status(201).json(newReview))
  .catch(next);
});

router.param('reviewId', (req, res, next, reviewId)=>{
  Review.findById(reviewId)
  .then(review => {
  	req.review = review;
  	next();
  })
  .catch(next);
});

router.put('/:reviewId', (req, res, next) => {
	Object.keys(req.body).forEach(key => req.review[key] = req.body[key]);
	req.review.save()
	.then(updatedReview => res.json(updatedReview))
	.catch(next);
});

router.delete('/:reviewId', (req, res, next) => {
	Review.remove(req.review)
	.then(() => res.sendStatus(204))
	.catch(next);
});
