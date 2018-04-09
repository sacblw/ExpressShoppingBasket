var Tools = require('../constructors/searchTools.js');

var repo = function () {

    //call the db connection constant here
    var db = {};
    var channels = {'Sports' : [
            {'LONDON': [{
                    0: 'Arsenal TV',
                    1: 'Chelsea TV'
                }]
            },
            {'LIVERPOOL': [{
                    0: 'Liverpool TV',
                }]
            },
            {'NO LOCATION': [{
                }]
            }
        ],
        'News' : [
            {'NO LOCATION': [{
                    0: 'Sky News',
                    1: 'Sky Sports News'
                }]
            }
        ]
    };

    var get =  function(locationID) {
        if (typeof locationID !== 'undefined') {
            var sports = Tools.lookup(channels['Sports'],locationID)
            //if news changes to be location dependent change 'ALL' to locationID
            var news = Tools.lookup(channels['News'],'NO LOCATION')

            return {'Sports' : sports, 'News' : news};
        } else {
            //if location not set
            var news = Tools.lookup(channels['News'],'NO LOCATION')

            return {'News' : news};
        }
    };

    return{
        get: get
    }
};

module.exports = repo();