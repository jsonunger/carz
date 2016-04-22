app.controller('CarCtrl', function($scope, CarFactory, currentCar, AuthService, user){
    $scope.mainImage = 'http://fillmurray.com/500/400';
    $scope.title = currentCar.year + " " + currentCar.make + " " + currentCar.model;
    $scope.car = currentCar;
});
