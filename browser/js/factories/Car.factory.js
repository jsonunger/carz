app.factory('CarFactory', function ($http) {
   var CarFactory = {};
   var parseData = res => res.data;

   CarFactory.getCars = function (query) {
      return $http.get('/api/cars',{
         params: query
      }).then(parseData);
   };

   CarFactory.getCar = function(id) {
        return $http.get('/api/cars/' + id)
        .then(parseData);
   };

   CarFactory.deleteCar = function(id) {
      return $http.delete('/api/cars/' + id);
   }

   CarFactory.updateCar = function(id, body) {
      return $http.put('/api/cars/' + id, body)
      .then(parseData);
   }

   CarFactory.addCar = function(body){
      return $http.post('/api/cars/', body);
   }

   return CarFactory;
});
