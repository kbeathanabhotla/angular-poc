app.directive('show-props-on-hover',
   function() {
      return {
         link : function(scope, element, attrs) {
            element.parent().bind('mouseenter', function() {
                //element.id;
            });
            element.parent().bind('mouseleave', function() {
                 //element.hide();
            });
       }
   };
});