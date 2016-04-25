

app.controller('UserCtrl', function($scope, UserFactory, user) {
	$scope.user = user;

    $scope.shipping = [
        {label: 'street', value: user.shipping ? user.shipping.street : '' },
        {label: 'city', value: user.shipping ? user.shipping.city : '' },
        {label: 'state', value: user.shipping ? user.shipping.state : '' },
        {label: 'zip', value: user.shipping ? user.shipping.zip : '' }
    ]

    $scope.billing = [
        {label: 'street', value: user.billing ? user.billing.street : '' },
        {label: 'city', value: user.billing ? user.billing.city : '' },
        {label: 'state', value: user.billing ? user.billing.state : '' },
        {label: 'zip', value: user.billing ? user.billing.zip : '' }
    ]

	$scope.newUserObj = [
        { label: 'email', value: user.email },
        { label: 'phone', value: user.phone }
    ];

    console.log(user);


    $scope.save = () => {
        let updateInfo = {};
        console.log('newUs', $scope.newUserObj);
        console.log('bill', $scope.billing);
        console.log('shipp', $scope.shipping);

        $scope.newUserObj.forEach((prop) => updateInfo[prop.label.split(' ')[0]] = prop.value );
        updateInfo.shipping = {};
        updateInfo.billing = {};
        $scope.shipping.forEach((prop) => updateInfo.shipping[prop.label] = prop.value );
        $scope.billing.forEach((prop) => updateInfo.billing[prop.label] = prop.value);
        UserFactory.updateUser(user._id, updateInfo)
        console.log(updateInfo);
    };
});
