app.controller('SignupCtrl', function ($scope, AuthService, $state, UserFactory) {

    $scope.signup = {};
    $scope.error = null;

    $scope.sendSignup = function (signupInfo) {

        $scope.error = null;

        UserFactory.createUser(signupInfo)
        .then(() => {
             AuthService.login(signupInfo)
             .then(() => $state.go('home'))
             .catch(() => $scope.error = 'Invalid signup credentials.' );
        })
    };
});