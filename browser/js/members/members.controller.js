app.controller('MemberCtrl', function ($scope, SecretStash) {
   SecretStash.getStash().then(function (stash) {
     $scope.stash = stash;
  });
});