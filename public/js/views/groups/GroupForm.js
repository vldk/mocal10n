define(function (require) {
    "use strict";

    /** @type {BaseView} */
    var BaseView = require('./../BaseView');

    /** @type {_} */
    var _ = require('underscore');


    /**
     * @class GroupEditView
     * @extends {BaseView}
     */
    return BaseView.extend({
        templateId: '#groupForm',
        container: '#new-group-container',
        events: {
            'submit .form-inline': 'onFormSubmit',
            'change input[type=text]': 'onInputChange'
        },
        model:null,

        $form:null,
        $formMsg:null,
        $nameInp: null,
        $isCommonInp: null,
        render: function(model){

            if(model){
                this.model = model;
            }
            else {
                this.model = null;
            }

            BaseView.prototype.render.call(
                this,
                this.model ? this.model.attributes : this.collection.model.prototype.defaults
            );

            if(this.$nameInp === null){
                this.$form = this.$('.form-inline');
                this.$formMsg = this.$('.help-block');
                this.$nameInp = this.$('#group-name');
                this.$isCommonInp = this.$('#is-common-group');
            }
        },
        show: function(model){
            if(!this.rendered){
                this.render(model || this.model);
            }
            BaseView.prototype.show.call(this);
        },
        onCollectionAdd: function(){
            this.onInputChange().resetInputs();

        },
        onInputChange: function(){
            this.$form.removeClass('has-error');
            this.$formMsg.html('');
            return this;
        },
        resetInputs: function(){
            this.$nameInp.val('');
            this.$isCommonInp.prop("checked", false);
            return this;
        },
        /**
         *
         * @param {jQuery.Event} $e
         */
        onFormSubmit: function($e){
            $e.preventDefault();

            var _this = this,
                _data = {
                    name: $.trim(this.$nameInp.val()),
                    is_common: this.$isCommonInp.prop('checked')
                },
                _callbacks = {
                    success: function(){
                        _this.model = null;
                        _this.onCollectionAdd();
                    },
                    error: function(model, err){
                        _this.model = null;
                        _this.onFormErr(model, err);
                    }
                }
                ;


            if(!this.model){
                this.model = this.collection.create(
                    _data,
                    _.extend({wait: true}, _callbacks)
                );
            }
            else {
                this.model.save(_data);
            }
        },
        onFormErr: function(model, err){
            this.$form.addClass('has-error');
            var _msg = [];
            _.each(err, function(errItem, errKey){
                if(errKey === 'sql'){
                    return;
                }
                _msg.push(_.isArray(errItem) ? errItem.join('') : errItem);
            });
            this.$formMsg.html(_msg.join(' | '));
        }
    });
});