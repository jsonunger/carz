app.controller('orderCtrl', function($scope, OrderFactory, $state, $uibModal, $rootScope, order, ModalFactory, user){
	$scope.order = order;
	$scope.user = user;

	$scope.updateAddress = function(type){
		var modalInstance = ModalFactory.createModal('/js/orders/addAddress.template.html', $scope, type);
		modalInstance.result.then(function (address) {
			$scope.order[type] = address;
		});
	};
	
	$scope.confirm = function(){
		$state.go('order-confirm');
	};

	$scope.remove = function(car){
		OrderFactory.removeFromOrder(car)
		.then(() => OrderFactory.getCurrentOrder())
		.then(returnedOrder => $scope.order = returnedOrder);
	};


	$scope.order.billing = $scope.order.billing || $scope.user.billing || {};
	$scope.order.shipping = $scope.order.shipping || $scope.user.shipping || {};
	$scope.shippingCost = $scope.order.cars.length * 125;
	$scope.tax = $scope.order.price * 0.075;
	$scope.total = $scope.order.price + $scope.shippingCost + $scope.tax;

	$scope.submitOrder = function(){
		OrderFactory.getCurrentOrder()
		.then(function (popCars) {
			if($scope.sameAddress) popCars.billing = popCars.shipping;
			popCars.tax = $scope.tax;
			popCars.shippingCost = $scope.shippingCost;
			popCars.price = $scope.total;
			popCars.orderedCars = popCars.cars;
			popCars.cars = [];
			popCars.completed = true;
			return OrderFactory.submitOrder(popCars);
		})
		.then(() => $state.go('order-complete'));
	};
});