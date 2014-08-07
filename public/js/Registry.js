define(function (require) {
    "use strict";

    var _ = require('underscore');
    var Backbone = require('backbone');

    /**
     * @class Registry
     * @extends {Backbone.Events}
     */
    var Registry = function () {
    };

    _.extend(Registry.prototype, Backbone.Events, {
        _instances: {},
        /**
         * Check if the instance is in registry
         * @param name
         * @returns {boolean}
         */
        has: function (name) {
            if (!name) { throw new Error("Name can't be empty"); }
            return this._instances.hasOwnProperty(name);
        },
        /**
         * Put into the registry instance of created object
         * @example
         *          registry = require('./Registry');
         *          registry.set('gameModel', new Backbone.Model({}))
         * @param {string} name
         * @param {Object} objInstance
         * @return {Registry}
         * @throws
         */
        set: function (name, objInstance) {
            if (!name) { throw new Error("Name can't be empty"); }
            if (this._instances.hasOwnProperty(name.toString())) {
                this.destroy(name);
            }
            this._instances[name.toString()] = objInstance;
            return this;
        },
        /**
         *
         * @param name
         * @returns {*}
         * @throws
         */
        get: function (name) {
            if (!name) { throw new Error("Name can't be empty"); }
            if (!this.has(name)) {
                throw new Error('no instance found for %s', name);
            }
            return this._instances[name];
        },
        destroy: function (name) {
            if (this.has(name)) {
                //detach listeners in model/collection/view etc.
                if (typeof this._instances[name].off === "function") {
                    this._instances[name].off();
                    this._instances[name].stopListening();
                }
                delete this._instances[name];
            }
            return this;
        },
        clear: function () {
            for (var key in this._instances) {
                if (typeof this._instances[key].off === "function") {
                    this._instances[key].off();
                    this._instances[key].stopListening();
                }
            }
            this._instances = {};
        },
        getSize: function () {
            return _.size(this._instances);
        }

    });

    var instance;

    if (!instance) {
        instance = new Registry();
    }

    return instance;
});
