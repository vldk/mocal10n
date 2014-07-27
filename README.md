Utility for editing localisation phrases for Mobile Casino Projects
=========

Version
---------
0.0.2

Quick Start
--------------
To install dependencies:    

```sh
npm install
```

Also need perform next steps:

 1. Copy config/index.js.example to config/index.js and set up needed params (Note: index.js in svn:ignores) 
 2. [Download][1] and [install][2] MongoDB server and create there database 'mocai18n' 

Run server:
```sh
node ./bin/www
```

By default application is available on [http://localhost:3000/][3] (can be changed in config/index.js)


#TODO:
 * authorization
     * ~~by email only (done)~~
     * ~~hardcoded passwords (temporary) (done)~~
     * redirect to prev. page
     * roles? 
     * online users count (by socket.io)
 * navigation (with direct links)
 * socket.io:
     * for Backbone.sync
     * for live-update 
     * for notifications
 * cmd line support
     * import to DB by folder with json-filese
     * export (?)
     * xsl (xslt) converter
 


[1]: http://www.mongodb.org/downloads
[2]: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/#manually-create-a-windows-service-for-mongodb
[3]: http://localhost:3000/