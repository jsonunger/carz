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

   $scope.addToCart = function(){
    	OrderFactory.addToOrder($scope.car._id)
    	.then(function(updatedOrder){
    		$rootScope.order = updatedOrder;
    		$state.go('order-cart', {orderId: updatedOrder._id});
    	});
    };
});
