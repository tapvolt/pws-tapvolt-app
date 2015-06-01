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
            controller: "ListCtrl",
            controllerAs: "Ctrl"
        }
    );
    $routeProvider.when(
        "/list/:id", {
            templateUrl: "partials/detail.html",
            controller: "DetailCtrl"
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
