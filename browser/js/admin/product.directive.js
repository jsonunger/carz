

app.directive('product', () => {
	return {
		restrict: 'E',
		templateUrl: '/js/admin/product.html',
		scope:{
			productObj: '=',
		},
		link: (scope, element) => {
            console.log(scope.productObj);
            scope.save = () => {
                console.log(scope.productObj);
            }
        }
	};
});
