

app.config($stateProvider => {
	$stateProvider.state('admin', {
		url: '/admin',
		templateUrl: '/js/admin/admin.html',
		controller: 'AdminCtrl',
		resolve: {
			user: (UserFactory, $http) => {
				return $http.get('/api/users')
				.then(res => res.data);
			}
		}
	})
	.state('admin.user', {
		url:'/user',
		templateUrl: '/js/admin/admin.user.html'
	})
	.state('admin.order', {
		url:'/order',
		templateUrl: '/js/admin/admin.order.html'
	})
	.state('admin.product', {
		url:'/product',
		templateUrl: '/js/admin/admin.product.html'
	})
});