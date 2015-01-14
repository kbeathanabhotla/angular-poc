app.controller('querySubmitCtrl', [ '$scope', 'QueryService' ,function(self, queryService) {

	self.hasChanged = function (query) {
		return !angular.equals(query, self.query);
	};

	self.execute = function() {
		var receivedData = queryService.getExplainXML(self.query);
		self.query = '';
		console.log('rcvd Data : '+JSON.stringify(receivedData));
	};

	self.reset = function() {
		self.query = '';
	};

}]);