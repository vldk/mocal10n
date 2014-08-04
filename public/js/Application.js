define(function (require) {
    "use strict";

    /** @type {Backbone} */
    var Backbone = require('backbone');


    var Groups = require('./collections/Groups');
    var groups = new Groups();
    var GroupsView = require('./views/GroupsView');
    var _groupsView = new GroupsView(groups);

    /**
     * @class Application
     * @extends {Backbone.Router}
     */
    return Backbone.Router.extend({
        routes: {
            '': 'showNamespacesList',
            'group/:id/:lang':'showGroupByIdAndLand',
            'get/:id': 'showDownloadGroupDialog',
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
            _groupsView.render();
        },
        showGroupByIdAndLand: function(id, lang){

        },
        showDownloadGroupDialog: function(id){
            console.warn('TODO: show download dialog with "merge with common"-option for #', id);
        }
    });
});
