const users_query = require('../models/users')
const groups_query = require('../models/groups')
const folders_query = require('../models/folders')
var folderController = {};
var results = new Object();

folderController.showFolder = function(req, res){
    
}

folderController.showUserName = function(req, res){
    //클릭 해 그룹 들어갔을 때 group id 값 찾기 --> 몰입 캠프라는 그룹 -> id 받아오기 
    const getGroupId = {groupId : '1'}; // 몰입캠프
    const myName = { userName : 'DaJin Han'};
    groups_query.find(getGroupId).select('userId').exec((err, userid)=>{
        //console.log(userid[0]['userId']);
        userid[0]['userId'].forEach(function(un, ii){
            //console.log(un); // AABBC, ABABC, DAEAE, ABECA
            users_query.find({'userId': un}).select('userName').exec((err, userName) => {
                console.log(userName[0]['userName']) //JungIn Lee, HeeJay Gong, DaJin Han, SoJeong Jo
            })
        })
    })
}


module.exports = folderController