app.controller('ModalCtrl', function ($scope, $uibModalInstance, ModalFactory, order, type, OrderFactory) {
	$scope.address = order[type];
	$scope.ok = function () {
		order[type] = $scope.address;
		OrderFactory.updateAddress(order)
		.then(function (updatedOrder) {
			$uibModalInstance.close(updatedOrder[type]);
		});
   };
   $scope.close = function () {
      $uibModalInstance.dismiss('cancel');
   }
});