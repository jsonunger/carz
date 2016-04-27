

app.factory('UserFactory', ($http) => {
	var UserFactory = {};
	var parseData = res => res.data;

	UserFactory.getUser = (id) => {
		return $http.get('/api/users/' + id)
		.then(parseData);
	};
	UserFactory.updateUser = (id, body) => {
		return $http.put('/api/users/' + id, body);
	}

	UserFactory.createUser = (body) => {
		return $http.post('/api/users/', body)
		.then(parseData);
	}

    UserFactory.deleteUser = (id) => {
        return $http.delete('/api/users/' + id)
        .then(parseData);
    }

	return UserFactory;
});
