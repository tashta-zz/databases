var url = require('url');
var querystring = require('querystring');
var router = require('./router.js');
var dbserver = require('../persistent_server.js');

var defaultHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

var pathOf = function(request) {
  return url.parse(request.url).pathname;
};

var handlers = {};
handlers.getMessages = function(request, response) {
  request.on('end', function() {
    response.writeHead(200, defaultHeaders);
    dbserver.handleGet(function(rows){
      response.end(JSON.stringify(rows));
    });
  });
};
handlers.postMessage = function(request, response) {
  request.on('data', function(chunk) {
    console.log('parsed JSON:', querystring.parse(chunk));
    dbserver.handlePost(JSON.parse(chunk));
  });
  request.on('end', function() {
    response.writeHead(200, defaultHeaders);
    console.log('asdfasdfasdfasdfasdf');
    response.end();
  });
};
handlers.routeDefault = function(request, response) {
  response.writeHead(404, defaultHeaders);
  response.end();
};

var handleRequest = function(request, response) {
  if ((pathOf(request) === '/classes/room1') || (pathOf(request) === '/1/classes/messages')) {
    handlers[router[request.method]](request, response);
  }

};

module.exports.handleRequest = handleRequest;