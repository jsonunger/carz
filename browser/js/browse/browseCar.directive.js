app.directive('browseCar', function(OrderFactory, $rootScope, $state) {
	return {
		restrict: 'E',
      scope: {
         car: '='
      },
      templateUrl: '/js/browse/browse-car.html',
      link: function (scope, iElem, iAttrs) {
         scope.addToOrder = function (car) {
            OrderFactory.addToOrder(car)
            .then(function () {
               $state.go('order-cart');
            });
         };
      }
   };
});