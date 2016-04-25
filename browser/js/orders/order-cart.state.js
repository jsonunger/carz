app.config(function($stateProvider){

	$stateProvider.state('order-cart', {
		url: '/order/:orderId/cart',
		templateUrl: 'js/orders/order-cart.template.html',
		controller: 'orderCtrl',
		resolve: {
			order: function (OrderFactory, $stateParams) {
				return OrderFactory.getOrder($stateParams.orderId);
			}
		}
	});
});