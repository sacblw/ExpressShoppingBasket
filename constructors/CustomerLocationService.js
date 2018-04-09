"use strict";

class CustomerLocationService {
    constructor(customerID) {
        this.cid = customerID;
    }

    findLocation() {
        //check if valid number
        if (!isNaN(parseFloat(this.cid)) && isFinite(this.cid)) {
            if (this.cid===1) {return 'LONDON';}
            if (this.cid===2) {return 'LIVERPOOL';}
            if (this.cid>2) {return 'NO LOCATION';}
        } else {
            throw new Error('Invalid CustomerID');
        }
    };
}
module.exports = CustomerLocationService;