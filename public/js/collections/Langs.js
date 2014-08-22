/**
 * Collection for all supported languages in system
 * @module FLangs
 */
define(function (require) {
    "use strict";

    /** @type {Backbone} */
    var Backbone = require('backbone');

    var socket = require('./../socket');


    var LangModel = Backbone.Model.extend({
        idAttribute:'code',
        defaults: {
            code: 'en'
        }
    });

    return Backbone.Collection.extend({
        url: 'langs',
        model: LangModel,
        socket: socket
    });
});
