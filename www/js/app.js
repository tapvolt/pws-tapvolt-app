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
                "/employees", {
                    templateUrl: "partials/employee-list.html",
                    controller: "EmployeeListCtrl"
                }
            );
            $routeProvider.when(
                "/employees/:employeeId", {
                    templateUrl: "partials/employee-detail.html",
                    controller: "EmployeeDirectCtrl"
                }
            );
            $routeProvider.when(
                "/employees/:employeeId/reports", {
                    templateUrl: "partials/report-list.html",
                    controller: "ReportListCtrl"
                }
            );
            $routeProvider.otherwise( { redirectTo: "employees" } );
        } ] );
} () );
