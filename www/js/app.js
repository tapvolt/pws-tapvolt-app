"use strict";

var myApp = angular.module( "myApp", [ "ngTouch", "ngRoute", "ngAnimate" ] )

.constant( "weatherUnderground", {
        WU_URL: "http://api.wunderground.com/api/!KEY_ID/history/q/pws:!PWS_ID.json?callback=JSON_CALLBACK",
        WU_KEY_ID: "4f754cf667d0c88b",
        WU_PWS_ID: "IENGLAND925"
})

.config( [ "$routeProvider", function( $routeProvider ) {
    $routeProvider.when(
        "/list", {
            templateUrl: "partials/list.html",
            controller: "ListCtrl"
        }
    );
    $routeProvider.when(
        "/observations/:observationId", {
            templateUrl: "partials/observation-detail.html",
            controller: "ObservationDetailCtrl"
        }
    );
    $routeProvider.when(
        "/employees/:employeeId/reports", {
            templateUrl: "partials/report-list.html",
            controller: "ReportListCtrl"
        }
    );
    $routeProvider.otherwise( { redirectTo: "list" } );
}])


myApp.run( function( $rootScope ) {

    var obs = [];

    $rootScope.hasObservations  = function() {
        console.log( 'hasObservations ', (obs.length > 0 ) );
        return obs.length > 0;
    }

});
