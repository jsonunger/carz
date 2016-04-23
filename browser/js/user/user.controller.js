

app.controller('UserCtrl', function($scope, UserFactory, user) {
	$scope.user = user;
	$scope.newUserObj = {
		email: ['email', user.email],
		phone: ['phone', user.phone],
		shipping: ['shipping address', user.shipping],
		billing: ['billing address', user.billing]
	}
	$scope.save = () => {
		UserFactory.updateUser(user._id, {
			email: $scope.newUserObj.email[1],
			phone: $scope.newUserObj.phone[1],
			shipping: $scope.newUserObj.shipping[1],
			billing: $scope.newUserObj.billing[1]
		});
	}
	//console.log($scope)
});