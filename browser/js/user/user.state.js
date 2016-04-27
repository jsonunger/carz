

app.config(($stateProvider) => {
	$stateProvider.state('user', {
		url: '/user',
		templateUrl: '/js/user/user.html',
		controller: 'UserCtrl',
		resolve: {
			user: (UserFactory, AuthService) => {
				return AuthService.getLoggedInUser();
			},
			previousOrders: (OrderFactory) => {
				return OrderFactory.getPreviousOrders();
			},
			userReviews: (ReviewFactory, user) => {
				return ReviewFactory.getUserReviews(user._id);
			} 
		}
	});
});
