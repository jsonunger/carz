app.config(function($stateProvider) {
    $stateProvider.state('car', {
        url: '/car/:carId',
        templateUrl: 'js/car/car.template.html',
        controller: 'CarCtrl',
        resolve: {
            currentCar: function(CarFactory, $stateParams){
                return CarFactory.getCar($stateParams.carId);
            },
            user: function(AuthService) {
                return AuthService.getLoggedInUser();
            },
            reviews: function (ReviewFactory, currentCar) {
                return ReviewFactory.getCarReviews(currentCar._id);
            }
        }
    });
});

