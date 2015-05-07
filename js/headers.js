var app = app || {};

app.headers = (function() {

    function getHeaders () {

        var headers = {
            'X-Parse-Application-Id': 'aIRKsmK86dav1K0xUFjpafRSLSrYpEpXdPgzykic',
            'X-Parse-REST-API-Key': '2Rt4ggq294oH85Y4yKt4PS1AHm1UJWfd3SRcEPXt'
        };

        if (sessionStorage.sessionToken) {
            headers['X-Parse-Session-Token'] = sessionStorage.sessionToken;
        }

        return headers;
    }

    return {
        getHeaders: getHeaders
    };

}());