app.controller('UserCtrl', function($scope, UserFactory, user, userReviews, $state) {
	$scope.user = user;
    $scope.reviews = userReviews;

    $scope.oneAtATime = true;
    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
      };

    $scope.sameAddress = false;
    $scope.toggleBilling = () => $scope.sameAddress = !$scope.sameAddress;

    $scope.save = function(){
        if($scope.sameAddress) $scope.user.billing = $scope.user.shipping;
        UserFactory.updateUser($scope.user._id, $scope.user)
        .then(newUser =>{
            $scope.user = newUser;
            $state.reload();
            alert('User information updated');
        });
    };
});
