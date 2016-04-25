

app.directive('master', () => {
	return {
		restrict: 'E',
		templateUrl: '/js/admin/master.html',
		scope:{
			masterObj: '=',
			onSave: '&'
		},
		link: (scope, element) => {
			scope.save = () => {
				console.log(scope.masterObj)
				scope.onSave(scope.masterObj);
			};
		}
	};
});
