

app.config(($stateProvider) => {
	$stateProvider.state('user', {
		url: '/user',
		templateUrl: '/js/user/user.html',
		controller: 'UserCtrl',
		resolve: {
			user: (UserFactory, AuthService, $http) => {
				return AuthService.getLoggedInUser()
				.then(user =>  $http.get('/api/users/' + user._id))
				.then( user => user.data);
			}
		}
	})
	.state('user.previousOrders', {
		url: '/prev',
		templateUrl: '/js/user/user.prev.html',
		resolve: {
			orders: (UserFactory, $stateParams) => {
				return UserFactory.getOrder()
			}
		}
	})
})
