"use strict";

myApp.service( "observationService", [ "weatherUnderground", "$http", "$q", function( weatherUnderground, $http, $q ) {

    var listOfObservations = [];

    var _getWeatherUrl = function() {
        var url = weatherUnderground.WU_URL;
        url = url.replace( /!KEY_ID/g, weatherUnderground.WU_KEY_ID );
        url = url.replace( /!PWS_ID/g, weatherUnderground.WU_PWS_ID );
        return url;
    };

    var _getRemoteObservations = function() {
        var defer = $q.defer();

        var url = _getWeatherUrl();
        $http.jsonp( url ).
            success( function( data )
            {
                listOfObservations = _invert( _addId( data.history.observations ) );
                defer.resolve( listOfObservations );
            } ).
            error( function( error )
            {
                defer.reject( error );
                console.log( "error:", error );
            } );

        return defer.promise;
    };

    /**
     * invert the array of observations so most recent come first
     * @returns Array
     * @private
     */
    var _invert = function( observations ) {
        return observations.reverse();
    };

    /**
     * add an unique id attribute to each observation
     * @param observations
     * @returns Array
     * @private
     */
     var _addId = function( observations ) {
        angular.forEach( observations, function( observation, observationKey ) {
            observation.observationId = observationKey;
            // console.log( observation, observationKey );
        } );
        return observations;
    };

    /**
     *
     * @param id
     * @returns {*}
     * @private
     */
    var _findById = function( id ) {
        var observation = null;

        for ( var i = 0; i < listOfObservations.length; i++ ) {
            if ( listOfObservations[ i ].observationId === id ) {
                observation = listOfObservations[ i ];
                console.log( "matched observation" );
            }
        }
        return observation;
    };

    /**
     *
     * @param managerId
     * @returns {Array.<T>|*}
     * @private
     */
    var _findByManager = function( managerId ) {
        var results = employees.filter( function( element ) {
            return managerId === element.managerId;
        } );
        return results;
    };

    var _getLocalObservations = function() {
        var defer = $q.when( listOfObservations );
        //defer.when( listOfObservations );
        return defer.promise;
    }

    /**
     *
     * @returns {*}
     */
    var getLocalObservations = function()
    {
        return _getRemoteObservations();
    };

    var observationService = {

        hasObservations: function() {
            if ( listOfObservations.length === 0) {
                return false;
            } else {
                return true;
            }
        },

        /**
         *
         * @returns {*}
         */
        query: function() {
            return getLocalObservations();
        },

        query2: function() {
            return listOfObservations;
        },

        /**
         *
         * @param observation
         * @returns {*}
         */
        get: function( observation ) {
            return _findById( parseInt( observation.observationId ) );
        },

    };

    return observationService;
}

])
.service('Report', [ function()
{
    return {
        query: function( employee ) {
            return _findByManager( parseInt( employee.employeeId ) );
        }
    }
}]);

