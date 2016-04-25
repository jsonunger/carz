app.config(function($stateProvider){

	$stateProvider.state('order-cart', {
		url: '/order-cart',
		templateUrl: 'js/orders/order-cart.template.html',
		controller: 'orderCtrl'
	});
});