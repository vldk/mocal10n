

function Router(){
    /**
     * @type {Socket}
     */
    this.socket = null;
}

Router.prototype.setSocket = function(socket){
    this.socket = socket;

    this.socket
        .on('groups:read', function(data, fn){
            fn(null, [1,3,5]);
        })
    ;
};



module.exports = new Router();

