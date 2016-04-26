app.controller('SingleUserCtlr', function ($scope, orders, user, $stateParams){
    $scope.user = user;

    // $scope.reviews = reviews;
    $scope.orders = [];
    orders.forEach((prop)=>{
        $scope.orders.push({
            label: 'cars',
            value: prop.cars.map( car => {
                return car.make + " " + car.model
            }).join(', ')
        });
    });

    $scope.orderActive = false;

    $scope.getOrders = () => {
        if($scope.orderActive) {
            $scope.orderActive = false;
        } else {
            $scope.orderActive = true;
        }
    };

});
