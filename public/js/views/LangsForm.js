define(function (require) {
    "use strict";

    /** @type {BaseView} */
    var BaseView = require('./BaseView');


    /** @type {Registry} */
    var reg = require('./../Registry');


    /**
     * @class LangsForm
     * @extends {BaseView}
     */
    return BaseView.extend({
        container: '.new-lang-form',
        templateId: '#langsForm',
        events: {
            'submit form': 'onSubmitNewLang'
        },
        $text: null,
        afterRender: function(){
            this.$text = this.$('input[type=text]');
        },
        onSubmitNewLang: function($e){
            $e.preventDefault();

            var _newLang = $.trim(this.$text.val());

            if(!_newLang){
                return;
            }

            reg.get('langs').create({
                code: _newLang
            },{
                wait:true,
                success: function(){
                    //alert('horray!!!');
                    reg.get('alerts').ok('New language "'+_newLang+'" has been added');
                },
                error: function(){
                    alert('todo error');
                }
            });
        }
    });
});
