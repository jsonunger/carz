

app.config($stateProvider => {
	$stateProvider.state('admin', {
		url: '/admin',
		templateUrl: '/js/admin/admin.html',
		controller: 'AdminCtrl',
		resolve: {
			users: (UserFactory, $http) => {
				return $http.get('/api/users')
				.then(res => res.data);
			},
			cars: (CarFactory, $http) => {
				return CarFactory.getCars();
			}
		}
	})
	.state('admin.user', {
		url:'/user',
		templateUrl: '/js/admin/admin.user.html'
	})
	.state('admin.product', {
		url:'/product',
		templateUrl: '/js/admin/admin.product.html'
	})
});