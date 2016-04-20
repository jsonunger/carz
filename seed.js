/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Car = mongoose.model('Car');
var Review = mongoose.model('Review');
var Order = mongoose.model('Order');
// var rp = require('request-promise');
var lorem = require('lorem-ipsum');

var wipeCollections = function () {
    return Promise.all([
        User.remove({}),
        Car.remove({}),
        Review.remove({}),
        Order.remove({})
        ]);
};

var seedUsers = function () {

    var users = [
    {
        email: 'zeke@zeke.zeke',
        password: 'password'
    },
    {
        email: 'nsingh3104@gmail.com',
        password: 'incorrect',
        isAdmin: true
    },
    {
        email: 'i.mohamed037@gmail.com',
        password: 'qwerty',
        isAdmin: true
    },
    {
        email: 'massimo.crapanzano@gmail.com',
        password: 'fart',
        isAdmin: true
    },
    {
        email: 'jasonscottunger@gmail.com',
        password: 'carz',
        isAdmin: true
    }
    ];

    return User.create(users);

};

var seedCars = function () {

    var cars = [
    {
        model: 'ILX',
        price: 27000,
        make: 'Acura',
        year: 2015,
        type: 'Car',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'MDX',
        price: 42500,
        make: 'Acura',
        year: 2016,
        type: 'SUV',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'V8 Vantage',
        price: 121000,
        make: 'Aston Martin',
        year: 2016,
        type: 'Car',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'i3',
        price: 42000,
        make: 'BMW',
        year: 2015,
        type: 'Car',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: '3 Series Gran Turismo',
        price: 43000,
        make: 'BMW',
        year: 2016,
        type: 'Car',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Camaro',
        price: 23500,
        make: 'Chevrolet',
        year: 2015,
        type: 'Car',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Corvette',
        price: 55000,
        make: 'Chevrolet',
        year: 2016,
        type: 'Car',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Equinox',
        price: 23000,
        make: 'Chevrolet',
        year: 2016,
        type: 'SUV',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Silverado 2500HD',
        price: 30000,
        make: 'Chevrolet',
        year: 2015,
        type: 'Truck',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Expedition',
        price: 40000,
        make: 'Ford',
        year: 2015,
        type: 'SUV',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'F-150',
        price: 26000,
        make: 'Ford',
        year: 2016,
        type: 'Truck',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Focus',
        price: 16000,
        make: 'Ford',
        year: 2015,
        type: 'Car',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Edge',
        price: 27500,
        make: 'Ford',
        year: 2015,
        type: 'Car',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Grand Cherokee',
        price: 30000,
        make: 'Jeep',
        year: 2016,
        type: 'SUV',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Compass',
        price: 19500,
        make: 'Jeep',
        year: 2016,
        type: 'SUV',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Sienna',
        price: 28500,
        make: 'Toyota',
        year: 2016,
        type: 'Minivan',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'GLK350',
        price: 38000,
        make: 'Mercedes-Benz',
        year: 2015,
        type: 'SUV',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Sprinter',
        price: 32500,
        make: 'Mercedes-Benz',
        year: 2016,
        type: 'Van',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Charger',
        price: 30000,
        make: 'Dodge',
        year: 2016,
        type: 'Car',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Challenger',
        price: 35000,
        make: 'Dodge',
        year: 2016,
        type: 'Car',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Ram 1500',
        price: 35000,
        make: 'Dodge',
        year: 2016,
        type: 'Truck',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Durango',
        price: 19000,
        make: 'Dodge',
        year: 2016,
        type: 'SUV',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Q50',
        price: 50000,
        make: 'Infiniti',
        year: 2016,
        type: 'Car',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Odyssey',
        price: 29400,
        make: 'Honda',
        year: 2016,
        type: 'Minivan',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Q60',
        price: 75000,
        make: 'Infiniti',
        year: 2016,
        type: 'Car',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Highlander',
        price: 28000,
        make: 'Toyota',
        year: 2016,
        type: 'SUV',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Aventador',
        price: 200000,
        make: 'Lamborghini',
        year: 2016,
        type: 'Car',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Huracan',
        price: 100000,
        make: 'Lamborghini',
        year: 2016,
        type: 'Car',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Range Rover Sport',
        price: 900000,
        make: 'Land Rover',
        year: 2016,
        type: 'SUV',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    },
    {
        model: 'Quest',
        price: 25000,
        make: 'Nissan',
        year: 2016,
        type: 'Minivan',
        description: lorem({count: Math.ceil(Math.random()*15), units: 'words'})
    }
    ];
    return Car.create(cars);
};

// var seedCars = function () {
//     var options = {
//         uri: 'https://api.edmunds.com/api/vehicle/v2/makes?state=new&year=2016&view=basic&fmt=json&category=minivan&api_key=97praxc3zbju6cvk7e5xy4n2',
//         json: true
//     };
//     return rp(options)
//     .then((cars) => {
//         console.log(cars);
//     })
//     .catch(function (err) {
//         console.error('ERROR: ', err);
//     });
// };

var seedReviews = function () {
    var carIds = [];
    var userIds = [];
    return Car.find()
    .then(function (cars) {
        cars.forEach(car => carIds.push(car._id));
        return User.find();
    })
    .then(function (users) {
        users.forEach(user => userIds.push(user._id));
        var carReviews = [];
        var count = 20;
        var content, stars, randomUser, randomCar; 
        while (count--) {
            content = lorem({count: Math.ceil(Math.random()*15), units: 'words'});
            stars = Math.ceil(Math.random()*5);
            randomUser = userIds[Math.floor(Math.random()*userIds.length)];
            randomCar = carIds[Math.floor(Math.random()*carIds.length)];
            carReviews.push({user: randomUser, car: randomCar, stars: stars, content: content});
        }
        return Review.create(carReviews);
    })
    .then(null, function (err) {
        console.error(err);
    });
};

var seedOrders = function () {
    var orders = [
    {
        user: '5716955dc07aff84422e2e62',
        cars: ['5716763ed4617af42940281c', '5716763ed4617af429402819'],
        price: 30000+38000,
        shipping: {
            street: '5 Hanover Square, Fl. 25',
            city: 'New York',
            state: 'NY',
            zip: '10004'
        },
        billing: {
            street: '5 Hanover Square, Fl. 25',
            city: 'New York',
            state: 'NY',
            zip: '10004'
        }
    },
    {
        user: '5716955dc07aff84422e2e60',
        cars: ['5716763ed4617af429402816', '5716763ed4617af42940281e'],
        price: 26000+30000,
        shipping: {
            street: '6 Empire State Avenue',
            city: 'New York',
            state: 'NY',
            zip: '10203'
        },
        billing: {
            street: '200 Neverland Ranch',
            city: 'Neverland',
            state: 'CO',
            zip: '23452'
        }
    }
];

var userIds = [];
    return User.find()
    .then(function (users) {
        users.forEach(user => userIds.push(user._id));
        return orders.map(order => {
            order.user = userIds[Math.floor(Math.random()*userIds.length)];
            return order;
        });
    })
    .then(modifiedOrders => Order.create(modifiedOrders))
    .then(null, function (err) {
        console.error(err);
    });
};

connectToDb
.then(function () {
    return wipeCollections();
})
.then(function () {
    return seedUsers();
})
.then(function () {
    return seedCars();
})
.then(function () {
    return seedReviews();
})
.then(function () {
    return seedOrders();
})
.then(function () {
    console.log(chalk.green('Seed successful!'));
    process.kill(0);
})
.catch(function (err) {
    console.error(err);
    process.kill(1);
});
