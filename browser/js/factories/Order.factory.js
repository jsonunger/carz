app.factory('OrderFactory', function($http){
	var OrderFactory = {};
	var parseData = res => res.data;
	var orderUrl = '/api/users/:userId/orders';

	//http://localhost:1337/api/users/5719795771a36ba959db387f/orders

	OrderFactory.getCart = function(){
		return $http.get(orderUrl)
		.then(function(cart){
			console.log("this is info", cart);
		});
	};

	// OrderFactory.newCart = function(){
	// 	return $http.post(orderUrl, {
	// 	}).then(parseData);
	// };


	// CarFactory.getCars = function (query) {
 //      return $http.get('/api/cars',{
 //         params: query
 //      }).then(parseData);
 //   };

	return OrderFactory;
});