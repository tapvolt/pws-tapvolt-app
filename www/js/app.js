// We use an "Immediate Function" to initialize the application
// to avoid leaving anything behind in the global scope
( function() {

    "use strict";

    /* ---------------------------------- Local Variables ---------------------------------- */
    HomeView.prototype.template = Handlebars.compile( $( "#home-tpl" ).html() );
    EmployeeListView.prototype.template = Handlebars.compile( $( "#employee-list-tpl" ).html() );
    var service = new EmployeeService();
    service.initialize().done( function() {
        $( "body" ).html( new HomeView( service ).render().$el );
        console.log( "Service initialized" );
    } );

    /* --------------------------------- Event Registration -------------------------------- */
    // Override default HTML alert with native dialog
    document.addEventListener( "deviceready", function() {

        FastClick.attach( document.body );
        setStatusBar();
        if ( navigator.notification ) {
            setNotifications();
        }
    }, false );

    /* ---------------------------------- Local Functions ---------------------------------- */

    function setStatusBar() {
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByHexString( "#ffffff" );
        StatusBar.styleDefault();
    }

    function setNotifications() {
        window.alert = function( message ) {
            navigator.notification.alert(
                message, // message
                null, // callback
                "Personal Weather Station", // title
                "OK" // buttonName
            );
        };
    }

}() );