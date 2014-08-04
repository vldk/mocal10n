require.config({
    shim:{
        'socket.io': {
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
        bootstrap: '../bootstrap/js/bootstrap',
        jquery: 'lib/jquery',
        backbone: 'lib/backbone',
        underscore: 'lib/underscore',
        //'socket.io': 'lib/socket.io.min', //for Backbone Debug-plugin
        'socket.io': '/socket.io/socket.io',
        json2: 'lib/json2' //IE8 support ?)
    },
    deps: [
        'jquery',
        'Application',
        'bootstrap',
        'json2'
    ],
    callback: function($, Application){
        "use strict";

        var app = new Application();

        $(document).ready(function(){
            app.init();
        });
    }
});

