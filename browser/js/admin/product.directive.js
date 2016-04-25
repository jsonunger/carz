

app.directive('product', () => {
	return {
		restrict: 'E',
		templateUrl: '/js/admin/product.html',
		scope:{
			productObj: '=',
		},
		link: (scope, element) => {
            scope.save = () => {
                console.log(scope.productObj);
            }
        }
	};
});
