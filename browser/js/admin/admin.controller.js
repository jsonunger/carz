app.controller('AdminCtrl', ($scope, users, cars) => {
	$scope.users = users;
	$scope.cars = cars.map((car) => {
		return [
			{ label: 'make', value: car.make },
			{ label: 'model', value: car.model },
			{ label: 'photo', value: car.photo },
			{ label: 'price', value: car.price },
			{ label: 'quantity', value: car.quantity },
			{ label: 'type', value: car.type },
			{ label: 'year', value: car.year }
		]
	});
})
