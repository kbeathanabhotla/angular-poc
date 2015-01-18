(function(){
	var tabNum=1;
	angular.module("app").
		controller("tabController",function($scope){	
			$scope.tabClick = function(tabArg){
				console.log(tabArg+" ---");
				tabNum = tabArg;
			};
			$scope.isTab = function(tabArg){
				return tabNum === tabArg;
			}
		});
})();