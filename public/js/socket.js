
define(function (require) {
    "use strict";

    var _ = require('underscore');

    /** @type {Backbone} */
    var Backbone = require('backbone');

    var socketIO = require('socket.io');

    var socket;

    if(!socket){
        socket = socketIO.connect('/api', { reconnectionAttempts : 10 });
        socket.once('reconnect_failed', function(){
            alert('Reconnection failed. Page will be reloaded');
            window.location.reload(true);
        });
    }


    /**
     * https://github.com/logicalparadox/backbone.iobind
     *
     * # Backbone.sync
     *
     * Replaces default Backbone.sync function with socket.io transport
     *
     * ### Assumptions
     *
     * Currently expects active socket to be located at `window.socket`,
     * `Backbone.socket` or the sync'ed model own socket.
     * See inline comments if you want to change it.
     * ### Server Side
     *
     *     socket.on('todos:create', function (data, fn) {
     *      ...
     *      fn(null, todo);
     *     });
     *     socket.on('todos:read', ... );
     *     socket.on('todos:update', ... );
     *     socket.on('todos:delete', ... );
     *
     * @name sync
     */
    Backbone.sync = function (method, model, options) {
        var params = _.extend({}, options);

        if (params.url) {
            params.url = _.result(params, 'url');
        } else {
            params.url = _.result(model, 'url') || urlError();
        }

        var cmd = params.url.split('/')
            , namespace = (cmd[0] !== '') ? cmd[0] : cmd[1]; // if leading slash, ignore

        if ( !params.data && model ) {
            params.data = params.attrs || model.toJSON(options) || {};
        }

        if (params.patch === true && params.data.id === null && model) {
            params.data.id = model.id;
        }

        // If your socket.io connection exists on a different var, change here:
//        var io = model.socket || Backbone.socket || socket;
        var io = socket;
        //since Backbone version 1.0.0 all events are raised in methods 'fetch', 'save', 'remove' etc

        var defer = $.Deferred();
        io.emit(namespace + ':' + method, params.data, function (err, data) {
            if (err) {
                if(options.error) options.error(err);
                defer.reject();
            } else {
                if(options.success) options.success(data);
                defer.resolve();
            }
        });
        var promise = defer.promise();
        model.trigger('request', model, promise, options);
        return promise;
    };

// Throw an error when a URL is needed, and none is supplied.
// Copy from backbone.js#1558
    var urlError = function() {
        throw new Error('A "url" property or function must be specified');
    };




    return socket;

});
