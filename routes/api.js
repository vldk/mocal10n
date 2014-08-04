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
            .on('groups:read', function(input, fn){
                console.log('groups:read');
                db.Group.findAll().done(fn);
            })
            .on('groups:create', function(input, fn){
                console.log('groups:create', input);
                db.Group.create(input).complete(fn);
            })
            .on('groups:update', function(input, fn){
                console.log('groups:update', input.id);
                var err = null;
                fn(err);
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

