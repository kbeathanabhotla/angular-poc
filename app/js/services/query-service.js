app.service('QueryService', function () {

    var queries = {};
    var queryId = 0;

    this.storeQuery = function (query) {
        queryId++;
        queries[queryId] = query;
        return queryId;
    };

    this.getQuery = function (queryId) {
        return queries[queryId];
    };
});