"use strict";

myApp.factory( "restService", [ "weatherUnderground", "$log", "$http", "$q", function( weatherUnderground, $log, $http, $q ) {

    var self = this;
    self.data = [];

    var _getWeatherUrl = function() {
        var url = weatherUnderground.WU_URL;
        url = url.replace( /!KEY_ID/g, weatherUnderground.WU_KEY_ID );
        url = url.replace( /!PWS_ID/g, weatherUnderground.WU_PWS_ID );
        return url;
    };

    var _get = function() {
        var defer = $q.defer();

        var url = _getWeatherUrl();
        $http.jsonp( url ).
            success( function( data ) {
                defer.resolve( data );
                $log.log( "success: _get()" );
            }).
            error( function( error ) {
                defer.reject( error );
                $log.log( "error:", error );
            });

        return defer.promise;
    };

    var restService = {

        get: function() {
            return _get();
        }

    };

    return restService;

}]);
