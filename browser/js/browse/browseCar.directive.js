app.directive('browseCar', function() {
	return {
		restrict: 'E',
      scope: {
         car: '='
      },
		templateUrl: '/js/browse/browse-car.html'
	};
});