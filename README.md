Just example project witch are use Express, Socket.io & Backbone
=========


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
     * users should be stored in DB (currently they're hardcoded in config-file) 
     * roles? 
     * online users count (by socket.io) ?
 * navigation (with direct links)(almost done)
     * ~~to groups list (default route) ~~     
     * ~~to group with specific lang ('en' by default) /#group/6/en~~
 * ~~Notification system (with [stylized alerts](http://getbootstrap.com/components/#alerts))~~
 * models editing:
     * ~~Group create~~ 
     * ~~Group delete~~ 
     * ~~Group rename~~
     * Phrases
 * socket.io:
     * ~~for Backbone.sync (done partly)~~
     * for live-update 
     * for notifications 
 * cmd line support
     * import to DB by folder with json-filese
     * export (?)
     * xsl (xslt) converter
