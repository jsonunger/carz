

app.config(($stateProvider) => {
	$stateProvider.state('user', {
		url: '/user',
		templateUrl: '/js/user/user.html',
		controller: 'UserCtrl',
		resolve: {
			user: (UserFactory, AuthService) => {
				return AuthService.getLoggedInUser();
			}
		}
	})
	.state('user.previousOrders', {
		url: '/prev',
		templateUrl: '/js/user/user.prev.html',
		// controller: 'UserCtrl',
		resolve: {
			orders: (UserFactory, $stateParams) => {
				return UserFactory.getOrder()
			}
		}
	})
})