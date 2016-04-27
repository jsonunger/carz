app.controller('homeCtrl', function($scope, carousel){
	$scope.carousel = carousel;
	$scope.images = ['http://fillmurray.com/1280/350', 'http://placehold.it/1280x350'];
	console.log(carousel)
	$scope.adminReviews = [{
		name: 'Immad',
		image: carousel[0].photo[0],
		description: carousel[0].description,
		id: carousel[0]._id
		},
		{
		name: 'Massimo',
		image: carousel[1].photo[0],
		description: carousel[1].description,
		id: carousel[1]._id
		},
		{
		name: 'Navjot',
		image: carousel[2].photo[0],
		description: carousel[2].description,
		id: carousel[2]._id
		},
		{
		name: 'Jason',
		image: carousel[3].photo[0],
		description: carousel[3].description,
		id: carousel[3]._id
		}
	];
	
});