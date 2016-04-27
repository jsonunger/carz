app.controller('CarCtrl', function($scope, CarFactory, currentCar, user, reviews, OrderFactory, $rootScope, $state){
   $scope.title = currentCar.year + " " + currentCar.make + " " + currentCar.model;
   $scope.car = currentCar;
   $scope.reviews = reviews;
   $scope.showRev = false;
   $scope.rating = function (num) {
      return new Array(num);
   };
   $scope.showReviews = function () {
      $scope.showRev = !$scope.showRev;
   };

   $scope.addToOrder = function(car){
      OrderFactory.addToOrder(car)
    	.then(function(){
    		$state.go('order-cart');
    	});
    };

    $scope.mainPhoto = currentCar.photo[0];

    $scope.changeMainPhoto = function(img){
      $scope.mainPhoto = img;
    };
});
