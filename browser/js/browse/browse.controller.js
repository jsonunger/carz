app.controller('BrowseCtrl', function ($scope, cars, makes, years, types, CarFactory) {
   $scope.cars = cars;
   $scope.makes = makes;
   $scope.years = years;
   $scope.types = types;
   $scope.makeCollapse = true;
   $scope.yearCollapse = true;
   $scope.typeCollapse = true;
   $scope.filter = () => {
      function isEmpty(resultArray, checkArray, scopeArray, type) {
         console.log(checkArray);
         if(checkArray.length === 0){
            resultArray.concat(scopeArray.map(function(car){
               car[type];
            }));
         }
      }
      var filtered = []
	   	var checkedMakes = $scope.makes.forEach((make)=>{
	   		if(make.checked){
               filtered.push(make.name);
            }
	   	});
	   	var checkedYears = $scope.years.forEach((year)=>{
            if(year.checked){
               filtered.push(year.name);
            }
	   	});
	   	var checkedTypes = $scope.types.forEach((type)=>{
           if(type.checked){
               filtered.push(type.name);
            }
	   	});

         isEmpty(filtered, checkedMakes, $scope.makes, 'make');
         isEmpty(filtered, checkedYears, $scope.years, 'year');
         isEmpty(filtered, checkedTypes, $scope.types, 'type');

         $scope.cars = $scope.cars.filter((car)=>{
            return (filtered.includes(car.make) &&
               filtered.includes(car.year) &&
               filtered.includes(car.type));
         })

   };

});