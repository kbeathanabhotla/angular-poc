/*globals app*/
app.directive('visualExplain', ['VisualExplainService', 'QueryService', function (visualExplainService, queryService) {
  return {
    templateUrl : 'js/components/visualExplain/template.html',
    restrict    : 'E',
    controller : [ '$scope', '$location' , function($scope, $location) {

    	//$location.search()
    	var queryId = $location.search().queryId;
    	console.log('query Id : '+queryId);

    	var visualStructure;

    	if(queryService.getQuery(queryId).visualStructure) {
            visualStructure = queryService.getQuery(queryId).visualStructure;
        } else {
            queryService.getQuery(queryId).visualStructure = '';
            visualExplainService.visualExplain(queryService.getQuery(queryId).queryText)
            .then(function(result) {
                console.log('got result : '+JSON.stringify(result.data));
                visualStructure = result.data;
                queryService.getQuery(queryId).visualStructure = visualStructure;
            });
        }

        console.log('visual structure is : '+visualStructure);

    }] 
  };
}]);