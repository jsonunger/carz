app.controller('BrowseCtrl', function ($scope, cars) {
   $scope.cars = cars;
   $scope.makes = [];
   $scope.years = [];
   $scope.types = ['Car', 'Truck', 'SUV', 'Van', 'Minivan'];
   $scope.cars.forEach(function (car) {
      if ($scope.makes.indexOf(car.make) === -1) $scope.makes.push(car.make);
      if ($scope.years.indexOf(car.year) === -1) $scope.years.push(car.year);
   });
   $scope.makes.sort();
   $scope.years.sort();
   $scope.makeCollapse = true;
   $scope.yearCollapse = true;
   $scope.typeCollapse = true;
});