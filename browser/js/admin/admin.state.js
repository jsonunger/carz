

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
	.state('admin.users', {
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
    .state('admin.singleuser', {
    	url: '/:userId',
    	templateUrl: '/js/admin/singleuser.state.html',
        controller: "SingleUserCtlr",
        resolve: {
            orders : function($stateParams, OrderFactory) {
                return OrderFactory.getAllCarts($stateParams.userId);
            },
            reviews: function($stateParams, ReviewFactory) {
                return ReviewFactory.getUserReviews($stateParams.userId);
            },
            user: function($stateParams, UserFactory){
                return UserFactory.getUser($stateParams.userId);
            }
        }
    })
});












