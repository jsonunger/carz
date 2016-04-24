

app.directive('user', (OrderFactory)=> {
	return {
		restrict: 'E',
		templateUrl: '/js/admin/user.directive.html',
		scope:{
			users: "="
		},
		link: (scope) => {

			scope.getOrders = (id) => {
				OrderFactory.getCart(id)
				.then((cart) => {
					console.log('CART', cart);
					scope.cart = cart
				});
			}
		}
	}
})