app.directive('querySubmit', [ '$http', 'QueryService', function($http, queryService) {
	return {
		restrict : 'A',
		templateUrl : 'js/components/querySubmit/template.html',
		link: function (scope, elm, attrs) {

            scope.execute = function() {
            	queryService.visualExplain(scope.query);
            };

            scope.clear = function() {
                scope.query = '';
            };
        }
	};
}]);