app.service('VisualExplainService', [ '$http', function($http) {

	var headers = {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				  };

	this.visualExplain = function(query) {

		return $http({
					method: "POST",
					headers: headers,
		      		url: '/oauth-sample/rest/employees',
					data: {"name":query}
	    		}).success(function(result) {
					//console.log(result);
	    		}).error(function(data, status, headers, config) {
					console.log(data);
			        console.log(status);
			        console.log(headers);
			        console.log(config);
	    		});
	};
}]);	