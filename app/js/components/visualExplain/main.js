/*globals app*/
app.directive('visualExplain', ['VisualExplainService', 'QueryService', '$sce', function (visualExplainService, queryService, $sce) {
  return {
    templateUrl : 'js/components/visualExplain/template.html',
    restrict    : 'E',
    controller : [ '$scope', '$location' , '$sce', function($scope, $location, $sce) {

        
        
        $scope.objectsToDraw = [];
        $scope.linesToDraw = [];
        $scope.trustAsHtml = $sce.trustAsHtml;

        var objectLines = [];
        var self = $scope;
        var currentXPosition = 6, currentYPosition = 6, defaultSVGComponentHeight = 4, defaultSVGComponentWidth = 4, defaultObjectSpacing = 3;
        
        function calculateXPosition(step) {
        	return currentXPosition;
        }

        function calculateYPosition(step) {
        	return currentYPosition;
        }
        
        function evaluateLinesToDraw(step) {
        	
        	for(var i = 0 ; i < step.connections.length; i++) {
        		
        		var line = {};
        		
        		//console.log('dash -- '+objectLines['objectId'])
        		
        		var from = objectLines[(step.connections[i].fromId)];
        		var to = objectLines[(step.connections[i].toId)];
        		
        		line.x1 = from.bottomCentre.x;
        		line.y1 = from.bottomCentre.y;
        		
        		line.x2 = to.topCentre.x;
        		line.y2 = to.topCentre.y;
        		
        		self.linesToDraw.push(line);
        	}
        	
        }
        
        function getObjectHtml(object) {
        	console.log('object name : '+object.data.name);
        	var html = '<rect x='+calculateXPosition()+'em y='+calculateYPosition()+'em width='+defaultSVGComponentWidth+'em height='+defaultSVGComponentHeight+'em class="svg-header"></rect>';
        	html = html + '<text x='+calculateXPosition()+'em y='+calculateYPosition()+'em dx='+defaultSVGComponentWidth+'em>'+object.data.name+'</text>';
        	return html;
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
				var object = {}, html = '', line={};
				
				if(step.isParallel) {
					object = {};
					
					
					
					
					//self.objectsToDraw.push(object);
				} else {
					object = {};
					html = '';
					
					html = html + '<text x='+calculateXPosition(null)+'em y='+calculateYPosition(null)+'em dx=-4em size=1em>'+step.name+'</text>';
					

					for (var j = 0; j < step.objects.length; j++) {
						var currentObj = step.objects[j];
						if(!currentObj.isParallel) {
							line = {};
							html = html + getObjectHtml(currentObj);
							
							line.objectId = currentObj.data.id; 
							line.objectId.location = {"topCentre":{},"bottomCentre":{}};
							
							line.objectId.location.topCentre.x = currentXPosition+(defaultSVGComponentWidth/2);
							line.objectId.location.topCentre.y = currentYPosition;
							
							line.objectId.location.bottomCentre.x = currentXPosition+(defaultSVGComponentWidth/2);
							line.objectId.location.bottomCentre.y = currentYPosition + defaultSVGComponentHeight + defaultObjectSpacing;
							
							objectLines.push(line);
						} else {
							var parallelObjects = currentObj.dataSet;
							for(k = 0 ;k<currentObj.dataSet.length;k++) {
								
								line = {};
								
								currentXPosition = currentXPosition + (k*20);
								html = html + getObjectHtml(currentObj.dataSet[k]);
								
								line.objectId = currentObj.dataSet[k].data.id;
								
								line.objectId.location = {"topCentre":{},"bottomCentre":{}};
								
								line.objectId.location.topCentre.x = currentXPosition+(defaultSVGComponentWidth/2);
								line.objectId.location.topCentre.y = currentYPosition;
								
								line.objectId.location.bottomCentre.x = currentXPosition+(defaultSVGComponentWidth/2);
								line.objectId.location.bottomCentre.y = currentYPosition + defaultSVGComponentHeight + defaultObjectSpacing;
								
								objectLines.push(line);
								currentXPosition = currentXPosition - (k*20);
							}
						}
						
						currentYPosition = currentYPosition + defaultSVGComponentHeight + defaultObjectSpacing;
					}

					object.html = html;
					self.objectsToDraw.push(object);
				}
				
				
				
				console.log('objects to Draw : '+JSON.stringify(self.objectsToDraw));
				console.log('lines to Draw : '+JSON.stringify(objectLines));
				evaluateLinesToDraw(step);
				//step.x = currentXPosition(step);
				//step.y = currentYPosition(step);
			
				currentYPosition = currentYPosition + 5;
				
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