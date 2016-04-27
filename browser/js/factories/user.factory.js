

app.factory('UserFactory', ($http) => {
	var UserFactory = {};
	var parseData = res => res.data;

	UserFactory.getUser = (id) => {
		return $http.get('/api/users/' + id)
		.then(parseData);
	};
	UserFactory.updateUser = (id, body) => {
		return $http.put('/api/users/' + id, body).then(parseData);
	}
	return UserFactory;
});