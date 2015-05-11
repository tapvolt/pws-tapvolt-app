/**
 * Created by gjackson on 06/05/15.
 */
( function() {

    "use strict";

    angular.module( "myApp", [
        "ngTouch",
        "ngRoute",
        "ngAnimate",
        "myApp.controllers",
        "myApp.memoryServices"
    ] ).
    config( [ "$routeProvider", function( $routeProvider ) {
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
        } ] );
} () );
