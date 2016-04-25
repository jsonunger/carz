

app.directive('master', () => {
	return {
		restrict: 'E',
		templateUrl: '/js/admin/master.html',
		scope:{
			masterObj: '='
		},
		link: (scope, element) => {

		}
	}
})
