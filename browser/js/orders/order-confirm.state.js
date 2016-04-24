app.config(function($stateProvider){
	$stateProvider.state('order-confirm',{
		url: '/order-confirm',
		templateUrl: '/js/orders/order-confirm.template.html',
		controller: 'orderCtrl'
	});
});