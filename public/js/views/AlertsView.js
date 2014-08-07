define(function (require) {
    "use strict";

    /** @type {Backbone} */
    var Backbone = require('backbone');


    /** @type {jQuery} */
    var $ = require('jquery');

    /**
     * TODO: write usage example and arguments description
     * @link http://getbootstrap.com/javascript/#alerts
     * @example .ok('Great! [Go to first link](1) or [second](2) link', '/#one','/#two')
     *  -> will print HTML according to http://getbootstrap.com/components/#alerts-links layout
     *
     * @class AlertsView
     * @extends {Backbone.View}
     */
    return Backbone.View.extend({
        el: '#app-alerts',
        /** @type {Array.<jQuery>}*/
        queue:[],//FIFO queue
        maxShowed: 3, //show max 3 messages at same time
        closeAfter: 5e3, //auto close after 5sec
        showedCount: 0, //current showed messages counter
        /**
         * Parse message with passed replacement links
         *
         * @param {string} type
         * @param {string} msg
         * @param {Arguments} _replacement
         * @private
         */
        _process: function(type, msg, _replacement){

            var _closeBtn = '' +
                    '<button type="button" class="close" data-dismiss="alert">' +
                    '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>' +
                    '</button>',
                _text = msg,
                _parser = /\[([^\]]+)\]\(([^)"]+)(?: \"([^\"]+)\")?\)/igm,
                _links = msg.match(_parser)
                ;

            if( _links !== null ){
                var _linkHtml,
                    _hrefValues = [],
                    _href = ''
                    ;

                for (var i = 1; i < _replacement.length; i++) {
                    _hrefValues.push(_replacement[i]);
                }

                _links.forEach(function(link){
                    _href = _parser.exec(link);

                    if(typeof _href[2] !== "undefined" && typeof _hrefValues[_href[2]-1] !== undefined){
                        _linkHtml = link.replace(
                            _parser,
                            ['<a class="alert-link" href="', _hrefValues[_href[2] - 1], '">$1</a>'].join('')
                        );
                    }
                    else {
                        _linkHtml = link.replace(_parser, "$1");
                    }

                    _text = _text.replace(link, _linkHtml);
                });
            }


            this.queue.push(
                $('<div></div>')
                    .addClass('fade in alert alert-'+type)
                    .attr('role', 'alert')
                    .html([_closeBtn, _text].join(' '))
                    .alert()
            );

            this._showNext();
        },
        _showNext: function(){
            if(this.showedCount >= this.maxShowed){
                return;
            }
            /** @type {jQuery|undefined}*/
            var _$next = this.queue.shift();

            if(_$next){
                this.showedCount++;
                var _this = this,
                    _timeOut;

                _timeOut = window.setTimeout(function(){
                    _$next.alert('close');
                }, this.closeAfter + this.showedCount * 800);//close next message with 0.8s delay

                _$next.one('closed.bs.alert', {timeOut: _timeOut}, function(/*jQuery.Event*/$e){
                    window.clearTimeout($e.data.timeOut);
                    _this.showedCount--;
                    _this._showNext();
                });

                this.$el.append(_$next);
            }

        },
        /**
         * Show 'Success'-alert
         *
         * @param {String} msg
         * @param {...*} [links]
         * @returns {AlertsView}
         */
        ok: function(msg){
            this._process('success', msg, arguments);
            return this;
        },
        /**
         * Show 'Info'-alert
         * @param {String} msg
         * @param {...*} [links]
         * @returns {AlertsView}
         */
        info: function(msg){
            this._process('info', msg, arguments);
            return this;
        },
        /**
         * Show 'warning'-alert
         *
         * @param {String} msg
         * @param {...*} [links]
         * @returns {AlertsView}
         */
        warn: function(msg){
            this._process('warning', msg, arguments);
            return this;
        },
        /**
         * Show 'danger'-alert
         * @param {String} msg
         * @param {...*} [links]
         * @returns {AlertsView}
         */
        error: function(msg){
            this._process('danger', msg, arguments);
            return this;
        }
    });
});
