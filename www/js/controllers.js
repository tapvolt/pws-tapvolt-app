"use strict";

myApp
.controller( 'MainCtrl', [ '$scope', '$rootScope', '$window', '$location', function( $scope, $rootScope, $window, $location ) {

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

.controller( "ListCtrl", [ "$scope", "$http", "restService", "memoryService", function( $scope, $http, restService, memoryService ) {

        if ( memoryService.isSet() ) {
            console.log( "has weather locally" );
            $scope.observations = memoryService.get();
        } else {
            console.log( "no weather locally" );
            restService.get().then(
                function( data ) {
                    memoryService.set( data );
                    $scope.observations = data;
                }
            );
        }

}])



.controller( "ObservationDetailCtrl", [ "$scope", "$routeParams", "Observation", function( $scope, $routeParams, Observation ) {
    $scope.observation = Observation.get( {
            observationId: $routeParams.observationId
        } );
} ] )
.controller('ReportListCtrl', ['$scope', '$routeParams', 'Report', function ($scope, $routeParams, Report) {
    $scope.employees = Report.query({employeeId: $routeParams.employeeId});
}]);
