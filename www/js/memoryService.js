"use strict";

myApp.factory( "memoryService", [ "restService", "weatherUnderground", "$log", "$q", function( restService, weatherUnderground, $log, $q ) {

    var memory = {
        history: [],
        summary: null
    };

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
                $log.log( "matched id" );
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


    var _super = function( data ) {
        memory.history = _invert( _addId( data.history.observations ) );
        memory.summary = data.history.dailysummary[0];
        $log.log( "memory set 2!" );
    };


    var observationService = {

        isSet: function() {
            return memory.history.length === 0  ? false : true ;
        },

        setAll: function( data ) {
            memory.history = _invert( _addId( data.history.observations ) );
            memory.summary = data.history.dailysummary[0];
            $log.log( "memory set" );
        },

        getAllHistory: function() {
            $log.log( "send history" );
            return memory.history;
        },

        getSummary: function() {
            return memory.summary;
        },

        get: function( id ) {
            return _findById( id );
        },

        getAllHistory2: function() {
            var self = this;
            var defer = $q.defer();
            if (this.isSet()) {
                $log.log("has weather locally");
                defer.resolve(self.getAllHistory());
            }

            else {
                console.log("no weather locally");
                restService.get().then(
                    function (data) {
                        _super(data);
                        var test = self.getAllHistory();
                        defer.resolve(test);
                    }
                );
            }

            return defer.promise;
        }

    };

    return observationService;

}])
