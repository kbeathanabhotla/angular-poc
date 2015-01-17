/*globals app*/
app.directive('visualExplain', ['VisualExplainService', 'QueryService', function (visualExplainService, queryService) {
  return {
    templateUrl : 'js/components/visualExplain/template.html',
    restrict    : 'E',
    controller : [ '$scope', '$location' , function($scope, $location) {

        function getExplainStructure(queryId) {
            return visualExplainService.visualExplain(queryService.getQuery(queryId));
        }

        function paintStructure(structure) {
            console.log('painting structure using : '+JSON.stringify(structure));
        }

         getExplainStructure($location.search().queryId).then(function(result) {
            paintStructure(result.data);
        });

        /*function explain() {
            getVisualStructure($location.search().queryId).then(function(response) {
                paintStructure(response.data);
            });  
        }

        explain();*/
        /*function getVisualStructure(queryId) {
            if(queryService.getQuery(queryId).visualStructure) {
                return queryService.getQuery(queryId).visualStructure;
            } else {
                queryService.getQuery(queryId).visualStructure = '';
                visualExplainService.visualExplain(queryService.getQuery(queryId).queryText)
                .then(function(result) {
                    console.log('got result : '+JSON.stringify(result.data));
                    visualStructure = result.data;
                    queryService.getQuery(queryId).visualStructure = visualStructure;
                    return visualStructure;
                });
            }
        }*/

        /*var visualStructure = getVisualStructure($location.search().queryId);

        if(visualStructure) {
            console.log('visual structure is : '+visualStructure);    
        }*/
        
    	

    }] 
  };
}]);