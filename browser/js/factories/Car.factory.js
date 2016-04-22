app.factory('CarFactory', function ($http) {
   var CarFactory = {};
   var parseData = res => res.data;
   CarFactory.getCars = function (query) {
      return $http.get('/api/cars',{
         params: query
      }).then(parseData);
   };

   return CarFactory;
});