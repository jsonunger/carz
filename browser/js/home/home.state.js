app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: 'homeCtrl',
        resolve: {
        	carousel: function(CarFactory) {
        		return CarFactory.getCarouselCars();
        	}
        }
    });
});