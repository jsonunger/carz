app.directive('stars', function () {
   return {
      restrict: 'E',
      urlTemplate: 'js/stars/stars.html',
      scope: {
         rating: '='
      }
   };
});