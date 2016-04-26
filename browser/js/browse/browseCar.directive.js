app.directive('browseCar', function(OrderFactory, $rootScope, $state) {
	return {
		restrict: 'E',
      scope: {
         car: '='
      },
      templateUrl: '/js/browse/browse-car.html',
      link: function (scope, iElem, iAttrs) {
         scope.addToOrder = function (carId) {
            OrderFactory.addToOrder(carId)
            .then(function (updatedOrder) {
               $rootScope.order = updatedOrder;
               $state.go('order-cart', {orderId: updatedOrder._id});
            });
         };
      }
   };
});