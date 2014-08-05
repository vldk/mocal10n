define(function (require) {
    "use strict";


    /** @type {BaseView} */
    var BaseView = require('./../BaseView');


    /** @type {_} */
    var _ = require('underscore');

    var GroupListView = require('./GroupsList');
    var GroupForm = require('./GroupForm');


    /**
     * @class GroupsView
     * @extends {BaseView}
     */
    return BaseView.extend({
        container: '#appContent',
        template: _.template(
            '<div id="groups-list-container"></div>' +
            '<div id="new-group-container"></div>'
        ),
        /** @type {GroupListView}*/
        list: null,
        /** @type {GroupEditView}*/
        form: null,
        initialize: function(groups){
            this.list = new GroupListView(groups);
            this.form = new GroupForm(groups);
        },
        render: function(){
            if(this.rendered){
                //refresh groups list
                this.list.show();
                return;
            }

            this.list.show();
            BaseView.prototype.render.call(this);
            this.form.render();
        }
    });
});
