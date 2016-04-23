app.filter('carFilter', function () {
   return function (input, makes, years, types) {
      let carMakes = [], carYears = [], carTypes = [], result = [];

      angular.forEach(input, function (car) {
         let make = makes.filter(make => make.name === car.make)[0];
         if (make.checked) {
            carMakes.push(car);
         }
      });
      
      angular.forEach(input, function (car) {
         let year = years.filter(year => year.name === car.year)[0];
         if (year.checked) {
            carYears.push(car);
         }
      });

      angular.forEach(input, function (car) {
         let type = types.filter(type => type.name === car.type)[0];
         if (type.checked) {
            carYears.push(car);
         }
      });
      if (carMakes.length === 0) carMakes = input;
      if (carYears.length === 0) carYears = input;
      if (carTypes.length === 0) carTypes = input;

      angular.forEach(input, function (car) {
         if (carMakes.indexOf(car) !== -1 && carYears.indexOf(car) !== -1 && carTypes.indexOf(car) !== -1) {
            result.push(car);
         }
      });

      return result.length === 0 ? input : result;
   };
});