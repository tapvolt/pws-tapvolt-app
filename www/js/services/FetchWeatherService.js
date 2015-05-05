var FetchWeatherService = function() {

    "use strict";

    this.initialize = function() {

        var defer = $.Deferred();
        var config = {
            url: "http://api.wunderground.com/api/x/history/q/pws:IENGLAND925.json",
            responseType: "json",
            type: "get"
        };

        $http( config ).
            success( function( data ) {
                alert( data );



                defer.resolve( data );
            } ).
            error( function( error ) {
                alert( error );
                defer.reject( error );
            } );

        return defer.promise();
    };

    this.findById = function( id ) {

        var deferred = $.Deferred();
        var employees = JSON.parse( window.localStorage.getItem( "employees" ) ),
            employee = null,
            l = employees.length;

        for ( var i = 0; i < l; i++ ) {
            if ( employees[i].id === id ) {
                employee = employees[i];
                break;
            }
        }

        deferred.resolve(employee);
        return deferred.promise();
    };

    this.findByName = function (searchKey) {
        var deferred = $.Deferred(),
            employees = JSON.parse(window.localStorage.getItem("employees")),
            results = employees.filter(function (element) {
                var fullName = element.firstName + " " + element.lastName;
                return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
        deferred.resolve(results);
        return deferred.promise();
    };

}