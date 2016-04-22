app.config(function ($stateProvider) {
   $stateProvider.state('browse', {
      url: '/browse',
      templateUrl: 'js/browse/browse.html',
      controller: 'BrowseCtrl',
      resolve: {
         cars: function (CarFactory) {
            return CarFactory.getCars();
         }
      }
   });
});