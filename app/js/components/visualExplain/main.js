/*globals app*/
app.directive('visualExplain', ['VisualExplainService', function (VisualExplainService) {
  return {
    templateUrl : 'js/components/visualExplain/template.html',
    restrict    : 'E',
    replace     : true,
    transclude  : true,
    scope       : {
      model : '='
    },
    controller  : ['$scope', function (self) {
	
	self.reset = function () {
		self.tModel = angular.copy(self.model);
	};
	self.hasChanged = function (aModel) {
		return !angular.equals(aModel, self.model);
	};

	self.$watch('model', function () {
		self.reset();
	});
		
	
      /*self.catgeories = DataService.getOptions('category');
      self.taskTypes  = DataService.getOptions('taskType');
      self.groups     = DataService.getOptions('group');
      self.save       = function () {
        DataService.save(self.tModel).then(function (aModel) {
          self.$emit('model-changed', aModel);
        }, function () {
          console.log('Error while saving model');
        });
      };
      self.reset = function () {
        self.tModel = angular.copy(self.model);
      };
      self.hasChanged = function (aModel) {
        return !angular.equals(aModel, self.model);
      };

      self.$watch('model', function () {
        self.reset();
      });*/
    }]
  };
}]);