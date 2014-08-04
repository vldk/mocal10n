define(function (require) {
    "use strict";

    /** @type {BaseView} */
    var BaseView = require('./BaseView');

    /**
     * @class GroupsListView
     * @extends {BaseView}
     */
    return BaseView.extend({
        templateId: '#groupsList',
        container: '#groups-list-container',
        className: 'groups-list-wrapper',
        events: {
            'click .delete-group-link': 'onDelete'
        },
        initialize: function (groups){
            BaseView.prototype.initialize.call(this);
            this.groups = groups;
            this.groups.bind('reset add remove', this.render, this);

        },
        render: function(){
            BaseView.prototype.render.call(this, { groups: this.groups.toJSON() });
        },
        show: function(){
            this.groups.fetch({reset: true});
        },
        /**
         *
         * @param {jQuery.Event} $e
         */
        onDelete: function($e){

            if(confirm('Are you really want to delete this group?\n' +
                'Note: all child phrases and translations for them also will be deleted!\n' +
                'Really delete?')){

                this.groups.removeById($($e.currentTarget).parent().data("id"));
            }
        }
    });
});
