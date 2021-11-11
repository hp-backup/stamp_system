'use strict';

const express = require('express');
const server = express.Router();
const connectHelper = require('../scripts/ConnectHelper');
const accountHelper = require('../scripts/AccountHelper');

server.post('/', function (req, res) {
    const userName = req.body.userName;
    const password = req.body.password;
    const queryString = `select * from users 
        where userName = '${userName}' and password = '${password}'`;
    connectHelper.queryString(queryString, (err, rs) => {
        if (err) {
            return res.json({
                message: err
            })
        }
        else {
            if (rs.length != 0) {
                return res.json({
                    user: rs[0]
                })
            }
            else {
                return res.json({
                    message: 'user not exist'
                })
            }
        }
    })
});

server.post('/registration', function (req, res) {
    const userName = req.body.userName;
    const password = req.body.password;
    const email = req.body.email;
    accountHelper.checkExistAccount(userName, function(err, rs) {
        if (err) {
            return res.json({
                message: err.message
            })
        }
        else {
            if (rs.length != 0) {
                return res.json({
                    message: 'Account exist'
                })
            }
            else {
                accountHelper.addNewAccount(userName, password, email, function(err, rs) {
                    if (err) {
                        return res.json({
                            message: rs.message
                        })
                    }
                    else {
                        accountHelper.checkExistAccount(userName, function(err, rs) {
                            if (err) {
                                return res.json({
                                    message: res.message
                                })
                            }
                            else {
                               if (rs.length != 0) {
                                   return res.json({
                                       user: rs[0]
                                   })
                               }
                            }
                        })
                    }
                })
            }
        }
    })
})

module.exports = server;