"use strict";

myApp.service( "memoryService", [ "weatherUnderground", "$http", "$q", function( weatherUnderground, $http, $q ) {

    var memory = [];

    /**
     * invert the array of observations so most recent come first
     * @returns Array
     * @private
     */
    var _invert = function( items ) {
        return items.reverse();
    };

    /**
     * add an unique id attribute to each observation item
     * @param items
     * @returns Array
     * @private
     */
     var _addId = function( items ) {
        angular.forEach( items, function( item, itemKey ) {
            item.id = itemKey;
        } );
        return items;
    };

    /**
     *
     * @param id
     * @returns {*}
     * @private
     */
    var _findById = function( id ) {
        var item = null;
        for ( var i = 0; i < memory.length; i++ ) {
            if ( memory[ i ].id == id ) {
                item = memory[ i ];
                console.log( "matched id" );
                break;
            }
        }
        return item;
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

    var observationService = {

        isSet: function() {
            return ( memory.length === 0 ) ? false : true ;
        },

        setAll: function( data ) {
            memory = _invert( _addId( data ) );
            console.log( "memory set" );
        },

        getAll: function() {
            return memory;
        },

        get: function( id ) {
            return _findById( id );
        }

    };

    return observationService;

}])
