const mongoose = require('mongoose')
var Schema = mongoose.Schema

//define schema
const usersSchema = new Schema({
    //_id: Schema.Types.ObjectId,
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    
    userName: {
        type: String,
        required:true
    },
    
    userPWD: {
        type: String,
        required: true
    },
  
    groupId: {
       //type: [groupsSchema]
       type: [String]
    },
    starGroup: {
        type: [{ IamgeUrl: String, folderId: Number }]
    },
    invitee : { // 초대 한 사람, 초대 한 그룹
        type: [{ userId : Number, groupId: Number}]
    }
    // , invitor : {
    //     type: [{ userId : Number, groupId: Number}]
    // }

})

// //Create new user document
// usersSchema.statics.create = function(payload){
//     const user = new this(payload)
//     return user.save()
// }

// //find all
// usersSchema.statics.findAll = function(){
//     return this.find({})
// }

// //find one by userId
// usersSchema.statics.findOneById = function(userId){
//     return this.findOneById({userId})
// }

// // Update by userId
// usersSchema.statics.updateById = function (userId, payload) {
//     // { new: true }: return the modified document rather than the original. defaults to false
//     return this.findOneAndUpdate({ userId }, payload, { new: true });
// }

// // Delete by userId
// usersSchema.statics.deleteById = function (userId) {
//     return this.remove({ userId });
// }


// //create document 
// // var random = 0;

//const doc = new Users()

// usersSchema.statics.findByUsername = function(username){
//     return this.findOne({'userName' : userName}).exec()
// }

// let username = await users.findByUsername('SoJeong Jo');
//username = username.concat(await users.findByUsername(''))

// //create model
// var users_query = mongoose.model('Users', usersSchema)
// usersSchema.query.byName = function(name){
//     return this.where({name : new RegExp(name, 'i')})
// }
// // users_query.find().byName('SoJeong Jo').exec((err, users) =>{
// //     console.log(users);
// // })

// users_query.find({'userName' : 'DaJin Han'}).select('groupId').exec((err, username) =>{
//     console.log(username);
//     return;
// })


module.exports = mongoose.model('Users', usersSchema)