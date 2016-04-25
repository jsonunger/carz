app.directive('review', function () {
   return {
      restrict: 'E',
      templateUrl: 'js/review/review.html',
      scope: {
         review: '=',
         type: '@'
      },
      link: function (scope, iElem, iAttrs) {
         scope.rating = function (num) {
            return new Array(num);
         };
      }
   };
});