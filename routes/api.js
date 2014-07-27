

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
            fn(null, [/* 0 */
                {
                    "name" : "errors",
                    "_id" : "53d3cb63ae015e4417e469f0",
                    "is_common" : true,
                    "__v" : 0
                },

                /* 1 */
                {
                    "name" : "mfw",
                    "_id" : "53d3cb6aae015e4417e469f2",
                    "is_common" : false,
                    "__v" : 0
                }]);
        })
    ;
};



module.exports = new Router();

