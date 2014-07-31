define(function (require) {
    "use strict";

    /** @type {Backbone} */
    var Backbone = require('backbone');

    var GroupModel = require('./../models/Group');

    var socket = require('./../socket');

    return Backbone.Collection.extend({
        url: 'groups',
        model: GroupModel,
        socket: socket,
        removeById: function(id){
            var _model = this.get(id);
            _model.destroy();


            return this;
        }
    });
});
