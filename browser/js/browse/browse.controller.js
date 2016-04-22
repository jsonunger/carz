app.controller('BrowseCtrl', function ($scope, cars, makes, years, types) {
   $scope.cars = cars;
   $scope.makes = makes;
   $scope.years = years;
   $scope.types = types;
   $scope.makeCollapse = true;
   $scope.yearCollapse = true;
   $scope.typeCollapse = true;
});