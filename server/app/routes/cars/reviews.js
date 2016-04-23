'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Review = mongoose.model('Review');
module.exports = router;

router.get('/', (req,res,next) => {
  Review.find({car: req.car._id}).populate('user')
  .then(reviews => res.json(reviews))
  .catch(next);
});

router.post('/', (req,res,next) => {
  if (req.user) {
    Review.create(req.body)
    .then(newReview => res.status(201).json(newReview))
    .catch(next);
  } else res.sendStatus(401);
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
  if (req.user && (req.user._id === req.review.user || req.user.admin)) {
  	Object.keys(req.body).forEach(key => req.review[key] = req.body[key]);
  	req.review.save()
  	.then(updatedReview => res.json(updatedReview))
  	.catch(next);
  } else res.sendStatus(401);

});

router.delete('/:reviewId', (req, res, next) => {
  if (req.user && (req.user._id === req.review.user || req.user.admin)) {
  	Review.remove(req.review)
  	.then(() => res.sendStatus(204))
  	.catch(next);
  } else res.sendStatus(401);
});