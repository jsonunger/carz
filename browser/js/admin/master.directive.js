

app.directive('master', () => {
	return {
		restrict: 'E',
		templateUrl: '/js/admin/master.html',
		scope:{
			masterObj: '=',
			onSave: '&'
		},
		link: (scope, element) => scope.save = () => scope.onSave(scope.masterObj)
	};
});
