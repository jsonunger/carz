app.controller('BrowseCtrl', function ($scope, cars, makes, years, types, CarFactory) {
   $scope.cars = cars;
   $scope.makes = makes;
   $scope.years = years;
   $scope.types = types;
   $scope.makeCollapse = true;
   $scope.yearCollapse = true;
   $scope.typeCollapse = true;
   $scope.filter = () => {

	   	let checkedMakes = $scope.makes.filter((make)=>{
            // if(!make.checked) return; 
	   		return make.checked.name;
	   	})
	   	let checkedYears = $scope.years.filter((year)=>{
            // if(!year.checked) return; 
	   		return year.checked.name;
	   	})
	   	let checkedTypes = $scope.types.filter((type)=>{
            // if(!type.checked) return; 
	   		return type.checked.name;
	   	})

         if(checkedMakes.length === 0){
            checkedMakes = $scope.makes;
         }

         checkedYears = checkedYears.length ? checkedYears : $scope.years;
         checkedTypes = checkedTypes.length ? checkedTypes : $scope.types;


         var queryObj = {
            make: { $in: checkedMakes || $scope.makes },
            year: { $in: checkedYears || $scope.years },
            type: { $in: checkedTypes || $scope.types }
         }

         CarFactory.getCars(queryObj)
         .then(function(cars){
            $scope.cars = cars;
         });

   };

});