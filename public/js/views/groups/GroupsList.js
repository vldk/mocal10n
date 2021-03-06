define(function (require) {
    "use strict";

    /** @type {BaseView} */
    var BaseView = require('./../BaseView');

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
        initialize: function (){
            BaseView.prototype.initialize.call(this);
            this.collection.bind('add remove change', this.render, this);

        },
        render: function(){
            BaseView.prototype.render.call(this, { groups: this.collection.toJSON() });
        },
        show: function(){
            BaseView.prototype.show.call(this);

            var _this = this;
            this.collection
                .fetch({silent: true})
                .done(function(){
                    _this.render();
                });
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
