app.controller('orderCtrl', function($scope, OrderFactory, $state, $uibModal, $rootScope, order, ModalFactory, user, $http, $log){

	$scope.updateAddress = function(type){
		var modalInstance = ModalFactory.createModal('/js/orders/addAddress.template.html', $scope, type);
		modalInstance.result.then(function (address) {
			$scope.order[type] = address;
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

	$scope.user = user;
	$scope.order = order;

	$scope.order.billing = $scope.order.billing || $scope.user.billing || {};
	$scope.order.shipping = $scope.order.shipping || $scope.user.shipping || {};

	$scope.shippingCost = $scope.order.cars.length * 125;
	$scope.tax = $scope.order.price * 0.075;
	$scope.total = $scope.order.price + $scope.shippingCost + $scope.tax;

	$scope.submitOrder = function(){
		//For populating cars
		OrderFactory.getOrder($scope.order._id)
		.then(function(popCars){
			if($scope.sameAddress) popCars.billing = popCars.shipping;
			popCars.tax = $scope.tax;
			popCars.shipping = $scope.shippingCost;
			popCars.price = $scope.total;
			popCars.orderedCars = popCars.cars;
			popCars.cars = [];
			popCars.completed = true;
			return OrderFactory.submitOrder(popCars);
		})
		.then(function(complete){
			$rootScope.order = null;
			$state.go('order-complete');
		});
	};
	$scope.createPayment = () => {
		Stripe.card.createToken($scope.card, (status, res) => {
			let body = {
				amount: $scope.total,
				currency: 'usd',
				source: res.id,
				description: 'charge for carz.tech'
			};
			$http.post('/api/stripe', body)
			.catch($log.error);
		});
	}
});















