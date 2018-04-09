var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var request = require('request');
var session = require('express-session');

router.use(session({
    cookieName: 'cart',
    secret: 'channels',
    resave: true,
    saveUninitialized: true
}));

//Home
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Sky Tech Test' });
});

//Products
router.get('/products', function(req, res) {
    //var cookie = req.cookies.customerID;
    //res.cookie('customerID', 1, {maxAge: 900000, httpOnly: true});
    var customerID = 1;

    req.session.customerID = customerID;

    var CustomerLocationService = require('../constructors/CustomerLocationService.js');
    var location = new CustomerLocationService(customerID);
    var locationID = location.findLocation(customerID);

    if(typeof locationID !== 'undefined'){
        var CatalogueService = require('../constructors/CatalogueService.js');
        var catalog = new CatalogueService(locationID);
        var catalogList = catalog.fetchCatalog();

        res.render('products', {title: 'Product Selection Page', location: location, catalog: catalogList});
    }
});

//save
router.post('/save', function(req, res, next) {
    //console.log(req.body);
    if(req.session.cart) {
        //check if already in session
        if (req.session.cart.includes(req.body.channel)) {
            //delete channel from session
            var index = req.session.cart.indexOf(req.body.channel);
            req.session.cart.splice(index, 1);
        } else {
            //if not add
            req.session.cart.push(req.body.channel);
        }
        var myObject = {channel: req.session.cart};
    } else {
        //start session
        req.session.cart = [req.body.channel];
        var myObject = {channel: req.session.cart};
    }
    res.json(myObject);
});

//Confirmation Page
router.get('/checkout', function(req, res, next) {
    console.log(req.session.cart);
    res.render('confirm', { title: 'Confirmation Page', cart: req.session.cart, customerID: req.session.customerID});
});

module.exports = router;
