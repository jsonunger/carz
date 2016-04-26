app.config(function($stateProvider){
	$stateProvider.state('order-confirm',{
		url: '/confirm',
		templateUrl: 'js/orders/order-confirm.template.html',
		controller: 'orderCtrl',
		resolve: {
			order: function (OrderFactory) {
				return OrderFactory.getCurrentOrder();
			},
			user: function (AuthService){
				return AuthService.getLoggedInUser();
			}
		}
	});
});