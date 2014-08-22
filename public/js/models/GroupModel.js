
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
            langs:['en'],
            is_common: false
        },
        parse: function(attrs, opts){
            console.info(opts, attrs);
            if(opts.parse){
                if(typeof attrs.langs === "string"){
                    attrs.langs = attrs.langs.split(',');
                }
            }
            return attrs;
        }
    });
});
