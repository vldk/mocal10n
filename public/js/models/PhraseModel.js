define(function (require) {
    "use strict";

    /** @type {Backbone} */
    var Backbone = require('backbone');

    /**
     * Frontend Phrase Model of one field
     *
     * @class FPhraseModel
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