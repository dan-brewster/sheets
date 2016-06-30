'use strict';


const rds_db_host = process.argv.slice(2)[0];
const rds_db_user = process.argv.slice(2)[1];
const rds_db_pass = process.argv.slice(2)[2];

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
    process.argv.forEach(function (val, index, array) {
      console.log(index + ': ' + val);
    });

    console.log('hello there');
    console.log(process.env);
    var connection = mysql.createConnection({ host: rds_db_host user: rds_db_user, password: rds_db_pass, port: 3306, database: 'sheets' });
    connection.connect();
    connection.query('SELECT 1+1 AS solution', function (err, rows, fields) {
      if (err) throw err;
      reply('hello there, answer is ' + rows[0].solution);
    });
    connection.end();
  }
});

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.url);
});
