app.controller('SingleUserCtlr', function ($scope, orders, user, reviews, $stateParams, ReviewFactory){
    $scope.user = user;

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
            {label: 'content', value: rev.content },
            {label: "stars", value: rev.stars },
            {label: 'id', value: rev._id }
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
    };

    $scope.deleteReview = (id) => {
        ReviewFactory.deleteReview(user._id, id);
    };

    $scope.saveOrder = (order) =>{
        let updateOrder = {};
        order.forEach(prop => {
            if(prop.label !== 'cars'){
                updateOrder[prop.label] = prop.value;
            }
        });
    };

    $scope.saveUser = () =>{

    }


    $scope.getOrders = () => {
        if($scope.orderActive) {
            $scope.orderActive = false;
        } else {
            $scope.orderActive = true;
        }
    };

    $scope.getUserInfo = () => {
        if($scope.userActive) {
            $scope.userActive = false;
        } else {
            $scope.userActive = true;
        }
    };

});
