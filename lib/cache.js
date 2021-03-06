var redis = require("redis").createClient();

var cache = {
    get: function(key, miss, hit) {
        redis.get(key, function(err, data) {
            if (err || !data) {
                miss();
            } else {
                hit(JSON.parse(data));
            }
        });
    },
    set: function(key, data) {
        redis.
            multi().
            set(key, JSON.stringify(data)).
            pexpire(key, 300000).
            exec();
    }
};

module.exports = cache;
