app.factory('ModalFactory', function ($uibModal, $rootScope) {
   var ModalFactory = {};

   ModalFactory.createModal = function (templateUrl, scope, type, size, animation) {
      animation = animation || true;
      size = size || 'lg';
      scope = scope || $rootScope;
      return $uibModal.open({
         animation: animation,
         templateUrl: templateUrl,
         controller: 'ModalCtrl',
         size: size,
         resolve: {
            order: function () {
               return scope.order;
            },
            type: function () {
               return type;
            }
         },
         scope: scope
      });
   };

   return ModalFactory;
});