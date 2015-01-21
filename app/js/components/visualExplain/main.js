/*globals app*/
app.directive('visualExplain', ['VisualExplainService', 'QueryService', '$sce', function (visualExplainService, queryService, $sce) {
  return {
    templateUrl : 'js/components/visualExplain/template.html',
    restrict    : 'E',
    controller : [ '$scope', '$location' , '$sce', function($scope, $location, $sce) {

        
        
        $scope.objectsToDraw = [];
        $scope.trustAsHtml = $sce.trustAsHtml;

        var self = $scope;
        var currentXPosition = 2, currentYPosition = 2, defaultSVGComponentHeight = 1.25, defaultSVGComponentWidth = 4;
        
        function calculateXPosition(step) {
            console.log('calculating for x..');
            currentXPosition = currentXPosition + 2;
            return currentXPosition;
        }

        function calculateYPosition(step) {
            console.log('calculating for y..');
            currentYPosition = currentYPosition + 2;
            return currentYPosition;
        }
        
        function getExplainStructure(queryId) {
            return visualExplainService.visualExplain(queryService.getQuery(queryId));
        }

        function paintStructure(data) {
            self.query = data.query;
            var steps = data.structure.steps;
            
			for (var i = 0; i < steps.length; i++) {
				var step = steps[i];
				console.log('------------------------------------------');				
				console.log('step : '+ JSON.stringify(step));
				var object = {}, html = '';
				
				if(step.isParallel) {
					object = {};
					
					
					
					
					//self.objectsToDraw.push(object);
				} else {
					object = {};
					html = '';
					
					html = html + '<text x='+calculateXPosition()+'em y='+calculateYPosition()+'em dx=-4em size=1em>'+step.name+'</text>';
					
					for(var j = 0 ; j < 30 ; j++) {
						html = html + '<rect x='+calculateXPosition()+'em y='+calculateYPosition()+'em width='+defaultSVGComponentWidth+'em height='+defaultSVGComponentHeight+'em class="svg-header"></rect>';					
					}
					
					object.html = html;
					
					self.objectsToDraw.push(object);
				}
				
				
				
				console.log('objects to Draw : '+JSON.stringify(self.objectsToDraw));
				
				//step.x = currentXPosition(step);
				//step.y = currentYPosition(step);
			
				
			}
            
        }

        getExplainStructure($location.search().queryId).then(function(result) {
            paintStructure(result.data);
        });

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