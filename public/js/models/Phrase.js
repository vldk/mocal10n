define(function (require) {
    "use strict";

    /** @type {Backbone} */
    var Backbone = require('backbone');

    /**
     * One field model
     *
     * @class Phrase
     * @extends {Backbone.Model}
     * @property {String} ns
     * @property {String} parent
     * @property {String} value
     * @property {Boolean} verified
     */
    return Backbone.Model.extend({
        defaults: {
            ns: '',
            parent:'',
            value:'',
            verified: false
        }
    });
});