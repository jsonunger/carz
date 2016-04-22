app.config(function ($stateProvider) {
   $stateProvider.state('browse', {
      url: '/browse',
      templateUrl: 'js/browse/browse.html',
      controller: 'BrowseCtrl',
      resolve: {
         cars: function ($http) {
            return $http.get('/api/cars')
            .then(res => res.data);
         }
      }
   });
});