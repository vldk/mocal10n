define(function (require) {
    "use strict";

    /** @type {Backbone} */
    var Backbone = require('backbone');


    var Groups = require('./collections/Groups');
    var groups = new Groups();

    var GroupListView = require('./views/GroupsList');
    var groupListView = new GroupListView(groups);


    /**
     * @class Application
     * @extends {Backbone.Router}
     */
    return Backbone.Router.extend({
        routes: {
            'namespaces': 'showNamespacesList',
            '*path': 'defaultRoute'
        },
        initialize: function(){
            Backbone.history.start(/*{pushState: true}*/);
        },
        init: function(){},
        defaultRoute: function(fragment, params){
            console.warn('Note: used default route "%s" with params: %o', fragment, params);
            this.showNamespacesList();
        },
        showNamespacesList: function(){
            groupListView.show();
        }
    });
});
