app.controller('SingleUserCtlr', function ($scope, orders, user, reviews, $stateParams){
    $scope.user = user;

    // $scope.reviews = reviews;
    $scope.orders = [];
    $scope.reviews = [];
    $scope.orderActive = false;
    $scope.reviewsActive = false;
    $scope.userActive = false;

    orders.forEach((ord)=>{
        $scope.orders.push([
            {label: 'cars', value: ord.cars.map( car => {
                return car.make + " " + car.model
            }).join(', ')},
            {label: 'completed', value: ord.completed},
            {label: 'price', value: ord.price}
            ]);
    });

    reviews.forEach(rev => {
        $scope.reviews.push([
            {label: "car", value: rev.car.make + ", " + rev.car.model },
            {label: 'review content', value: rev.content },
            {label: "stars", value: rev.stars }
        ]);
    });


    $scope.user = [
        {label: "email", value: user.email },
        {label: 'name', value: user.name }
    ];

    $scope.getReviews = () => {
         if($scope.reviewsActive) {
            $scope.reviewsActive = false;
        } else {
            $scope.reviewsActive = true;
        }
    }


    $scope.getOrders = () => {
        if($scope.orderActive) {
            $scope.orderActive = false;
        } else {
            $scope.orderActive = true;
        }
    };

    $scope.getUserInfo = () => {
        console.log($scope.user);
        if($scope.userActive) {
            $scope.userActive = false;
        } else {
            $scope.userActive = true;
        }
    };

});
