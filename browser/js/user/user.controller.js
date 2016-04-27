app.controller('UserCtrl', function($scope, UserFactory, user, userReviews, previousOrders) {
	$scope.user = user;
    $scope.reviews = userReviews;
    $scope.previousOrders = previousOrders;

    console.log($scope.previousOrders);
    
    $scope.oneAtATime = true;
    $scope.status = {
        isFirstOpen: true,
        isFirstDisabled: false
      };

    $scope.sameAddress = false;
    $scope.toggleBilling = () => $scope.sameAddress = !$scope.sameAddress;
    // $scope.getPrice = function(arr){
    //     return arr.reduce((prevVal, currentVal) => prevVal + currentVal);
    // };

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
