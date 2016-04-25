var Http = require('http');
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

    var req = Http.request(options, function(res) {

        res.setEncoding(self.options.encoding || 'utf8');
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

    req.end();
};

module.exports = HttpObservable;
