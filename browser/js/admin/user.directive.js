

app.directive('user', (OrderFactory, $log)=> {
	return {
		restrict: 'E',
		templateUrl: '/js/admin/user.directive.html',
		scope:{
			user: "="
		},
		link: (scope, element) => {
			scope.getOrders = (id) => {
                if(scope.cart) {
                    scope.cart = null;
                    return;
                }
				OrderFactory.getCart(id)
				.then((order) => {
					scope.cart = order.map((cart) => {
						return [
    						{label: "cars", value: cart.cars},
    						{label: "shipping address", value: cart.shipping},
    						{label: "billing address", value: cart.billing},
    						{label: "complete", value: cart.completed},
    						{label: "price", value: cart.price}
    					];
    				});
				})
                .catch($log.error);
			}
		}
	}
})
