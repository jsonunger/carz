app.controller('homeCtrl', function($scope, carousel){
	$scope.carousel = carousel;
	$scope.images = ['http://fillmurray.com/1280/350', 'http://placehold.it/1280x350'];
	$scope.adminReviews = [{
		name: 'Immad',
		image: carousel[0].photo[0],
		description: carousel[0].description
		},
		{
		name: 'Massimo',
		image: carousel[1].photo[0],
		description: carousel[1].description
		},
		{
		name: 'Navjot',
		image: carousel[2].photo[0],
		description: carousel[2].description
		},
		{
		name: 'Jason',
		image: carousel[3].photo[0],
		description: carousel[3].description
		}
	];
	
});