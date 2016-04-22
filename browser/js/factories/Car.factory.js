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

   return CarFactory;
});
