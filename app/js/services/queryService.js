app.service('QueryService', [ '$http' ,function($http) {
	
	var headers = {
					'Access-Control-Allow-Origin' : '*',
					'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT',
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				  };

	this.visualExplain = function(query) {

		console.log('query to be executed : '+query);


		return $http({
					method: "POST",
					headers: headers,
		      		url: 'http://localhost:8080/oauth-sample/rest/employees',
					data: {"email":"my@email.com","name":"Sai Krishna Kishore"}
	    		}).success(function(result) {
					console.log('got response data as : '+JSON.stringify(result.data));
					console.log(result);
	    		}).error(function(data, status, headers, config) {
					console.log(data);
			        console.log(status);
			        console.log(headers);
			        console.log(config);
	    		});
	};
}]);