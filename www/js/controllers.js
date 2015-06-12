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

        var init = function() {
            if (memoryService.isSet()) {
                $log.log("has weather locally");
                self.observations = memoryService.getAllHistory();
                self.summary = memoryService.getSummary();
            } else {
                console.log("no weather locally");
                restService.get().then(
                    function (data) {
                        memoryService.setAll(data);
                        self.observations = memoryService.getAllHistory();
                        self.summary = memoryService.getSummary();
                    }
                );
            }
        };
        init();
}])

.controller( "DetailCtrl", [ "$scope", "$routeParams", "memoryService", function( $scope, $routeParams, memoryService ) {

        $scope.observation = memoryService.get( $routeParams.id );

}])

.controller('ReportListCtrl', ['$scope', '$routeParams', 'Report', function ($scope, $routeParams, Report) {
    $scope.employees = Report.query({employeeId: $routeParams.employeeId});
}]);
