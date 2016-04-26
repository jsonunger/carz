var router = require('express').Router();

var stripe = require('stripe')("sk_test_ykXIr4Utc2pigKQm0GE5Qn7Q");

router.post('/', (req, res, next) => {
	stripe.charges.create(req.body, function(err, charge) {
	});
})

module.exports = router;