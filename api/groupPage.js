const users_query = require('../models/users')
const groups_query = require('../models/groups')
const Group = require('../models/groups');
const router = require('../routes/users');
var groupController = {};
var results = new Object();
// const shortid = require('shortid');
// shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
// shortid.length = 5;
groupController.showGroup = function(req, res){  // show group할 때 즐겨찾기 그룹도 보여줘야겠다 !! 
    
    const myName = { userName : 'DaJin Han'};
    users_query.find(myName).select('-_id groupId').exec((err, groupid) => { // 내가 속한 그룹 리스트 
        //console.log("groupId : ", groupid); //{ groupId: [ 1, 2 ], _id: 602ab13365f8a45bebc4a8c7 }
        groupid.forEach(function(gi, ii) {
            gi['groupId'].forEach(function(gg, ii){
                // group id 1,2 에 대해 그룹 이름 찾기 
                console.log(gg); //gg :  1, gg :  2

                //그룹 이름 찾기 
                groups_query.find({groupId : gg}).select('-_id groupName').exec((err, groupname) => {
                    //console.log(groupname);
                    groupname.forEach(function(gn, ii){
                        console.log(gn['groupName']); //2020_madCamp, 새해
                    }) 
                })
                // 사용자 id 찾기 
                groups_query.find({groupId : gg}).select('-_id userId').exec((err, userid) => {
                    console.log(userid[0]);
                    userid.forEach(function(ui, ii){
                        console.log(ui['userId']);
                        ui['userId'].forEach(function(uuii){
                            console.log(uuii); //1, 2, 3, 4

                            //find user Name 
                            users_query.find({userId: uuii}).select('-_id userName').exec((err, username) => {
                                    console.log(username[0]['userName']);
                                })
                            // users_query.find({userId : uuii}).exec((err, username) => {
                            //     console.log("userid :", username);
                            // })
                        })
                    }) 
                })
            })
        })

    })
}

groupController.showGroupImage = function(req, res){

}

groupController.makeGroup = function (req, res){
    //if 사용자 input 그룹 확인버튼 누르면 
    const myName = { userName : 'DaJin Han'};
    //if input 받은 그룹번호가 null이 아니라면 그리고 그룹 만들기 버튼 누르면
    const group_Name = {groupName: "힐링 모임"};
    var userId = users_query.findOne(myName).select('-_id userId');
    try{
    userId.exec(function(err, userid){
        const group = new Group({
            groupId: "10",
            groupName: group_Name['groupName'],
            userId: userid['userId'],
            groupImageUrl: "hsklwe"
        })
        const newGroup = group.save()
        res.status(201).json(newGroup)
        })
    }catch (err) {
        res.status(400).json({ message: err.message })
    }
}

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

groupController.exitGroup = function(req, res){
    //if 사용자가 롱 클릭 시 그룹 탈퇴 
    const myName = { userName : 'DaJin Han'};
    const group_Name = {groupName: "2020_madCamp"};
    var groupId = groups_query.findOne(group_Name).select('-_id groupId');
    var userId = users_query.findOne(myName).select('-_id userId');
    
    groups_query.findOne(group_Name).select('-_id userId').exec()
    .then((userid) =>{
        
        var userIdCount = userid['userId'].length;
        if(userIdCount == 1){
            console.log("1 user")
             groupId.exec(function(err, groupid){
                const delete_query = groups_query.remove({'groupId' : groupid[0]['groupId']});
                delete_query.exec();
                console.log("delete group ", groupid['groupId'])
                //console.log(groupid[0]['groupId']);
            }) 
        }else{
            ///userid['userId'].push("AAAAA"); 사용자 추가 with 사용자 id 
             //group userid 배열에서 user delete 
            // ["AABBC","ABABC","DAEAE","ABECA"]
            groupId.exec((err, groupid) =>{
                console.log("groupId groupId : ", groupid);
                // groups_query.findOne(group_Name).exec((err, group_user) => {
                //     console.log("groups : ", group_user);
                //groups_query.updateOne(group_Name, { $addToSet: {userId : "DDFFD"}}).exec();
                userId.exec((err, myuserid) => {
                    console.log(myuserid['userId']);
                    groups_query.updateOne(group_Name, { $addToSet: {userId : myuserid['userId']}}).exec();
                    //groups_query.updateOne(group_Name, { $pull: {userId : myuserid['userId']}}).exec();
                })

            })

            
        }
    })

    

     
    
}

groupController.showStarGroup = function(req, res){

}

module.exports = groupController

