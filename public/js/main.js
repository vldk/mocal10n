require.config({
    shim:{
        'socketIO': {
            exports: 'io'
        },
        'backbone': {
            deps: ['underscore', 'jquery', 'json2']
        },
        'bootstrap': {
            deps:['jquery']
        }
    },
    paths: {
        bootstrap: '/bootstrap/js/bootstrap',
        jquery: 'lib/jquery',
        backbone: 'lib/backbone',
        underscore: 'lib/underscore',
        socketIO: '/socket.io/socket.io',
        json2: 'lib/json2' //IE8 support
    },
    deps: [
        'jquery',
        'Application',
        'bootstrap',
        'json2'
    ],
    callback: function($, Application){
        "use strict";

        $(document).ready(function(){
            var app = new Application();
        });
    }
});

