"use strict";

var myApp = angular.module( "myApp", [ "ngTouch", "ngRoute", "ngAnimate" ] )

.config( [ "$routeProvider", function( $routeProvider ) {
    $routeProvider.when(
        "/observations", {
            templateUrl: "partials/observation-list.html",
            controller: "ObservationsListCtrl"
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
    $routeProvider.otherwise( { redirectTo: "observations" } );
}])

