var HttpObservable = require('../lib');
var Assert = require('chai').assert;

describe('Test Http', function() {

    var options = {
        hostname: 'api.sba.gov',
        port: 80,
        path: '/geodata/city_county_links_for_state_of/ca.json'
    };

    var response;

    before(function(done){
        response = HttpObservable(options).request();
        done();
    })

    it('Response status', function(done){
        response.status()
            .subscribe(
                function onNext(status) {
                    //console.log(status.toString());
                    Assert(status, 'OK status');
                    Assert.strictEqual(status.statusCode, 200, 'OK statusCode');
                },
                function onError(err) {
                    Assert.fail('Error while reading response status ' + err);
                    done();
                },
                function onCompleted() {
                    Assert.isOk(true, 'Status completed!');
                    done();
                }
            );
    })

    it('Response headers', function(done){
        response.headers()
            .subscribe(
                function onNext(headers) {
                    //console.log(headers.toString());
                    Assert.isOk(headers, 'OK headers');
                },
                function onError(err) {
                    Assert.fail('Error while reading response hedaers ' + err);
                    done();
                },
                function onCompleted() {
                    Assert.isOk(true, 'Response headers completed!');
                    done();
                }
            );
    });

    it('Response body', function(done){
        response.body()
            .subscribe(
                function onNext(chunk) {
                    //console.log(chunk.toString());
                    Assert.isOk(chunk, 'OK data chunk');
                },
                function onError(err) {
                    Assert.fail('Error while reading response body ' + err);
                    done();
                },
                function onCompleted() {
                    Assert.isOk(true, 'Response body completed!');
                    done();
                }
            );
    });

});
