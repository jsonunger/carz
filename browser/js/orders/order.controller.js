app.controller('orderCtrl', function($scope, OrderFactory, $state, $uibModal, $rootScope, order){

	$scope.addAddress = function(){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/js/orders/addAddress.template.html',
			//We Can Use the UserCtrl Here!!!
			// controller: 'userCtrl'
			size: 'lg',
			//Resolve can be used to fill out current user address
			//psudocode down here
			// resolve: {
			// 	currentInfo: function() {
			// 		return userfactory user info
			// 	}
			// }
		});
	};

	$scope.test = () => console.log($scope.sameAddress);
	
	$scope.confirm = function(){
		$state.go('order-confirm', {orderId: $scope.order._id});
	};

	$scope.remove = function(carId){
		OrderFactory.removeFromOrder(carId)
		.then(updatedOrder => $scope.order = updatedOrder);
	};

	$scope.order = order;
	$scope.shippingCost = $scope.order.cars.length * 125;
	$scope.tax = $scope.order.price * 0.075;
	$scope.total = $scope.order.price + $scope.shippingCost + $scope.tax;

	console.log(order);
});