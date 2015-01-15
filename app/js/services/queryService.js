app.service('QueryService', [ '$http' ,function($http) {
	
	this.getExplainXML = function(query) {
	   $http.get('http://localhost:8080/test').then(function(resp) {
        console.log('got data from Backend as : '+JSON.stringify(resp.data));
  	 }, function(err) {
      	console.error('ERR', err);
    	 // err.status will contain the status code
  	 });
	};
}]);