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
                db.Group.findAll().done(function(err, rows){
                    fn(err, rows);
                });
                /*fn(null, [
                    {
                        "id" : "1",
                        "name" : "errors",
                        "is_common" : true
                    },

                    {
                        "id" : "2",
                        "name" : "megafortunewheel",
                        "is_common" : false
                    }
                ]);*/
            })
            .on('groups:delete', function(data, fn){
                console.log('groups:delete', data.id);
                var err = null;
                fn(err);
            })
        ;
    }
};



module.exports = new SocketRouter();

