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
        initialize: function(params){
            this.list = new GroupListView(params);
            this.form = new GroupForm(params);
        },
        show: function(){
            if(!this.rendered){
                this.render();
            }
            BaseView.prototype.show.apply(this);

            this.list.show();
            this.form.show();

            return this;
        }
    });
});
