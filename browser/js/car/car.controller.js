app.controller('CarCtrl', function($scope, CarFactory, currentCar, user, reviews){
    $scope.mainImage = 'http://fillmurray.com/500/400';
    $scope.title = currentCar.year + " " + currentCar.make + " " + currentCar.model;
    $scope.car = currentCar;
    $scope.reviews = reviews;
});
