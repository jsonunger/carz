app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state, OrderFactory) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/navbar/navbar.html',
        link: function (scope) {
            OrderFactory.getCurrentOrder()
            .then(order => scope.order = order);

            scope.items = [
                { label: 'Home', state: 'home' },
                { label: 'Browse', state: 'browse' },
                { label: 'My Account', state: 'user', auth: true }
            ];

            scope.admin = { label: 'Admin Tools', state: 'admin', auth: true};

            scope.user = null;

            scope.navCollapse = false;

            scope.goToOrder = function () {
                $state.go('order-cart');
            };

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };

            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);
            $rootScope.$on('updateOrder', function (e, order) {
                scope.order = order;
            });
        }
    };
});
