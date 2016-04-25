app.directive('carInfo', function () {
   return {
      restrict: 'E',
      templateUrl: 'js/car/car-info.html',
      scope: {
         car: '='
      }
   };
});