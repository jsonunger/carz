

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
				.then((cart) => {
					scope.cart = cart
				});
			}
		}
	}
})