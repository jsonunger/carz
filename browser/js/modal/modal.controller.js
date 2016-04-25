app.controller('ModalCtrl', function ($scope, $uibModalInstance, ModalFactory) {
   $scope.ok = function (type) {
      if (type === 'shipping') $uibModalInstance.close($scope.shippingInfo);
      if (type === 'billing') $uibModalInstance.close($scope.billingInfo);
      if (type === 'user') $uibModalInstance.close($scope.userInfo);
   };
});