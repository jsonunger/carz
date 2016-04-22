app.config(function($stateProvider) {
    $stateProvider.state('car', {
        url: '/car',
        templateUrl: 'js/car/car.template.html',
        controller: 'carCtlr'
    });
});

