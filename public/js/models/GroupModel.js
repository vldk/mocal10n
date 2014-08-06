
define(function (require) {
    "use strict";

    /** @type {Backbone} */
    var Backbone = require('backbone');
    /**
     * Frontend Group Model (same as Namespace) e.g. 'errors.*' or 'game.*'
     *
     * @class FGroupModel
     * @extends {Backbone.Model}
     */
    return Backbone.Model.extend({
        defaults: {
            id:null,
            name:'',
            is_common: false
        }
    });
});
