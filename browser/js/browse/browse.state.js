app.config(function ($stateProvider) {
   $stateProvider.state('browse', {
      url: '/browse',
      templateUrl: 'js/browse/browse.html',
      controller: 'BrowseCtrl',
      resolve: {
         cars: function (CarFactory) {
            return CarFactory.getCars();
         },
         makes: function (cars) {
            var makes = [];
            cars.forEach(function (car) {
               if (makes.indexOf(car.make) === -1) makes.push(car.make);
            });
            return makes.sort().map(function (make) {
               return {name: make};
            });
         },
         years: function (cars) {
            var years = [];
            cars.forEach(function (car) {
               if (years.indexOf(car.year) === -1) years.push(car.year);
            });
            return years.sort().map(function (year) {
               return {name: year};
            });
         },
         types: function (cars) {
            var types = [];
            cars.forEach(function (car) {
               if (types.indexOf(car.type) === -1) types.push(car.type);
            });
            return types.sort().map(function (type) {
               return {name: type};
            });
         }
      }
   });
});