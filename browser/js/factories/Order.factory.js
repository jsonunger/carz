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

	return OrderFactory;
});