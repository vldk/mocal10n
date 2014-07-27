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
        container: '#appContent',
        initialize: function (groups){
            BaseView.prototype.initialize.call(this);
            this.groups = groups;
        },
        render: function(){
            this.groups.fetch();
            BaseView.prototype.render.call(this, { groups: this.groups.toJSON() });
        }
    });
});
