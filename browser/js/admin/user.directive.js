

// app.directive('user', (OrderFactory, $log)=> {
// 	return {
// 		restrict: 'E',
// 		templateUrl: '/js/admin/user.directive.html',
// 		scope:{
// 			user: "="
// 		},
// 		link: (scope, element) => {
// 			scope.getOrders = (id) => {
//                 if(scope.cart) {
//                     scope.cart = null;
//                     return;
//                 }
// 				OrderFactory.getAllCarts(id)
// 				.then((order) => {
// 					scope.cart = order.map((cart) => {

// 						var shippingAddress = [];
// 						var billingAddress = [];

// 						Object.keys(cart.shipping).forEach((key) => {
// 							if(key !== '_id'){
// 								shippingAddress.push(cart.shipping[key]);
// 							}
// 						})
						
// 						Object.keys(cart.billing).forEach((key) => {
// 							if(key !== '_id'){
// 								billingAddress.push(cart.billing[key]);
// 							}
// 						})
// 						var cars = cart.cars.map((car) => {

// 							return car.model + ' ' + car.make;
// 						}).join(', ');

// 						return [
//     						{label: "cars", value: cars, disable: true},
//     						{label: "shipping address", value: shippingAddress.join(', '), disable: false},
//     						{label: "billing address", value: billingAddress.join(', '), disable: false},
//     						{label: "complete", value: cart.completed, disable: false},
//     						{label: "price", value: cart.price, disable: true}
//     					];
//     				});
// 				})
//                 .catch($log.error);
// 			}
// 		}
// 	}
// })


app.directive('user', (OrderFactory, UserFactory, ReviewFactory) => {
	return {
		restrict: 'E',
		scope: {user: "="},
		templateUrl: '/js/admin/user.directive.html',
		link: (scope) => {
			scope.getUsers = () => user;
			scope.getReviews = (id) => ReviewFactory.getCarReviews(id);
			scope.getOrders = (id) => OrderFactory.getOrder(id);
		}
	};
});





























