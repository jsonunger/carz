app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl'
    });
});


app.controller('homeCtrl', function($scope){
	$scope.images = ['http://fillmurray.com/1280/350', 'http://placehold.it/1280x350'];
	$scope.adminReviews = [{
		name: 'Immad',
		image: "http://fillmurray.com/300/300"
		},
		{
		name: 'Massimo',
		image: "http://fillmurray.com/300/300"
		},
		{
		name: 'Navjot',
		image: "http://fillmurray.com/300/300"
		},
		{
		name: 'Jason',
		image: "http://fillmurray.com/300/300"
		}
	];
	
});