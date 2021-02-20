const mongoose = require('mongoose')
var Schema = mongoose.Schema
const usersSchema = require('./users').schema
const groupsSchema = require('./groups').schema

const foldersSchema = new Schema({
    //_id: Schema.Types.ObjectId,

    folderId: {
        type: String,
        required: true
    },

    folderName: {
        type: String,
        required: true
    }, 

    location: {
        type: String,
        required: true
    }, 

    imageUrl:{
        type: [String]
    },

    userId: [String]
        // userSchema의 id 값 array형태로 가져오기 -> 속한 사용자 알기 위해
        //type: [usersSchema]
        //type: [Schema.Types.ObjectId], ref: 'Users'
        //default:[]
    ,
    groupId: [String],
        //type: [groupsSchema]
        //type: [Schema.Types.ObjectId], ref: 'Groups'
        //default:[],
    //date: [Date]
})

module.exports = mongoose.model('Folders', foldersSchema)