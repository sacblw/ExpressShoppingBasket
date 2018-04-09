var tools = function () {

    function lookup(obj, k) {
        for (key in obj) {
            value = obj[key];
            if (k == key) return [k, value];

            //check if object or array
            if (type(value) == "Object") {
                var y = lookup(value, k);
                if (y && y[0] == k) return y;
            }
            if (type(value) == "Array") {
                // for..in doesn't work the way you want on arrays in some browsers
                for (var i = 0; i < value.length; ++i) {
                    var x = lookup(value[i], k);
                    if (x && x[0] == k) return x;
                }
            }
        }
        return null;
    }

    function type(json) {
        var stringConstructor = "test".constructor;
        var arrayConstructor = [].constructor;
        var objectConstructor = {}.constructor;

        if (json === null) {
            return "null";
        } else if (json === undefined) {
            return "undefined";
        } else if (json.constructor === stringConstructor) {
            return "String";
        } else if (json.constructor === arrayConstructor) {
            return "Array";
        } else if (json.constructor === objectConstructor) {
            return "Object";
        } else {
            return "null";
        }
    }

    return{
        lookup: lookup
    }
};

module.exports = tools();