app.service('QueryService', [ '$http' ,function($http) {
	
	var queries = {};
	var queryId = 0;

	this.storeQuery = function(query) {
		queryId++;
		var q = queries.queryId;
		queries.queryId = q || {};
		queries.queryId.queryText = query;
		return queryId;
	};

	this.getQuery = function(queryId) {
		return queries.queryId;
	};
}]);