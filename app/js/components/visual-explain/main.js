/*globals app*/
app.directive('visualExplain', ['VisualExplainService', 'QueryService', function (visualExplainService, queryService) {
  return {
    templateUrl : 'js/components/visual-explain/template.html',
    restrict    : 'E',
    controller : [ '$scope', '$location' , function($scope, $location) {
      
      var self = $scope;
      var defaultObjectWidth = 80, defaultObjectHeight = 80,
          defaultXPosition = 100, defaultYPosition = 40,
          defaultObjectSpacing = 125, defaultStepSpacing = 50,
          defaultColumnSpacing = 500;
      var currentXPosition = 100, currentYPosition = 40;

      var objectLocations = {};

      $scope.showStepConnections = true;
      $scope.objects = [];
      $scope.stepConnections = [];
      $scope.objectConnections = [];
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
        //var line = {};

        text.data = step.data.name;
        text.x = currentXPosition + (defaultObjectWidth/2);
        text.y = currentYPosition - 10;

        object.id = step.data.id;
        object.points = getObjectDrawingPoints(step.data.type);
        //object.points = ;
        //text.id = step.data.id+'';
        


        self.objects.push(object);
        //self.lines.push(line);
        self.texts.push(text);
      }

      function evaluateStep(step) {
        var text = {};
        text.data = step.name;
        text.x = currentXPosition - 75;
        text.y = currentYPosition;
        text.stroke = 5;
        text.color = "green";
        self.texts.push(text);

        for (var j = 0; j < step.objects.length; j++) {
          //console.log('objectSteps : '+JSON.stringify(objectLocations));
          var currentObject = step.objects[j];
          if(currentObject.isParallel) {
            var parallelObjects = currentObject.dataSet;
            for(var k = 0 ;k<currentObject.dataSet.length;k++) {
              var currentParallelObject = parallelObjects[k];
              //this.objectLocations[currentParallelObject.data.id] = {};
              //var objId = currentParallelObject.data.id;
              //this.objectLocations[objId] = this.objectLocations[objId] || {};
              objectLocations[currentParallelObject.data.id] = {"x":currentXPosition, "y" : currentYPosition};
              evaluateObject(currentParallelObject);
              currentXPosition = currentXPosition + (1.5*defaultObjectSpacing);
            }
            currentXPosition = defaultXPosition;
            currentYPosition = currentYPosition + defaultObjectSpacing;
          } else {
            //this.objectLocations[currentObject.data.id] = {};
            //var objId = currentObject.data.id;
            //this.objectLocations[objId] = this.objectLocations[objId] || {};
            objectLocations[currentObject.data.id] = {"x":currentXPosition, "y" : currentYPosition};
            //objectLocations.x = currentXPosition;

            evaluateObject(currentObject);
            currentYPosition = currentYPosition + defaultObjectSpacing;
          }
        }

        for(var l = 0 ; l < step.connections.length; l++) {
          var currentConnection = step.connections[l];
          var from = objectLocations[currentConnection.fromId];
          var to = objectLocations[currentConnection.toId];

          var objectLine = {};

          objectLine.x1 = from.x + (defaultObjectWidth/2);
          objectLine.y1 = from.y + defaultObjectHeight;

          objectLine.x2 = to.x + (defaultObjectWidth/2);
          objectLine.y2 = to.y;

          self.objectConnections.push(objectLine);
        }
      }

      function evaluateStepConnections(connections) {
        for(var i = 0;i<connections.length;i++) {
          var from = objectLocations[connections[i].fromId];
          var to = objectLocations[connections[i].toId];

          var stepLine = {};

          stepLine.x1 = from.x + (defaultObjectWidth/2);
          stepLine.y1 = from.y + defaultObjectHeight;

          stepLine.x2 = to.x + (defaultObjectWidth/2);
          stepLine.y2 = to.y;

          self.stepConnections.push(stepLine);
        }
      }

      function paintStructure(data) {
          self.query = data.query;
          var steps = data.structure.steps;

          for (var i = 0; i < steps.length; i++) {
            var step = steps[i];
            //console.log('step : '+ JSON.stringify(step));

            if(step.isParallel) {
              for(var j=0;j<step.steps.length;j++) {
                var yPositionBeforePainting = currentYPosition;
                evaluateStep(step.steps[j]);
                currentXPosition = currentXPosition + defaultColumnSpacing;
                currentYPosition = yPositionBeforePainting;
              }
            } else {
              evaluateStep(step);
            }

            currentYPosition = currentYPosition + defaultStepSpacing;
          }
          evaluateStepConnections(data.structure.connections);
          console.log('step connections : '+JSON.stringify(self.stepConnections));
      }

      getExplainStructure($location.search().queryId).then(function(result) {
          paintStructure(result.data);
          //console.log('objects : '+JSON.stringify(self.objects));
          //console.log('texts : '+JSON.stringify(self.texts));
      });
    }] 
  };
}]);