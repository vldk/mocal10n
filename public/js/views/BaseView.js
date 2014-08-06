define(function (require) {
    "use strict";

    /**
     * @type {Backbone}
     */
    var Backbone = require('backbone');

    var _ = require('underscore');
    var $ = require('jquery');

    var TemplateCache = function(templateId){
        this.templateId = templateId;
    };

    _.extend(TemplateCache, {
        templateCaches: {},
        get: function(templateId){
            var cachedTemplate = this.templateCaches[templateId];

            if (!cachedTemplate){
                cachedTemplate = new TemplateCache(templateId);
                cachedTemplate.fetchTemplate(templateId)
                    .done(function(tplData){
                        $(document.body).append(tplData);
                    })
                    .fail(function(){
                        throw new Error("Could not find template by url: '" + templateId + "'", "NoTemplateError");
                    })
                ;
                this.templateCaches[templateId] = cachedTemplate;
            }

            return cachedTemplate.load();
        }
    });

    _.extend(TemplateCache.prototype, {
        load: function(){
            if (this.compiledTemplate){
                return this.compiledTemplate;
            }
            var template = this.loadTemplate(this.templateId);
            this.compiledTemplate = this.compileTemplate(template);

            return this.compiledTemplate;
        },
        fetchTemplate: function(templateId){
            return $.ajax(['/js/tpl/', templateId.substr(1),'.ejs'].join(''), {async: false});
        },
        loadTemplate: function(templateId){
            var template = $(templateId).html();

            if (!template || template.length === 0){
                throw new Error("Could not find template: '" + templateId + "'", "NoTemplateError");
            }

            return template;
        },
        compileTemplate: function(rawTemplate){
            return _.template(rawTemplate);
        }
    });
    /**
     *
     * @class BaseView
     * @extends {Backbone.View}
     * @property {Boolean} rendered
     */
    var BaseView = Backbone.View.extend({
        /**
         * selector with template content.
         * f.e. '#gameTpl' or '#systemMessageTpl'
         * If none = don't use if for getting template content
         */
        templateId:'',

        /**
         * Selector, where view will be rendered
         * Example: '#mainWrapper' or '#sysMessage' etc.
         * @type {string}
         */
        container:'',
        /**
         * cached jQuery-object of container
         * @type {jQuery}
         */
        $container:null,

        template: null,

        rendered: false,

        visible: false,
        /**
         * Invoked when the view is created
         * for overriding use MCBaseView.prototype.initialize.apply(this)
         * @see http://stackoverflow.com/questions/15987490/backbone-view-inheritance-call-parent-leads-to-recursion
         * @constructor
         */
        initialize:function(){
            if(this.templateId){
                this.template = TemplateCache.get(this.templateId);
            }
            //this.on('change:visibility', this.onChangeVisibility);
            //this.on('render', this.afterRender);
        },
        /**
         * Render view
         * If need to override this method and call as parent method
         * use MCBaseView.prototype.render.apply(this) (preferred variant if need deep inheritance)
         * or this.constructor.__super__.render.call(this);
         * @param {Object=} templateData
         * @param {boolean=} appendToContainer If false (by default): content for $container will be replaced
         * @returns {BaseView}
         */
        render: function(templateData){

            if(this.template){
                this.$el.html(this.template(templateData));
            }
            else {
                throw new Error('Template not found');
            }

            this.rendered = true;
            this.trigger('render');

            return this;
        },
        /**
         * @abstract
         */
        afterRender: function(){},
        /**
         * @abstract
         */
        onChangeVisibility: function(){},
        show: function(){

            if (typeof this.container === "string" && !this.$container){
                this.$container = $(this.container);
            }

            if(this.$container instanceof jQuery){
                if(!this.$container.length){
                    throw new Error('$container %o is empty'+this.$container.selector);
                }

                if(!this.visible){
                    this.$container.html(this.$el);
                    this.visible = true;
                }
                //note: undelegateEvents will be called automatically
                this.delegateEvents();
            }

            return this;
        },
        close: function(){


            if(this.rendered){
                this.$container.empty();
                /*this.unbind();
                this.undelegateEvents();*/
            }

            this.visible = false;

            console.log('close:', this.templateId);
            /*if(!(silent)){
                this.trigger('onClose');
                this.unbind();
            }
            this.undelegateEvents();
            this.$el.empty();
            this.remove();
            this.rendered = false;

            delete this.$container;
            delete this.$el;
            delete this.el;*/

            return this;
        }
    });

    return BaseView;
});

