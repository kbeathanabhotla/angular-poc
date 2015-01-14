/*globals app, $routeProviderReference*/
app.run(function () {
  var $rp = $routeProviderReference;

  $rp.when('/', {
    templateUrl: 'js/views/query-input-view-template.html',
    controller: 'appCtrl'
  });

  /*$rp.when('/login', {
    templateUrl: 'js/views/login-view-template.html',
    controller: 'loginCtrl'
  });

  $rp.when('/week-view', {
    templateUrl: 'js/views/week-view-template.html',
    controller: 'appCtrl'
  });

  $rp.when('/month-view', {
    templateUrl: 'js/views/month-view-template.html',
    controller: 'appCtrl'
  });*/

  $rp.otherwise({
    redirectTo: '/'
  });
});

