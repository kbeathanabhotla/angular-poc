/*globals app*/
app.directive('visualExplain', ['VisualExplainService', 'QueryService', function (visualExplainService, queryService) {
  return {
    templateUrl : 'js/components/visualExplain/template.html',
    restrict    : 'E',
    controller : [ '$scope', '$location' , function($scope, $location) {

        
        $scope.defaultSVGComponentHeight = 1.25;
        $scope.defaultSVGComponentWidth = 4;

        var self = $scope;
        var currentXPosition = 0, currentYPosition = 0, totalNumberOfSteps = 0;
        
        function getExplainStructure(queryId) {
            return visualExplainService.visualExplain(queryService.getQuery(queryId));
        }

        function paintStructure(data) {
            self.query = data.query;
            self.structure = data.structure;
            totalNumberOfSteps = self.structure.steps.length;
        }

        getExplainStructure($location.search().queryId).then(function(result) {
            paintStructure(result.data);
        });

        $scope.calculateXPosition = function() {
            console.log('calculating for x..');
            currentXPosition = currentXPosition + 2;
            return currentXPosition;
        };

        $scope.calculateYPosition = function() {
            console.log('calculating for y..');
            currentYPosition = currentYPosition + 2;
            return currentYPosition;
        };

        /*$scope. $watch('structure.steps', function(steps) {
           for(var i = 0; i < totalNumberOfSteps; i++) {
             var step = steps[i];
             //step.x = currentXPosition(step);
             //step.y = currentYPosition(step);

             console.log('step : '+JSON.stringify(step));
             //row.rowTotal = $scope.calcRowTotal(row, i);
           }
        }, true);*/
    }] 
  };
}]);