/*globals app*/
app.directive('visualExplain', ['VisualExplainService', 'QueryService', function (visualExplainService, queryService) {
  return {
    templateUrl : 'js/components/visualExplain/template.html',
    restrict    : 'E',
    controller : [ '$scope', '$location' , function($scope, $location) {

    	//$location.search()
    	var queryId = $location.search().queryId;
    	console.log('query Id : '+queryId);

    	var query = queryService.getQuery(queryId);
    	

    	/*var promise = visualExplainService.visualExplain(queryService.getQuery(queryId));

    	promise.then(function(result) {
    		console.log()
    	});*/


    }] 
  };
}]);