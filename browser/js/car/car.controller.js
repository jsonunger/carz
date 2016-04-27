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
      OrderFactory.checkOrder()
      .then(function(order) {
      	return OrderFactory.addToOrder($scope.car._id, order);
      })
    	.then(function(updatedOrder){
    		$rootScope.order = updatedOrder;
    		$state.go('order-cart', {orderId: updatedOrder._id});
    	});
    };

    $scope.mainPhoto = currentCar.photo[0];

    $scope.changeMainPhoto = function(img){
      $scope.mainPhoto = img;
    };

    $scope.user = user;
});
