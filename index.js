'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server()
server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply('Hello, world!');
  }
});

var mysql = require('mysql');

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function(request, reply) {
    var connection = mysql.createConnection({ host: process.env.RDS_DB_HOST, user: process.env.RDS_DB_USER, password: process.env.RDS_DB_PASS, port: 3306, database: 'sheets' });
    connection.connect();
    connection.query('SELECT 1+1 AS solution', function (err, rows, fields) {
      if (err) throw err;
      reply('hello there, answer is ' + rows[0].solution);
    });
    connection.end();
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.url);
});
