define(function (require) {
    "use strict";

    /** @type {BaseView} */
    var BaseView = require('./BaseView');


    /** @type {_} */
    var _ = require('underscore');


    /** @type {GroupForm} */
    var GroupForm = require('./groups/GroupForm');

    /** @type {LangsForm}*/
    var LangsForm = require('./LangsForm');


    /** @type {Registry} */
    var registry = require('./../Registry');

    /** @type {Function}*/
    var langTabTpl = _.template([
        '<li data-lang="<%= lang %>" class="langTab <%= isCurrent? \'active\' : \'\' %>">',
            '<a href="/#group/<%= grId%>/<%= lang %>"><%= lang.toUpperCase() %></a>',
        '</li>'
    ].join(''));

    var phraseLangsTpl = _.template([
    '<div class="form-group">',
        '<div class="input-group checkbox <%= langName === \'en\'? \'disabled\': \'\' %>">',
        '<label class="btn">',
            '<input data-value="lang-<%=langName.toLowerCase()%>" type="checkbox" <%= langName === \'en\'? \'disabled\': \'\' %> > <%=langName.toUpperCase()%>',
        '</label>',

        '<button type="button" class="btn btn-default" <%= langName === \'en\'? \'disabled\': \'\' %>>',
            '<i class="glyphicon glyphicon-trash"></i> Remove',
        '</button>',

        '</div>',
    '</div>'
    ].join(''));

    /**
     * @class PhrasesView
     * @extends {BaseView}
     */
    return BaseView.extend({
        templateId: '#phrasesLayout',
        container: '#appContent',
        events: {
            'click #group-options-toggle': 'toggleGroupOptions'
        },

        $groupOpts: null,
        $langTabs:null,

        /** @type {FGroupModel}*/
        model: null,
        lang: 'en',
        /**@type {LangsForm}*/
        editGroupForm: null,

        langsForm:null,

        initialize: function(){
            BaseView.prototype.initialize.call(this);
            this.editGroupForm = new GroupForm({model: this.model});
            this.langsForm = new LangsForm();
        },

        render: function(lang){
            var allLangs = registry.get('langs');

            function getPhrasesLangs(/*LangsCollection*/lagsCollection){
                return lagsCollection.map(function(/*LangModel*/langModel){
                    return phraseLangsTpl({
                        langName: langModel.get('code')
                    });
                }).join('');
            }

            if(!allLangs.length){
                allLangs.once('sync', function(langs){
                    $('#group-langs-list').html(getPhrasesLangs(langs));
                });
            }

            BaseView.prototype.render.call(this, {
                group: this.model.toJSON(),
                lang: lang,
                phrasesLangs: getPhrasesLangs(allLangs)
            });

            this.editGroupForm.$container = this.$('#edit-group-container');
            this.editGroupForm.show();

            this.langsForm.$container = this.$(this.langsForm.container);
            this.langsForm.render().show();

            if(!this.$groupOpts){
                this.$groupOpts = this.$('#group-options');
                this.$langTabs = this.$('#lang-tabs');
            }

            var _langs = this.model.get('langs'),
                _tabsContent;

            _tabsContent = _langs.map(function(langName){
                return langTabTpl({
                    lang:langName,
                    isCurrent: langName === lang,
                    grId: this.model.get('id')
                });
            }, this);

            this.$langTabs.html(_tabsContent.join(''));
        },
        show: function(lang){
            if(!this.rendered){
                this.render(lang || 'en');
            }

            BaseView.prototype.show.call(this);

            return this;
        },
        switchToLang: function(lang){
            this.show(lang);

            if(lang !== this.lang){
                this.lang = lang;
                this.$langTabs.children().removeClass('active').each(function(){
                    if( $(this).data('lang') === lang) {
                        $(this).addClass('active');
                    }
                });

            }

            return this;
        },
        toggleGroupOptions: function(){
            this.$groupOpts.toggleClass('visible');
        },
        remove: function(){

            this.editGroupForm.remove();
            this.editGroupForm = null;

            this.langsForm.remove();
            this.langsForm = null;


            delete this.$groupOpts;

            BaseView.prototype.remove.call(this);

        }
        /*,close: function(){
            this.rendered = false;
            console.warn('TODO: cleaning up all child views when getting back to groups list');
        }*/
    });
});
