'use strict';

angular.module( 'myApp.controllers', [] )
    .controller( 'MainCtrl', ['$scope', '$rootScope', '$window', '$location', function($scope, $rootScope, $window, $location) {
        $scope.slide = '';
        $rootScope.back = function() {
            $scope.slide = 'slide-right';
            $window.history.back();
        }
        $rootScope.go = function(path){
            $scope.slide = 'slide-left';
            $location.url(path);
        }
    }])
    .controller( "ObservationsListCtrl", [ "$scope", "Observation", function( $scope, Observation ) {
        $scope.observations = Observation.query();
    } ] )
    .controller( "ObservationDetailCtrl", [ "$scope", "$routeParams", "Observation", function( $scope, $routeParams, Observation ) {
        $scope.observation = Observation.get( {
                observationId: $routeParams.observationId
            } );
    } ] )
    .controller('ReportListCtrl', ['$scope', '$routeParams', 'Report', function ($scope, $routeParams, Report) {
        $scope.employees = Report.query({employeeId: $routeParams.employeeId});
    }]);