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
        //Send http response headers
        observer.onNext(res.headers);

        res.on('data', function(chunk) {
            //Send data
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
module.exports = HttpObservable;
