/*globals app, $routeProviderReference*/
app.run(function () {
  var $rp = $routeProviderReference;

  $rp.when('/', {
    templateUrl: 'js/views/query-input-view-template.html',
    controller: 'appCtrl'
  });

  $rp.when('/About', {
    templateUrl: 'js/views/query-input-view-template.html',
    controller: 'appCtrl'
  });

  $rp.when('/Contact', {
    templateUrl: 'js/views/query-input-view-template.html',
    controller: 'appCtrl'
  });

  $rp.otherwise({
    redirectTo: '/'
  });
});

