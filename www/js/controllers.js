'use strict';

myApp
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
.controller( "ObservationsListCtrl", [ "$scope", "$http", "observationService", function( $scope, $http, observationService ) {
    $scope.observations = observationService.query();
} ] )
.controller( "ObservationDetailCtrl", [ "$scope", "$routeParams", "Observation", function( $scope, $routeParams, Observation ) {
    $scope.observation = Observation.get( {
            observationId: $routeParams.observationId
        } );
} ] )
.controller('ReportListCtrl', ['$scope', '$routeParams', 'Report', function ($scope, $routeParams, Report) {
    $scope.employees = Report.query({employeeId: $routeParams.employeeId});
}]);
