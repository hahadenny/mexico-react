if (!Array.prototype.indexOf) {
    /* eslint-disable-next-line no-extend-native */
    Array.prototype.indexOf = function (elt /*, from*/) {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++) {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}
const Storage = {};

Storage.prefix = "chronos-";

Storage._getPrefixedKey = function (key, options) {
    options = options || {};

    if (options.noPrefix) {
        return key;
    } else {
        return this.prefix + key;
    }

};

Storage.set = function (key, value, options) {
    var query_key = this._getPrefixedKey(key, options);

    try {
        localStorage.setItem(query_key, JSON.stringify({"data": value}));
    } catch (e) {
        if (console) console.warn("Storage didn't successfully save the '{" + key + ": " + value + "}' pair, because the localStorage is full.");
    }
};

Storage.get = function (key, missing, options) {
    var query_key = this._getPrefixedKey(key, options),
        value;

    try {
        value = JSON.parse(localStorage.getItem(query_key));
    } catch (e) {
        if (localStorage[query_key]) {
            value = {data: localStorage.getItem(query_key)};
        } else {
            value = null;
        }
    }

    if (!value) {
        return missing;
    } else if (typeof value === 'object' && typeof value.data !== 'undefined') {
        return value.data;
    }
};

Storage.sadd = function (key, value, options) {
    var query_key = this._getPrefixedKey(key, options),
        json;

    var values = Storage.smembers(key);

    if (values.indexOf(value) > -1) {
        return null;
    }

    try {
        values.push(value);
        json = JSON.stringify({"data": values});
        localStorage.setItem(query_key, json);
    } catch (e) {
        console.log(e);
        if (console) console.warn("Storage didn't successfully add the " + value + " to " + key + " set, because the localStorage is full.");
    }
};

Storage.smembers = function (key, options) {
    var query_key = this._getPrefixedKey(key, options),
        value;

    try {
        value = JSON.parse(localStorage.getItem(query_key));
    } catch (e) {
        value = null;
    }

    return (value && value.data) ? value.data : [];
};

Storage.sismember = function (key, value, options) {
    return Storage.smembers(key).indexOf(value) > -1;
};

Storage.keys = function () {
    var keys = [];
    var allKeys = Object.keys(localStorage);

    if (Storage.prefix.length === 0) {
        return allKeys;
    }

    allKeys.forEach(function (key) {
        if (key.indexOf(Storage.prefix) !== -1) {
            keys.push(key.replace(Storage.prefix, ''));
        }
    });

    return keys;
};

Storage.getAll = function (includeKeys) {
    var keys = Storage.keys();

    if (includeKeys) {
        return keys.reduce(function (accum, key) {
            var tempObj = {};
            tempObj[key] = Storage.get(key);
            accum.push(tempObj);
            return accum;
        }, []);
    }

    return keys.map(function (key) {
        return Storage.get(key);
    });
};

Storage.srem = function (key, value, options) {
    var query_key = this._getPrefixedKey(key, options),
        json,
        index;

    var values = Storage.smembers(key, value);

    index = values.indexOf(value);

    if (index > -1)
        values.splice(index, 1);

    json = JSON.stringify({"data": values});

    try {
        localStorage.setItem(query_key, json);
    } catch (e) {
        if (console) console.warn("Storage couldn't remove the " + value + " from the set " + key);
    }
};

Storage.rm = function (key, options = {}) {
    var queryKey = this._getPrefixedKey(key, options);

    localStorage.removeItem(queryKey);
};

Storage.flush = function () {
    if (Storage.prefix.length) {
        Storage.keys().forEach(function (key) {
            localStorage.removeItem(Storage._getPrefixedKey(key));
        });
    } else {
        localStorage.clear();
    }
};
export default Storage;
