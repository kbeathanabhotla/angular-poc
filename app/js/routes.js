/*globals app, $routeProviderReference*/
app.run(function () {
    var $rp = $routeProviderReference;

    $rp.when('/', {
        templateUrl: 'js/views/default-view-template.html'
    });

    $rp.when('/History', {
        templateUrl: 'js/views/history-view-template.html',
        controller: 'HistoryController'
    });

    $rp.when('/VisualExplain', {
        templateUrl: 'js/views/visual-explain-view-template.html'
    });

    $rp.otherwise({
        redirectTo: '/'
    });
});

