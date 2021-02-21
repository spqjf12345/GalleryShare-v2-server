const users_query = require('../models/users')
const groups_query = require('../models/groups')
const folders_query = require('../models/folders')
var folderController = {};

//get
folderController.showFolder = function(req, res){
    const getGroupId = {groupId : '1'}; // 몰입캠프
    groups_query.find(getGroupId).select('folderId').exec((err, folderid) => {
        //console.log(folderid[0]['folderId'])
        folderid[0]['folderId'].forEach(function(fi, ii){
            const folderId = {folderId : fi};

            //folderName - 마지막 날 
            folders_query.find(folderId).select('folderName').exec((err, folder) => {
                console.log(folder[0]['folderName']);
            })
            //location - 대전 유성구 
            folders_query.find(folderId).select('location').exec((err, location) => {
                console.log(location[0]['location']);
            })

        })
    })
}

//get 
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
//get 
folderController.showFolderImage = function(req, res) {
    const getGroupId = {groupId : '1'}; // 몰입캠프
    groups_query.find(getGroupId).select('folderId').exec((err, folderid) => {
        //console.log(folderid[0]['folderId'])
        folderid[0]['folderId'].forEach(function(fi, ii){
            const folderId = {folderId : fi};

            //folderImage 배열의 첫번째 값  --> whkldflw image url
            folders_query.find(folderId).select('imageUrl').exec((err, folderImage) => {
                console.log(folderImage[0]['imageUrl'][0]);
            })
        })
    })
}

//post 
folderController.makeFolder = function(req, res) {
}



module.exports = folderController