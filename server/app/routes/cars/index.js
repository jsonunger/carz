'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Car = mongoose.model('Car');
module.exports = router;

//Gets all cars, and filters if there's a query
router.get('/', (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		Car.find(req.query)
		.then(cars => res.json(cars))
		.catch(next);
	} else {
		Car.find(req.query).where('quantity').gt(0)
		.then(cars => res.json(cars))
		.catch(next);
	}
});

router.post('/', (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		Car.create(req.body)
		.then(newCar => res.status(201).json(newCar))
		.catch(next);
	} else res.sendStatus(401);
});

router.param('carId', function(req, res, next, carId){
	Car.findById(carId)
	.then(car => {
		req.car = car;
		next();
	})
	.catch(next);
});

router.get('/:carId', (req, res, next) => res.json(req.car));

router.put('/:carId', (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		Object.keys(req.body).forEach(key => req.car[key] = req.body[key]);
		req.car.save()
		.then(updatedCar => res.json(updatedCar))
		.catch(next);
	} else res.sendStatus(401);
});

router.delete('/:carId', (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		Car.remove(req.car)
		.then(() => res.sendStatus(204))
		.catch(next);
	} else res.sendStatus(401);
});

router.use('/:carId/reviews', require('./reviews'));