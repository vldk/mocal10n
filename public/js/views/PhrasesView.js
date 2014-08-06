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
        editGroupForm: null,

        render: function(){
            BaseView.prototype.render.call(this, {
                group: {name:''},
                lang: 'en'
            });
            if(!this.$groupOpts){
                this.$groupOpts = this.$('#group-options');
            }
        },
        show: function(groupId, lang){
            if(!this.rendered){
                this.render();
            }
            BaseView.prototype.show.call(this);
            console.log(groupId, lang);
        },
        toggleGroupOptions: function(){
            this.$groupOpts.toggleClass('visible');
        }
        /*,close: function(){
            this.rendered = false;
            console.warn('TODO: cleaning up all child views when getting back to groups list');
        }*/
    });
});
