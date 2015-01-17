app.directive('querySubmit', [ '$http', '$location', 'QueryService', function($http, $location, queryService) {
	return {
		restrict : 'A',
		templateUrl : 'js/components/querySubmit/template.html',
		controller : [ '$scope', function(scope) {

            function navigateToVisualExplain(queryId) {
                $location.url('/VisualExplain?queryId=' + queryId);
            }

            scope.execute = function() {
                var queryId = queryService.storeQuery(scope.query);
                navigateToVisualExplain(queryId);
            };

            scope.clear = function() {
                scope.query = '';
            };

        }]
	};
}]);