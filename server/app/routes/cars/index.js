'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Car = mongoose.model('Car');
module.exports = router;

//Gets all cars, and filters if there's a query
router.get('/', (req, res, next) => {
	Car.find(req.query).where('quantity').gt(0)
	.then(cars => res.json(cars))
	.catch(next);
});

router.post('/', (req, res, next) => {
	Car.create(req.body)
	.then(newCar => res.status(201).json(newCar))
	.catch(next);
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
	Object.keys(req.body).forEach(key => req.car[key] = req.body[key]);
	req.car.save()
	.then(updatedCar => res.json(updatedCar))
	.catch(next);
});

router.delete('/:carId', (req, res, next) => {
	Car.remove(req.car)
	.then(() => res.sendStatus(204))
	.catch(next);
});

router.use('/:carId/reviews', require('./reviews'));