app.factory('ReviewFactory', function ($http) {
   var ReviewFactory = {};
   var parseData = res => res.data;

   ReviewFactory.getCarReviews = function (carId) {
      return $http.get('/api/cars/'+carId+'/reviews')
      .then(parseData);
   };

   ReviewFactory.getUserReviews = function (userId) {
      return $http.get('/api/users/'+userId+'/reviews')
      .then(parseData);
   };

   return ReviewFactory;
});