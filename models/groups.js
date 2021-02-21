const mongoose = require('mongoose')
var Schema = mongoose.Schema
const usersSchema = require('./users').schema
const foldersSchema = require('./folders').schema

const groupsSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    groupId: {
        type: String, 
        unique : true
    },

    groupIamge: {
        type: String,
    },

    groupName: {
        type: String,
    },
  
    userId: { // userSchema의 id 값 array형태로 가져오기
        type: [String]
    },

    folderId: { // folderSchema의 id 값 array로 가져오기
        type: [String]
    }, 
    groupImageUrl: {
        type: String
    }
    
})

module.exports = mongoose.model('Groups', groupsSchema)