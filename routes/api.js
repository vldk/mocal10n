/**
 *
 * @type {exports}
 * @property Group
 */
var db = require('./../models');

function SocketRouter(){
    /**
     * @type {Socket}
     */
    this.socket = null;
}



SocketRouter.prototype = {
    setSocket: function(socket){
        this.socket = socket;

        this.socket
            .on('langs:read', function(input, fn){
                console.log('langs:read', input);
                db.Langs.findAll().done(fn);
            })
            .on('langs:create', function(input, fn){
                console.log('langs:create', input);
                db.Langs.create(input).complete(fn);
            })
            .on('groups:read', function(input, fn){
                console.log('groups:read', input);
                if(input.id){
                    db.Group.find(input.id).complete(function(err, model) {
                        fn(err, [model]);
                    });
                }
                else {
                    db.Group.findAll().done(fn);
                }

            })
            .on('groups:create', function(input, fn){
                console.log('groups:create', input);
                db.Group.create(input).complete(fn);
            })
            .on('groups:update', function(input, fn){
                console.log('groups:update', input.id);
                db.Group.find(input.id)
                    .success(function(model){
                        return model.updateAttributes({
                            name: input.name,
                            is_common: input.is_common
                        }).complete(fn);
                    })
                    .error(fn)
                ;
            })
            .on('groups:delete', function(input, fn){
                console.log('groups:delete', input.id);
                db.Group.find(input.id).complete(function(err, model){
                    if(!err){
                        model.destroy().complete(fn);
                        return;
                    }
                    fn(err, model);
                });
            })
        ;
    }
};



module.exports = new SocketRouter();

