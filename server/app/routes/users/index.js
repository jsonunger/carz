
var router = require('exrpress').Router();
var User = mongoose.model('User');

router.get('/', (req, res, next) => {
	User.find({})
	.then((users) => {res.json(user)})
	.catch(next);
});

router.post('/', (req, res, next) => {
	User.create(req.body)
	.then((user) => res.status(201).json(user))
	.catch(next);
});

router.get("/:id", (req, res, next) => {
	User.findById(req.params.id)
	.then((user) => res.json(user))
	.catch(next);
});

router.put('/:id', (req, res, next) => {
	User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
	.then((user) => res.json(user))
	.catch(next);
});

router.delete('/:id', (req, res, next) => {
	User.findOneAndRemove({_id: req.params.id})
	.then(()=> res.sendStatus(204))
	.catch(next);
})