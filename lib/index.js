var Http = require('http');
var Https = require('https');
var Inherits = require('util').inherits;
var Rx = require('rx');

var HttpObservable = function HttpObservable (options) {
    this.options = options;
    Rx.ObservableBase.call(this);
};

Inherits(HttpObservable, Rx.ObservableBase);

HttpObservable.prototype.subscribeCore = function(observer) {
    var self = this;
    var options = this.options || {};
    var Client = (options.protocol === 'https:') ? Https : Http;
    var req = Client.request(options, function(res) {
        //Send the status and message first.
        observer.onNext({statusCode: res.statusCode, statusMessage: res.statusMessage});

        res.on('data', function(chunk) {
            observer.onNext(chunk);
        });
        res.on('end', function() {
            observer.onCompleted();
        });
    });

    req.on('error', function(e) {
        observer.onError(e);
    });

    if (options.postData) {
        req.write(options.postData)
    }

    req.end();
};

function Response(source) {
    this.source = source;
}
Response.prototype.status = function () {
    return this.source.first();
};

// Response.prototype.headers = function () {
//     //return this.source.first();
// };

Response.prototype.body = function () {
    return this.source.skip(1);
}

function init(opts) {
    var source = new HttpObservable(opts);
    var published = source.publish();

    return {
        get: function () {
            opts.method = 'GET';
            published.connect();
            return new Response(published);
        },
        post: function () {
            opts.method = 'POST';
            published.connect();
            return new Response(published);
        },
        request: function () {
            published.connect();
            return new Response(published);
        }
    }
}
module.exports = init;
