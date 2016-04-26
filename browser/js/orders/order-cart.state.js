app.config(function($stateProvider){
	$stateProvider.state('order-cart', {
		url: '/cart',
		templateUrl: 'js/orders/order-cart.template.html',
		controller: 'orderCtrl',
		resolve: {
			order: function (OrderFactory) {
				return OrderFactory.getCurrentOrder();
			},
			user: function (AuthService) {
				return AuthService.getLoggedInUser()
				.then(function (user) {
					return user ? user : {};
				});
			}
		}
	});
});