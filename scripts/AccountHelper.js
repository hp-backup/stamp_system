'use strict';

var connectHelper = require('../scripts/ConnectHelper');

function checkExistAccount(userName, callback) {
    var queryString = `SELECT * FROM users WHERE userName = '${userName}'`;

    connectHelper.queryString(queryString, callback);
}

function addNewAccount(userName, password, email, callback) {
    var queryString = `INSERT INTO users(idUser, userName, password, email) VALUES ('', '${userName}', '${password}', '${email}')`;
    
    connectHelper.queryString(queryString, callback);
}

// function addRole(email, level, callback) {
//     var queryString = `INSERT INTO role(ID, email, Level) VALUES ('', '${email}', '${level}')`;
    
//     connectHelper.queryString(queryString, callback);
// }

// function addLogger(email, records, callback) {
//     var queryString = `INSERT INTO logger(ID, email, Records, Time) VALUES ('', '${email}', '${records}', now())`;

//     connectHelper.queryString(queryString, callback);
// }

module.exports = {
    checkExistAccount,
    addNewAccount,
    // addRole,
    // addLogger
}