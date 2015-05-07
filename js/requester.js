var app = app || {};

app.requester = (function () {
    var makeRequest = function makeRequest(headers, method, url, data, success, error) {
        return $.ajax({
            headers: headers,
            contentType: 'application/json',
            method: method,
            url: url,
            data: JSON.stringify(data),
            success: success,
            error: error
        })
    };

    function getRequest(headers, url, success, error) {
        return makeRequest(headers, 'GET', url, null, success, error);
    }

    function postRequest(headers, url, data, success, error) {
        return makeRequest(headers, 'POST', url, data, success, error);
    }

    function putRequest(headers, url, data, success, error) {
        return makeRequest(headers, 'PUT', url, data, success, error);
    }

    function deleteRequest(headers, url, success, error) {
        return makeRequest(headers, 'DELETE', url, {}, success, error);
    }

    return {
        get: getRequest,
        post: postRequest,
        put: putRequest,
        delete: deleteRequest
    }
}());