app.controller('BrowseCtrl', function ($scope, cars, makes, years, types, CarFactory) {
   $scope.cars = cars;
   $scope.makes = makes;
   $scope.years = years;
   $scope.types = types;
   $scope.makeCollapse = true;
   $scope.yearCollapse = true;
   $scope.typeCollapse = true;
   $scope.filter = () => {

      $scope.cars = cars;
      var filtered = [];

      function checkIfChecked(array){
         var checked = false;
         array.forEach((obj)=> {
            if(obj.checked) checked = true;
         });
         return checked;
      }

      function addToFiltered(arrayToAdd) {
         if(!checkIfChecked(arrayToAdd)) {
            arrayToAdd.forEach((property) =>  filtered.push(property.name));
         } else {
            arrayToAdd.forEach((property) => {
               if(property.checked){
                  filtered.push(property.name);
               }
            });
         }
      };

      addToFiltered($scope.makes);
      addToFiltered($scope.years);
      addToFiltered($scope.types);

      $scope.cars = $scope.cars.filter((car)=>{
         return (filtered.includes(car.make) &&
            filtered.includes(car.year) &&
            filtered.includes(car.type));
      });

   };

});
