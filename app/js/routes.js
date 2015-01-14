/*globals app, $routeProviderReference*/
app.run(function () {
  var $rp = $routeProviderReference;

  $rp.when('/', {
    templateUrl: 'js/views/query-input-view-template.html',
    controller: 'querySubmitCtrl'
  });

  $rp.when('/About', {
    templateUrl: 'js/views/query-input-view-template.html',
    controller: 'querySubmitCtrl'
  });

  $rp.when('/Contact', {
    templateUrl: 'js/views/query-input-view-template.html',
    controller: 'querySubmitCtrl'
  });

  $rp.otherwise({
    redirectTo: '/'
  });
});

