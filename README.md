# http-observable
A simple `RxJs` Observable binding for Node.js `http` module. This observable is useful to handle `streaming` http response.

This module is a work in progress.
TODO list:
- `status()` - To find out the status of the http/https calls
- `headers()` - To get the observable result on response headers
- `body()` - Body parse and read response Body
- Methods `get` and `post` and generic request
- SSL validations
- Socket and connect timeout implementations

## Install

```sh
npm i http-observable
```

## Usage

```javaScript

    var HttpObservable = require('http-observable');

    // Http Request options
    // https://nodejs.org/api/http.html#http_http_request_options_callback
    //
    var options = {
        hostname: 'somestreamingapi.com',
        port: 80,
        path: '/stream'
    };

    var response = HttpObservable(options).request();
    
        response.body().subscribe(
              function onNext(chunk) {
                  //Write the data chunk to response stream (Or process the data)
                  res.write(chunk);
              },
              function onError() {
                  //Handle errors here.
                  res.write('error');
              },
              function onCompleted() {
                  //End of streaming data. Write the end response (Or equivalent tasks)
                  res.end('</body></html>');
              }
        );

```

### Options

https://nodejs.org/api/http.html#http_http_request_options_callback

### Example

https://github.com/subii/express-streaming-app
