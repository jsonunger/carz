

app.controller('UserCtrl', function($scope, UserFactory, user) {
	$scope.user = user;
    //console.log('user', user);
	$scope.newUserObj = [
        { label: 'email', value: user.email },
        { label: 'phone', value: user.phone },
        { label: 'shipping address', value: user.shipping},
        { label: 'billing address', value: user.billing }
    ];


    $scope.save = () => {
        let updateInfo = {};
        $scope.newUserObj.forEach((prop) => updateInfo[prop.label.split(' ')[0]] = prop.value );
        UserFactory.updateUser(user._id, updateInfo)
    };
});
