app.controller('CarCtrl', function($scope, CarFactory, currentCar, user, OrderFactory, $rootScope, $state){
    $scope.mainImage = 'http://fillmurray.com/500/400';
    $scope.title = currentCar.year + " " + currentCar.make + " " + currentCar.model;
    $scope.car = currentCar;

    console.log($rootScope.order);

    $scope.addToCart = function(){
    	OrderFactory.addToOrder($scope.car._id)
    	.then(function(updatedOrder){
    		$rootScope.order = updatedOrder;
    		$state.go('order-cart', {orderId: updatedOrder._id})
    	})
    }
});
