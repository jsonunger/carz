

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
			cars: (CarFactory, $http) => CarFactory.getCars()
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
    .state('admin.addCar', {
        url: '/addCar',
        templateUrl: '/js/admin/addCar.html',
        controller: function($scope,CarFactory) {
            $scope.save = () => {
                var carToAdd = {};
                $scope.newCar.forEach((prop)=> carToAdd[prop.label] = prop.value);
                CarFactory.addCar(carToAdd)
                .then(() => alert('You added a car'));
            }
        }
    })
    .state('admin.user.orders', {
    	url: '/order',
    	templateUrl: '/js/admin/admin.user.order.html'
    })
    .state('admin.user.reviews', {
    	url: '/order',
    	templateUrl: '/js/admin/admin.user.reviews.html'
    })
    .state('admin.user.userInfo', {
    	url: '/order',
    	templateUrl: '/js/admin/admin.user.userInfo.html'
    })
});
