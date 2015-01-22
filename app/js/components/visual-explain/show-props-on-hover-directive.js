app.directive('show-props-on-hover', function() {
  return {
    restrict : "A",
    link : function(scope, element, attrs) {
            element.bind('mouseenter', function() {
              console.log('mouse entered');
            });
            element.bind('mouseleave', function() {
              console.log('mouse left');
            });
           }
   };
});