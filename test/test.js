var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;

var CustomerLocationService = require('../constructors/CustomerLocationService.js');
var CatalogueService = require('../constructors/CatalogueService.js');

describe('CustomerLocationService', function() {
    it('should return LONDON if customerID 1' , function() {
        var location = new CustomerLocationService(1);

        expect(location.findLocation()).to.equal('LONDON');
    });
    it('should return LIVERPOOL if customerID 2' , function() {
        var location = new CustomerLocationService(2);

        expect(location.findLocation()).to.equal('LIVERPOOL');
    });
    it('should return NO LOCATION if customerID greater than 2' , function() {
        var location = new CustomerLocationService(3);

        expect(location.findLocation()).to.equal('NO LOCATION');
    });
    it('should throw error if customerID false' , function() {
        var location = new CustomerLocationService('fdkjshgjhaxv');

        expect(function(){location.findLocation()}).to.throw('Invalid CustomerID');
    });
});

describe('CatalogueService', function() {
    it('should return a JSON object' , function() {
        var catalog = new CatalogueService('LONDON');
        //check if returns an object
        expect(catalog.fetchCatalog()).to.be.an('object');
    });

    it('should return LONDON in Sports object if London is locationID' , function() {
        var catalog = new CatalogueService('LONDON');
        var channels = catalog.fetchCatalog();

        expect(channels).to.contain.any.keys( "News", "Sports", "LONDON");
    });

    it('should return LIVERPOOL in Sports object if Liverpool is locationID' , function() {
        var catalog = new CatalogueService('LONDON');
        var channels = catalog.fetchCatalog();

        expect(channels).to.contain.any.keys( "News", "Sports", "LIVERPOOL");
    });

    it('should return only News if locationID is NO LOCATION' , function() {
        var catalog = new CatalogueService('NO LOCATION');
        var channels = catalog.fetchCatalog();

        expect(channels).to.contain.any.keys( "News");
    });

});