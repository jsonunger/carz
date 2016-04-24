app.controller('orderCtrl', function($scope, OrderFactory, $state, $uibModal){

	$scope.addAddress = function(){
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: '/js/orders/addAddress.template.html',
			//We Can Use the UserCtrl Here!!!
			// controller: 'userCtrl'
			size: 'lg',
			//Resolve can be used to fill out current user address
			//psudocode down here
			// resolve: {
			// 	currentInfo: function() {
			// 		return userfactory user info
			// 	}
			// }
		});
	};

	$scope.test = () => console.log($scope.sameAddress);
	
	$scope.confirm = function(){
		$state.go('order-confirm');
	};
});