Utility for editing localization phrases for Mobile Casino Projects
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
 2. Run web-server   

Run server:
```sh
node ./bin/www
```
By default application is available on [http://localhost:3000/](http://localhost:3000/ (can be changed in config/index.js)

Development
---
Grunt tasks are available.  
For db-management can be used [Sqliteman](http://sqliteman.yarpen.cz/), [SQLiteManager](http://www.sqlabs.com/), [SQLiteBrowser](http://sourceforge.net/projects/sqlitebrowser/) or other which you are prefer



#TODO:
 * authorization
     * ~~by email only (done)~~
     * ~~hardcoded passwords (done)~~
     * refactor passport strategy (currently used simple MemoryStore with sessions)
     * redirect to prev. page (before authorization)
     * roles? 
     * online users count (by socket.io) ?
 * navigation (with direct links)
     * ~~~to groups list (default route) (almost done)~~~     
     * to group with specific lang ('en' by default) /#group/6/en
 * models editing:
     * ~~~Group create~~~ 
     * ~~~Group delete~~~ 
     * Group rename
     * Phrases
 * socket.io:
     * ~~~for Backbone.sync (done partly)~~~
     * for live-update 
     * for notifications 
 * cmd line support
     * import to DB by folder with json-filese
     * export (?)
     * xsl (xslt) converter
 