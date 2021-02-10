const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    userId: {
        type: String,
        required:true
    },
    
    userPWD: {
        type: String,
        required: true
    },
  
    //groupid: [Number]
    
})

module.exports = mongoose.model('Users', usersSchema)