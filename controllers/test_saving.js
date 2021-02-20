const mocha = require('mocha')
const assert = require('assert')
const Users = require('../models/users')

describe('Saving records', function(){
    if('Saving a record to the database', function(){
        var random = 0,
        //document create 
        var user = new Users({
        userId : random + 1,
        userName: "cindy",
        userPWD: "0719",
        groupId: [1,2]
        })

    })
    user.save().then(function(){
        assert(user.isNew === false)
        done()
    })
})