/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('../nodechat/node_modules/mysql');
var request = require('../nodechat/node_modules/request');
var $ = require('jQuery');

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function() {
    dbConnection = mysql.createConnection({
      user: "root",
      password: "",
      database: "chat"
    });
    /* TODO - You'll need to fill this out with your mysql username
     * and password. */
    dbConnection.connect();

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    var tables = ["messages", "users", "rooms"];
    for (var i = 0; i < tables.length; i++) {
      dbConnection.query("DELETE FROM " + tables[i]);
    }
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post a message to the node chat server:
    $.ajax({
      url: "http://127.0.0.1:8080/classes/room1",
      type: "POST",
      data: JSON.stringify({username: "Valjean", message: "In mercy's name, three days is all I need."}),
      success: function(error, response, body) {

        /* Now if we look in the database, we should find the
         * posted message there. */
        var queryString = 'SELECT * FROM messages';
        // var queryArgs = [];
        /* TODO - The exact query string and query args to use
         * here depend on the schema you design, so I'll leave
         * them up to you. */
        dbConnection.query(queryString,
          function(err, results, fields) {
            // Should have one result:
            expect(results.length).toEqual(1);
            expect(results[0].username).toEqual("Valjean");
            expect(results[0].message).toEqual("In mercy's name, three days is all I need.");
            /* TODO You will need to change these tests if the
             * column names in your schema are different from
             * mine! */
            done();
        });
      },
      error: function(e){
        console.log('err: ', e);
      }
    });
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    var queryString = "INSERT INTO messages (username, message) VALUES (?,?)";
    var queryArgs = ["Javert", "Men like you can never change!"];
    /* TODO - The exact query string and query args to use
     * here depend on the schema you design, so I'll leave
     * them up to you. */

    dbConnection.query( queryString, queryArgs,
      function(err, results, fields) {
        /* Now query the Node chat server and see if it returns
         * the message we just inserted: */
        $.ajax({
          url:"http://127.0.0.1:8080/classes/room1",
          type:'GET',
          success: function(error, response, body) {
            var messageLog = JSON.parse(body.responseText);
            expect(messageLog[0].username).toEqual("Javert");
            expect(messageLog[0].message).toEqual("Men like you can never change!");
            done();
          }
        });
    });
  });
});
