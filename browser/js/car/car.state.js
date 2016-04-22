app.config(function($stateProvider) {
    $stateProvider.state('car', {
        url: '/car/:carId',
        templateUrl: 'js/car/car.template.html',
        controller: 'CarCtrl'
    });
});

