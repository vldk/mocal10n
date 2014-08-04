/**
 * @module FGroups
 */
define(function (require) {
    "use strict";

    /** @type {Backbone} */
    var Backbone = require('backbone');

    var GroupModel = require('./../models/GroupModel');

    var socket = require('./../socket');
    /**
     * @class FGroupsCollections
     * @extends {Backbone.Collection}
     */
    return Backbone.Collection.extend({
        url: 'groups',
        model: GroupModel,
        socket: socket,
        comparator:  'name',
        removeById: function(id){
            var _model = this.get(id);
            _model.destroy({wait: true});
            return this;
        }
    });
});
