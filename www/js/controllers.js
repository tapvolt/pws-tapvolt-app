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

.controller( "ListCtrl", [ '$log', "restService", "memoryService", function( $log, restService, memoryService ) {

        var self = this;

        var promise = memoryService.getAllHistory2();
        promise.then(
            function(obs) {
                self.observations  = obs;
                self.summary = memoryService.getSummary();
            }
        );

}])

.controller( "DetailCtrl", [ "$scope", "$routeParams", "memoryService", function( $scope, $routeParams, memoryService ) {

        $scope.observation = memoryService.get( $routeParams.id );

}])

.controller('ReportListCtrl', ['$scope', '$routeParams', 'Report', function ($scope, $routeParams, Report) {

        $scope.employees = Report.query({employeeId: $routeParams.employeeId});

}]);
