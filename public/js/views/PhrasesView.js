define(function (require) {
    "use strict";

    /** @type {BaseView} */
    var BaseView = require('./BaseView');


    /** @type {GroupForm} */
    var GroupForm = require('./groups/GroupForm');


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

        /** @type {FGroupModel}*/
        model: null,

        editGroupForm: null,

        initialize: function(){
            BaseView.prototype.initialize.call(this);
            this.editGroupForm = new GroupForm({model: this.model});
        },

        render: function(lang){
            BaseView.prototype.render.call(this, {
                group: this.model.toJSON(),
                lang: lang
            });
            this.editGroupForm.$container = this.$('#edit-group-container');
            this.editGroupForm.show();

            if(!this.$groupOpts){
                this.$groupOpts = this.$('#group-options');
            }
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
