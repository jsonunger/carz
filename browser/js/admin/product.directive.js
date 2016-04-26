

app.directive('product', (CarFactory, $state) => {
	return {
		restrict: 'E',
		templateUrl: '/js/admin/product.directive.html',
		scope:{
			car: '=',
		},
		link: (scope, element) => {
            scope.hideCurrent = false;

            scope.save = () => {
                var updateCar = {};
                scope.car.forEach((car) => {
                    updateCar[car.label] = car.value;
                });

                CarFactory.updateCar(updateCar.id, updateCar);
            }

            scope.delete = () => {
                var deleteCarId;
                scope.car.forEach((car) => {
                    if(car.label === 'id'){
                        deleteCarId = car.value;
                    }
                });
                CarFactory.deleteCar(deleteCarId)
                .then(() => {
                    scope.hideCurrent = true;
                })
            }
        }
	};
});
