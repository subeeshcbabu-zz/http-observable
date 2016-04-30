var Rx = require('rx');
var HttpObservable = require('./HttpObservable');

function Response(source) {
    this.source = source;
};

Response.prototype.status = function () {
    return this.source.first();
};

Response.prototype.headers = function () {
    return this.source.skip(1);
};

Response.prototype.body = function () {
    return this.source.skip(2);
};

function init(opts) {
    var source = new HttpObservable(opts);
    var published = source.publish();

    return {
        get: function () {
            opts.method = 'GET';
            return this.request();
        },
        post: function () {
            opts.method = 'POST';
            return this.request();
        },
        request: function () {
            published.connect();
            return new Response(published);
        }
    }
}
module.exports = init;
