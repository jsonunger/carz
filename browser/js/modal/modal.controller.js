app.controller('ModalCtrl', function ($scope, $uibModalInstance, ModalFactory, order, type, OrderFactory, $rootScope) {
	$scope.address = order[type];
	$scope.ok = function () {
		order[type] = $scope.address;
		OrderFactory.updateOrder(order)
		.then(function (updatedOrder) {
			$uibModalInstance.close(updatedOrder[type]);
		});
   };
});