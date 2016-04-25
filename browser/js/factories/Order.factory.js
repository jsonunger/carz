app.factory('OrderFactory', function($http, AuthService, $rootScope){
	var OrderFactory = {};
	var parseData = res => res.data;

	OrderFactory.findOrCreateCart = function(){
		return AuthService.getLoggedInUser()
		.then(user => $http.post('/api/users/' + user._id + '/orders', {user: user._id}))
		.then(parseData);
	};

	OrderFactory.addToOrder = function(carId){
		var order = $rootScope.order;
		if(order.cars.indexOf(carId) !== -1) return;
		order.cars.push(carId);

		return $http.put('/api/users/' + order.user + '/orders/' + order._id, order)
		.then(parseData);
	};

	OrderFactory.getOrder = function (orderId) {
		return AuthService.getLoggedInUser()
		.then(user => $http.get('/api/users/' + user._id + '/orders/' + orderId))
		.then(parseData);
	};

	OrderFactory.removeFromOrder = function(carId){
		var order = $rootScope.order;
		var index = order.cars.indexOf(carId);


		if(index === -1) return;
		order.cars.splice(index, 1);

		console.log(order);

		return $http.put('/api/users/' + order.user + '/orders/' + order._id, order)
		.then(parseData)
		.then(order => {
			$rootScope.order = order;
			return OrderFactory.getOrder(order._id);
		});
	};	

	return OrderFactory;
});