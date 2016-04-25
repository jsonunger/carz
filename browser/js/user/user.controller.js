

app.controller('UserCtrl', function($scope, UserFactory, user) {
	$scope.user = user;

    if(user.shipping) {
        if(user.shipping.street === user.billing.street) {
            $scope.checked = true;
            $scope.hideBilling = true;
        }
    }

    $scope.toggleBilling = function() {
        if($scope.checked){
            $scope.hideBilling = true;
        } else {
            $scope.hideBilling = false;
        }
    }

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
        {label: 'name', value: user.name },
        { label: 'email', value: user.email },
        { label: 'phone', value: user.phone }
    ];

    $scope.save = () => {
        let updateInfo = {};

        $scope.newUserObj.forEach((prop) => updateInfo[prop.label.split(' ')[0]] = prop.value );
        updateInfo.shipping = {};
        updateInfo.billing = {};
        if($scope.checked) $scope.billing = $scope.shipping;
        $scope.shipping.forEach((prop) => updateInfo.shipping[prop.label] = prop.value );
        $scope.billing.forEach((prop) => updateInfo.billing[prop.label] = prop.value);
        UserFactory.updateUser(user._id, updateInfo)
    };
});
