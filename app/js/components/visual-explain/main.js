/*globals app*/
app.directive('visualExplain', ['VisualExplainService', 'QueryService', function (visualExplainService, queryService) {
  return {
    templateUrl : 'js/components/visual-explain/template.html',
    restrict    : 'E',
    controller : [ '$scope', '$location' , function($scope, $location) {
      
      var self = $scope;
      var defaultObjectWidth = 80, defaultObjectHeight = 80, defaultXPosition = 100, defaultYPosition = 40;
      var currentXPosition = 100, currentYPosition = 40;

      $scope.showStepConnections = false;
      $scope.objects = [];
      $scope.lines = [];
      $scope.texts = [];
      $scope.props = {};

      function getExplainStructure(queryId) {
        return visualExplainService.visualExplain(queryService.getQuery(queryId));
      }

      function getObjectDrawingPoints(objectType) {
        return 'M'+currentXPosition+','+currentYPosition+' L'+(currentXPosition+defaultObjectWidth)+','+currentYPosition+' L'+(currentXPosition+defaultObjectWidth)+','+(currentYPosition+defaultObjectHeight)+' L'+currentXPosition+','+(currentYPosition+defaultObjectHeight)+' Z';
      }

      function evaluateObject(step) {
        var object = {};
        var text = {};
        var line = {};

        object['id'] = step.data.id;
        object['points'] = getObjectDrawingPoints(step.data.type);
        //object.points = ;
        //text.id = step.data.id+'';
        


        self.objects.push(object);
        self.lines.push(line);
        self.texts.push(text);
      }

      function paintStructure(data) {
          self.query = data.query;
          var steps = data.structure.steps;

          for (var i = 0; i < steps.length; i++) {
            var step = steps[i];
            //console.log('step : '+ JSON.stringify(step));

            if(step.isParallel) {

            } else {
              for (var j = 0; j < step.objects.length; j++) {
                var currentObject = step.objects[j];
                if(currentObject.isParallel) {
                  var parallelObjects = currentObject.dataSet;
                  for(var k = 0 ;k<currentObject.dataSet.length;k++) {
                    evaluateObject(parallelObjects[k]);
                  }
                } else {
                  evaluateObject(currentObject);
                }
              }
            }
          }
      }

      getExplainStructure($location.search().queryId).then(function(result) {
          paintStructure(result.data);
          console.log('objects : '+JSON.stringify(self.objects));
      });
    }] 
  };
}]);