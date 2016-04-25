app.factory('ModalFactory', function ($uibModal, $rootScope) {
   var ModalFactory = {};

   ModalFactory.createModal = function (templateUrl, scope, size, animation) {
      animation = animation || true;
      size = size || 'lg';
      scope = scope || $rootScope;
      return $uibModal.open({
         animation: animation,
         templateUrl: templateUrl,
         controller: 'ModalCtrl',
         size: size,
         //Resolve can be used to fill out current user address
         //psudocode down here
         // resolve: {
         //    currentInfo: function() {
         //       return userfactory user info
         //    }
         // }
         scope: scope
      });
   };

   return ModalFactory;
});