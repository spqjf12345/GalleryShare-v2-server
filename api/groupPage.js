const users_query = require('../models/users')
const groups_query = require('../models/groups')
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

// groupController.makeGroup = async function (req, res){
//     //if 사용자 input 그룹 확인버튼 누르면 
//     const myName = { userName : 'DaJin Han'};
//     //if input 받은 그룹번호가 null이 아니라면 그리고 그룹 만들기 버튼 누르면
//     const group_Name = {groupName: "힐링 모임"};
//     var userid = '';
//     //find user id -> 4
//     users_query.find(myName).select('-_id userId').exec((err, userid) => {
//         console.log("makeGroup: " , userid[0]['userId']);
//         userid = userid[0]['userId'];
//     })

//     const group = new group({
//         groupId: "10",
//         groupName: group_Name,
//         userId: userid[0]['userId'], // 추가한 사용자
//     })
//     try {
//         const newGroup = await group.save()
//         res.status(201).json(newGroup)
//   } catch (err) {
//         res.status(400).json({ message: err.message })
//   }
// }

groupController.exitGroup = function(req, res){
    //if 사용자가 롱 클릭 시 그룹 탈퇴 

     
    
    }

module.exports = groupController

