

app.directive('product', (CarFactory) => {
	return {
		restrict: 'E',
		templateUrl: '/js/admin/product.html',
		scope:{
			car: '=',
		},
		link: (scope, element) => {
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
                CarFactory.deleteCar(deleteCarId);
            }
        }
	};
});
