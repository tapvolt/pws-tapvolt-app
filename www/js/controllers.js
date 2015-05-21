"use strict";

myApp
.controller( 'MainCtrl', [ '$scope', '$rootScope', '$window', '$location', function( $scope, $rootScope, $window, $location ) {

        $scope.slide = '';
        $rootScope.back = function() {
            $scope.slide = 'slide-right';
            $window.history.back();
        };
        $rootScope.go = function(path){
            $scope.slide = 'slide-left';
            $location.url(path);
        };

}])

.controller( "ListCtrl", [ "$scope", "$http", "restService", "memoryService", function( $scope, $http, restService, memoryService ) {

        if ( memoryService.isSet() ) {
            console.log( "has weather locally" );
            $scope.observations = memoryService.getAll();
        } else {
            console.log( "no weather locally" );
            restService.get().then(
                function( data ) {
                    memoryService.setAll( data );
                    $scope.observations = data;
                }
            );
        }

}])

.controller( "DetailCtrl", [ "$scope", "$routeParams", "memoryService", function( $scope, $routeParams, memoryService ) {

        $scope.observation = memoryService.get( $routeParams.id );

}])

.controller('ReportListCtrl', ['$scope', '$routeParams', 'Report', function ($scope, $routeParams, Report) {
    $scope.employees = Report.query({employeeId: $routeParams.employeeId});
}]);
