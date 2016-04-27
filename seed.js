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
        name: 'Zeke Zeke',
        email: 'zeke@zeke.zeke',
        password: 'password'
    },
    {
        name: 'Nav Jo',
        email: 'nsingh3104@gmail.com',
        password: 'incorrect',
        isAdmin: true
    },
    {
        name: 'I Money',
        email: 'i.mohamed037@gmail.com',
        password: 'qwerty',
        isAdmin: true,
        shipping: {
            name: 'I Money',
            street: '6 Empire State Avenue',
            city: 'New York',
            state: 'NY',
            zip: '10203'
        },
        billing: {
            name: 'I Money',
            street: '200 Neverland Ranch',
            city: 'Neverland',
            state: 'CO',
            zip: '23452'
        }
    },
    {
        name: 'Mass Crap',
        email: 'massimo.crapanzano@gmail.com',
        password: 'fart',
        isAdmin: true
    },
    {
        name: 'Json Junger',
        email: 'jasonscottunger@gmail.com',
        password: 'carz',
        isAdmin: true,
        shipping: {
            name: 'Json Junger',
            street: '5 Hanover Square, Fl. 25',
            city: 'New York',
            state: 'NY',
            zip: '10004'
        },
        billing: {
            name: 'Json Junger',
            street: '5 Hanover Square, Fl. 25',
            city: 'New York',
            state: 'NY',
            zip: '10004'
        }
    }
    ];

    return User.create(users);

};

var carDescriptions = ['The ZyearZ ZmakeZ is a testament to contemporary design. While its stunning, sculpted exterior has earned ZmakeZ plenty of style cred, it’s more than just design for design’s sake. ZmakeZ is equipped with thoughtful features like available smart driver-assist technologies and voice-activated controls. Driving one tells the world you know where you’re going.',
'The ZmakeZ ZmodelZ is known for award-winning design, industry-recognized safety and impressive performance. It\'s the luxury compact car that leaves a big impression. Additionally, the ZyearZ ZmakeZ ZmodelZ, when equipped with the Driver Assistance package, is a ZyearZ IIHS Top Safety Pick+',
'A ride as bold as the people who drive them. The ZmakeZ ZmodelZ amplifies its good looks with standard 18-in. alloy wheels. 8 With their machined finish surface and gloss-black accents, these stylish wheels are impossible to ignore.',
'The all-new ZyearZ ZmodelZ is thoughtfully designed to offer impressive safety, exceptional efficiency and seamless connectivity. It’s ready to change your perception of what an automotive vehicle can be. No wonder ZmodelZ has been named “Most Dependable Car” by J.D. Power (current award based on ZyearZ model).',
'Featuring a dramatically redesigned exterior and packed with new technology, the all-new ZyearZ ZmodelZ is leading the charge for the next generation. See which ZmodelZ fits your life and your style.'];

var addPhotos = function(year, make, model){
    var carPhotos = [];
    for(var i =1; i<6; i++){
        carPhotos.push('http://zombdrive.com/images/'+year+'-'+make+'-'+model+'-'+i+'.jpg');
    }
    return carPhotos;
};

var seedCars = function () {

    var cars = [
    {
        model: 'ILX',
        price: 27000,
        make: 'Acura',
        year: 2015,
        type: 'Car'
    },
    {
        model: 'MDX',
        price: 42500,
        make: 'Acura',
        year: 2016,
        type: 'SUV'
    },
    {
        model: 'V8 Vantage',
        price: 121000,
        make: 'Aston Martin',
        year: 2016,
        type: 'Car'
    },
    {
        model: 'i3',
        price: 42000,
        make: 'BMW',
        year: 2015,
        type: 'Car'
    },
    {
        model: '3 Series Gran Turismo',
        price: 43000,
        make: 'BMW',
        year: 2016,
        type: 'Car'
    },
    {
        model: 'Camaro',
        price: 23500,
        make: 'Chevrolet',
        year: 2015,
        type: 'Car'
    },
    {
        model: 'Corvette',
        price: 55000,
        make: 'Chevrolet',
        year: 2016,
        type: 'Car',
        photo: addPhotos(2015, 'chevrolet', 'corvette')
    },
    {
        model: 'Equinox',
        price: 23000,
        make: 'Chevrolet',
        year: 2016,
        type: 'SUV'
    },
    {
        model: 'Silverado 2500HD',
        price: 30000,
        make: 'Chevrolet',
        year: 2015,
        type: 'Truck'
    },
    {
        model: 'Expedition',
        price: 40000,
        make: 'Ford',
        year: 2015,
        type: 'SUV'
    },
    {
        model: 'F-150',
        price: 26000,
        make: 'Ford',
        year: 2016,
        type: 'Truck'
    },
    {
        model: 'Focus',
        price: 16000,
        make: 'Ford',
        year: 2015,
        type: 'Car'
    },
    {
        model: 'Edge',
        price: 27500,
        make: 'Ford',
        year: 2015,
        type: 'Car'
    },
    {
        model: 'Grand Cherokee',
        price: 30000,
        make: 'Jeep',
        year: 2016,
        type: 'SUV'
    },
    {
        model: 'Compass',
        price: 19500,
        make: 'Jeep',
        year: 2016,
        type: 'SUV',
        photo: addPhotos(2015, 'jeep', 'compass')
    },
    {
        model: 'Sienna',
        price: 28500,
        make: 'Toyota',
        year: 2016,
        type: 'Minivan'
    },
    {
        model: 'GLK350',
        price: 38000,
        make: 'Mercedes-Benz',
        year: 2015,
        type: 'SUV',
        photo: addPhotos(2013, 'mercedes-benz', 'glk-class')
    },
    {
        model: 'Sprinter',
        price: 32500,
        make: 'Mercedes-Benz',
        year: 2016,
        type: 'Van'
    },
    {
        model: 'Charger',
        price: 30000,
        make: 'Dodge',
        year: 2016,
        type: 'Car'
    },
    {
        model: 'Challenger',
        price: 35000,
        make: 'Dodge',
        year: 2016,
        type: 'Car'
    },
    {
        model: 'Ram 1500',
        price: 35000,
        make: 'Dodge',
        year: 2016,
        type: 'Truck'
        //photo: addPhotos(2010, 'dodge', 'ram-pickup=1500_crew-cab-pickup_slt_fg_oem_4_2048')
    },
    {
        model: 'Durango',
        price: 19000,
        make: 'Dodge',
        year: 2016,
        type: 'SUV'
    },
    {
        model: 'Q50',
        price: 50000,
        make: 'Infiniti',
        year: 2016,
        type: 'Car',
        photo: addPhotos(2015, 'infiniti', 'q50')
    },
    {
        model: 'Odyssey',
        price: 29400,
        make: 'Honda',
        year: 2016,
        type: 'Minivan'
    },
    {
        model: 'Q60',
        price: 75000,
        make: 'Infiniti',
        year: 2016,
        type: 'Car',
        photo: addPhotos(2015, 'infiniti', 'q60-coupe')
    },
    {
        model: 'Highlander',
        price: 28000,
        make: 'Toyota',
        year: 2016,
        type: 'SUV'
    },
    {
        model: 'Aventador',
        price: 200000,
        make: 'Lamborghini',
        year: 2016,
        type: 'Car'
    },
    {
        model: 'Huracan',
        price: 100000,
        make: 'Lamborghini',
        year: 2016,
        type: 'Car',
        photo: addPhotos(2015, 'lamborghini', 'huracan')
    },
    {
        model: 'Range Rover Sport',
        price: 90000,
        make: 'Land Rover',
        year: 2016,
        type: 'SUV'
    },
    {
        model: 'Quest',
        price: 25000,
        make: 'Nissan',
        year: 2016,
        type: 'Minivan'
    }
    ];

    var carsWithDescriptionsAndPhotos = cars.map(function(elem){
        var mapObj = {ZmakeZ: elem.make, ZmodelZ: elem.model, ZyearZ: elem.year};
        elem.description = carDescriptions[Math.floor((Math.random() * 10) % 5)].replace(/ZmakeZ|ZmodelZ|ZyearZ/gi, function(matched){
            return mapObj[matched];
        });
        if(!elem.photo)elem.photo= addPhotos(2014, elem.make.replace(/\s+/g, '-').toLowerCase(), elem.model.replace(/\s+/g, '-').toLowerCase());
        return elem;
    });

    return Car.create(carsWithDescriptionsAndPhotos);
};

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
        cars: [],
        price: 0
    },
    {
        cars: [],
        price: 0
    }
    ];

    var carIds = [], j, i;
    return User.findOne({email: 'i.mohamed037@gmail.com'})
    .then(i => {
        orders[1].user = i._id;
        return User.findOne({email: 'jasonscottunger@gmail.com'});
    })
    .then(j => {
        orders[0].user = j._id;
        return Car.find();
    })
    .then(cars => {
        cars.forEach(car => carIds.push({id: car._id, price: car.price}));
        var num = 2;
        while (num--) {
            j = Math.floor(Math.random()*carIds.length);
            i = Math.floor(Math.random()*carIds.length);
            orders[0].cars.push(cars[j].id);
            orders[0].price += cars[j].price;
            orders[1].cars.push(cars[i].id);
            orders[1].price += cars[i].price;
        };
        return Order.create(orders);
    })
    .catch(console.error.bind(console));
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
