define(function (require) {
    "use strict";

    /** @type {BaseView} */
    var BaseView = require('./BaseView');


    /** @type {_} */
    var _ = require('underscore');


    /** @type {GroupForm} */
    var GroupForm = require('./groups/GroupForm');

    /** @type {Function}*/
    var langTabTpl = _.template([
        '<li data-lang="<%= lang %>" class="langTab <%= isCurrent? \'active\' : \'\' %>">',
            '<a href="/#group/<%= grId%>/<%= lang %>"><%= lang.toUpperCase() %></a>',
        '</li>'
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
        editGroupForm: null,

        initialize: function(){
            BaseView.prototype.initialize.call(this);
            this.editGroupForm = new GroupForm({model: this.model});
        },

        render: function(lang){
            BaseView.prototype.render.call(this, {
                group: this.model.toJSON(),
                lang: lang,
                allLangs: ['en']//['en', 'de', 'el']
            });
            this.editGroupForm.$container = this.$('#edit-group-container');
            this.editGroupForm.show();

            if(!this.$groupOpts){
                this.$groupOpts = this.$('#group-options');
                this.$langTabs = this.$('#lang-tabs');
            }

            var _langs = ['en'],
                _tabsContent = '';

            _langs.forEach(function(langName){
                _tabsContent += langTabTpl({
                    lang:langName,
                    isCurrent: langName === lang,
                    grId: this.model.get('id')
                });
            }, this);

            this.$langTabs.html(_tabsContent);
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

            delete this.$groupOpts;

            BaseView.prototype.remove.call(this);

        }
        /*,close: function(){
            this.rendered = false;
            console.warn('TODO: cleaning up all child views when getting back to groups list');
        }*/
    });
});
