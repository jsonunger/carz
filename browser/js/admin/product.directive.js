

app.directive('product', () => {
	return {
		restrict: 'E',
		templateUrl: '/js/admin/product.html',
		scope:{
			car: '=',
		},
		link: (scope, element) => {
            scope.save = () => {
                console.log(scope.car);
            }
        }
	};
});
