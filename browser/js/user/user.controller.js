

app.controller('UserCtrl', function($scope, UserFactory, user) {
	$scope.user = user;
    console.log('user', user);
	$scope.newUserObj = [
        { label: 'email', value: user.email },
        { label: 'phone', value: user.phone },
        { label: 'shipping address', value: user.shipping},
        { label: 'billing address', value: user.billing }
    ];

	$scope.save = () => {
		UserFactory.updateUser(user._id, {
			email: $scope.newUserObj.email[1],
			phone: $scope.newUserObj.phone[1],
			shipping: $scope.newUserObj.shipping[1],
			billing: $scope.newUserObj.billing[1]
		});
	}
	console.log(user);
});
