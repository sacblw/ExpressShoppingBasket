"use strict";
var Repo = require('../model/catalogRepo.js');

class CatalogueService {
    constructor(locationID) {
        this.lid = locationID;
        this.catalog = Repo.get(this.lid);
    }

    fetchCatalog() {
        return this.catalog;
    };
}
module.exports = CatalogueService;