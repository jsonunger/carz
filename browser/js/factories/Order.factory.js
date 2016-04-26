app.factory('OrderFactory', function($http){
	var OrderFactory = {};
	var parseData = res => res.data;

	OrderFactory.getCurrentOrder = function () {
		return $http.get('/api/orders/currentOrder')
		.then(function (res) {
			return res.data.cars ? Promise.resolve(res.data) : $http.post('/api/orders/');
		})
		.then(parseData);
	};

	OrderFactory.getPreviousOrders = function () {
		return $http.get('/api/orders/previousOrders')
		.then(parseData);
	};

	OrderFactory.addToOrder = function(car){
		return OrderFactory.getCurrentOrder()
		.then(function (order) {
			if (order.cars.find(orderCar => orderCar._id === car._id)) return Promise.resolve(order);
			order.cars.push(car);
			return $http.put('/api/orders/order', {cars: order.cars});
		});
	};

	OrderFactory.getAllOrders = function(query) {
		return $http.get('/api/orders/',{
			params: query || {}
		})
		.then(parseData);
	};

	OrderFactory.removeFromOrder = function(car){
		return OrderFactory.getCurrentOrder()
		.then(function (order) {
			if (!order.cars.find(orderCar => orderCar._id === car._id)) return Promise.resolve(order);
			var idx;
			for (var i = 0; i < order.cars.length; i++) {
				if (order.cars[i]._id === car._id) {
					idx = i;
					break;
				}
			}
			order.cars.splice(idx,1);
			return $http.put('/api/orders/order', {cars: order.cars});
		})
		.then(parseData);
	};	

	OrderFactory.updateOrder = function(order) {
		delete order.cars;
		return $http.put('/api/orders/order', order)
		.then(parseData);
	};

	OrderFactory.submitOrder = function(order) {
		return $http.put('/api/orders/order', order)
		.then(parseData);
	};

	return OrderFactory;
});
