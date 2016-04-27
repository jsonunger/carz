app.controller('AdminCtrl', ($scope, users, cars, UserFactory) => {
	$scope.users = users;

    $scope.users.forEach( user=> user.exist = true );

	$scope.cars = cars.map((car) => {
		return [
			{ label: 'make', value: car.make },
			{ label: 'model', value: car.model },
			{ label: 'photo', value: car.photo },
			{ label: 'price', value: car.price },
			{ label: 'quantity', value: car.quantity },
			{ label: 'type', value: car.type },
			{ label: 'year', value: car.year },
            {label: 'description', value: car.description},
            {label: 'rating', value: car.rating},
            {label: 'id', value: car._id}
		]
	})

    $scope.eraseUser = (user) => {
        user.exist = false;
        UserFactory.deleteUser(user._id);
    };

    $scope.newCar = [];
    $scope.cars[0].forEach((car) => {
        if(car.label !== 'id'){
            $scope.newCar.push({ label: car.label, value: '' });
        }
    })

})
