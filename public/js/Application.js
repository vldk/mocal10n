define(function (require) {
    "use strict";

    /** @type {Backbone} */
    var Backbone = require('backbone');


    /** @type {Registry} */
    var reg = require('./Registry');


    /** @type {AlertsView} */
    var AlertsView = require('./views/AlertsView');


    var AllLangs = require('./collections/Langs');

    var Groups = require('./collections/Groups');
    var GroupsView = require('./views/groups/GroupsView');

    var _groups = new Groups();
    var _groupsView = new GroupsView({collection:_groups});

    var PhrasesView = require('./views/PhrasesView');

    var _phrasesView = null;

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
            Backbone.history.start();
            reg.set('alerts', new AlertsView());

            var langs = new AllLangs();
            reg.set('langs', langs);

            langs.fetch();
        },
        defaultRoute: function(fragment, params){
            console.warn('Note: used default route "%s" with params: %o', fragment, params);
            this.showNamespacesList();
        },
        showNamespacesList: function(){
            if(_phrasesView) {
                _phrasesView.remove();
                _phrasesView = null;
            }
            _groupsView.show();
        },
        showGroupByIdAndLand: function(groupId, lang){
            _groupsView.close();

            function _goToView(){
                if(!_phrasesView){
                    var _group = _groups.get(groupId);
                    if(!_group){

                        reg.get('alerts').error('Group with id=' + groupId + ' does not existing. [Go to groups](1) list', '/#');

                        console.error('Group with id='+groupId+' does not existing');
                        return;
                    }
                    _phrasesView = new PhrasesView({model:_group});
                }

                _phrasesView.switchToLang(lang);
            }

            //first run application by direct link
            if(!_groups.length){
                _groups
                    .fetch({
                        data: {id: groupId},//no need to fetch all items
                        set: true,
                        success: _goToView,
                        error: function(err) {
                            console.error(err);
                        }
                    })
                ;
            }
            else {
                _goToView();
            }

            return this;
        },
        showDownloadGroupDialog: function(id){
            console.warn('TODO: show download dialog with "merge with common"-option for #', id);
        }
    });
});
