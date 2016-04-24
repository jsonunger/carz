app.controller('AdminCtrl', ($scope, users, cars) => {
	$scope.users = users;
	$scope.cars = cars;
})