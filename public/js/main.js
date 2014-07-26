require.config({
    shim:{
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
        json2: 'lib/json2' //IE8 support
    },
    deps: [
        'jquery',
        'Router',
        'bootstrap',
        'json2'
    ],
    callback: function($, Router){
        $(document).ready(function(){
            var router = new Router();
            console.log(router);
        });
    }
});

