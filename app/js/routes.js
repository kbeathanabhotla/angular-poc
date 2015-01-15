/*globals app, $routeProviderReference*/
app.run(function () {
  var $rp = $routeProviderReference;

  $rp.when('/', {
    templateUrl: 'js/views/default-view-template.html'
  });

  $rp.when('/About', {
    templateUrl: 'js/views/default-view-template.html'
  });

  $rp.when('/Contact', {
    templateUrl: 'js/views/default-view-template.html'
  });

  $rp.otherwise({
    redirectTo: '/'
  });
});

