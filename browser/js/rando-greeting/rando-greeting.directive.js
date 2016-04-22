app.directive('randoGreeting', function (RandomGreetings) {

    return {
        restrict: 'E',
        templateUrl: 'js/rando-greeting/rando-greeting.html',
        link: function (scope) {
            scope.greeting = RandomGreetings.getRandomGreeting();
        }
    };

});