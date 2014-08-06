define(function (require) {
    "use strict";

    /** @type {Backbone} */
    var Backbone = require('backbone');


    var Groups = require('./collections/Groups');
    var GroupsView = require('./views/groups/GroupsView');
    var _groupsView = new GroupsView(new Groups());

    var PhrasesView = require('./views/PhrasesView');

    var _phrasesView = new PhrasesView();

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
        init: function(){
            Backbone.history.start(/*{pushState: true}*/);
        },
        defaultRoute: function(fragment, params){
            console.warn('Note: used default route "%s" with params: %o', fragment, params);
            this.showNamespacesList();
        },
        showNamespacesList: function(){
            _phrasesView.close();
            _groupsView.show();
        },
        showGroupByIdAndLand: function(groupId, lang){
            _groupsView.close();
            _phrasesView.show(groupId, lang);
        },
        showDownloadGroupDialog: function(id){
            console.warn('TODO: show download dialog with "merge with common"-option for #', id);
        }
    });
});
