'use strict';

const mysql = require('mysql');
const options = {
    host: 'us-cdbr-east-04.cleardb.com',
    port: '3306',
    user: 'b868133dc801c0',
    password: 'f8233014',
    database: `heroku_c5e0098bd9d90ab`,
    charset: 'utf8'
}
let connection;

function handleDisconnect() {
    connection = mysql.createConnection(options); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function (err) {              // The server is either down
        if (err) {
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();

function queryString(queryString, callback) {
    connection.query(queryString, function (err, result) {
        callback(err, result);
    });
};

module.exports = {
    queryString: queryString
}
