app.config(function($stateProvider){
	$stateProvider.state('order-confirm',{
		url: '/order/:orderId/confirm',
		templateUrl: '/js/orders/order-confirm.template.html',
		controller: 'orderCtrl'
	});
});