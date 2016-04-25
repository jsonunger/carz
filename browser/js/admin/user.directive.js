

app.directive('user', (OrderFactory)=> {
	return {
		restrict: 'E',
		templateUrl: '/js/admin/user.directive.html',
		scope:{
			users: "="
		},
		link: (scope, element) => {
			scope.getOrders = (id) => {
				OrderFactory.getCart(id)
				.then((order) => {
					scope.cart = order.map((cart) => {
						return [
						{label: "cars", value: cart.cars},
						{label: "shipping address", value: cart.shipping},
						{label: "billing address", value: cart.billing},
						{label: "complete", value: cart.completed},
						{label: "price", value: cart.price}
					]
				});
				});
			}
		}
	}
})