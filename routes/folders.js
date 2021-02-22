const express = require('express')
const router = express.Router()
const Folder = require('../models/folders')
const Group = require('../models/groups')
const User = require('../models/users')
// const Group = require('../models/groups')
// const User = require('../models/users')

// var query_folder = require('../api/folderPage')
// var query_users = require('../api/folderPage')

//router.get('/showUserName', query_folder.showUserName);
//get 
// folderController.showUserName = function(req, res){
//     //클릭 해 그룹 들어갔을 때 group id 값 찾기 --> 몰입 캠프라는 그룹 -> id 받아오기 
//     const getGroupId = {groupId : '1'}; // 몰입캠프
//     const myName = { userName : 'DaJin Han'};
//     groups_query.find(getGroupId).select('userId').exec((err, userid)=>{
//         //console.log(userid[0]['userId']);
//         userid[0]['userId'].forEach(function(un, ii){
//             //console.log(un); // AABBC, ABABC, DAEAE, ABECA
//             users_query.find({'userId': un}).select('userName').exec((err, userName) => {
//                 console.log(userName[0]['userName']) //JungIn Lee, HeeJay Gong, DaJin Han, SoJeong Jo
//             })
//         })
//     })
// }

router.get('/showUserName/:forler_id',showUser, function(req, res){ // 
	//console.log("id는 " + req.params.id + " 입니다")
	//res.json("showUser : ", res.user_name)
})

router.get('/showFolder/:group_id', showFolder, function(req, res){

 })

// router.get('/showFolder', query_folder.showFolder);
// router.get('/showFolderImage', query_folder.showFolderImage);

router.post('/makeFolder/:groupId/:folder_name/:folder_location', async function(req, res){

	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTU012VWXYZabcdefghijklmnopqrstuvwxyz3456789';
	var charactersLength = 3;
	for ( var i = 0; i < charactersLength; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	const folder = new Folder({
		folderId: result, 
		folderName: req.params.folder_name,
		location: req.params.folder_location,
        groupId: req.params.groupId
	  })

	  try {
		const newFolder = await folder.save()
		res.status(201).json(newFolder)
	  } catch (err) {
		res.status(400).json({ message: err.message })
	  }
	

})



//getting all
router.get('/', async function(req, res){
    try{
        const folders = await Folder.find()
        res.json(folders)
    }catch(err){
        res.status(500).json({ message: err.message })    
    }  
})

//getting one
router.get('/:id', getFolder, (req, res)=> {
	console.log(res.folder)
    res.json(res.folder)
})

//create one
router.post('/', async (req, res) =>{
	const folder = new Folder({
		folderId: req.body.folderId, 
		folderName: req.body.folderName,
		location: req.body.location,
        imageUrl: req.body.imageUrl,
        userId: req.body.userId,
        groupId: req.body.groupId
	  })

	  try {
		const newFolder = await folder.save()
		res.status(201).json(newFolder)
	  } catch (err) {
		res.status(400).json({ message: err.message })
	  }
})

//updateing one - foldername edit or folder location edit 
router.patch('/:id', getFolder, async (req, res) =>{
	if (req.body.folderName != null) {
		res.folder.folderName = req.body.folderName
	  }
	if(req.body.location != null){
		res.folder.location = req.body.location
	}
    if(req.body.imageUrl != null){
		res.folder.imageUrl = req.body.imageUrl
	}
    if(req.body.userId != null){
		res.folder.userId = req.body.userId
	}
    if(req.body.groupId != null){
		res.folder.groupId = req.body.groupId
	}
	
	  
	  try {
		const updatedFolder = await res.folder.save()
		res.json(updatedFolder)
	  } catch (err) {
		res.status(400).json({ message: err.message })
	  }
})


//deleting one - folder_id
router.delete('/:folder_id', getFolder, async (req, res) =>{
	try {
		await res.folder.remove()
		res.send("true");
		res.json({ message: 'Deleted Folder' })
	  } catch (err) {
		res.send("false");
		res.status(500).json({ message: err.message })
	  }
})



function showFolder(req, res){
	//group에 속한 folder array 돌면서 리스트 
	console.log(req.params.group_id);
	var folderId = Group.findOne({'groupId': req.params.group_id}).select('-_id folderId');
	folderId.exec(function(err, folderID){
		folderID['folderId'].forEach(function(fi){
		Folder.findOne({'folderId' : fi}).exec(function(err, folder){
			console.log(folder);
		});
	})
})
	
}


function showUser(req, res){
	console.log("showUser typeod : ",  typeof req.params.id); // string
	var folderToGroupId = Folder.findOne({folderId : req.params.id}).select('-_id groupId')
	var groupID = Group.findOne(folderToGroupId)
	var usersID = Group.findOne(groupID).select('userId')

	folderToGroupId.exec(function (err, folderID) {
		//console.log("folderToGroupId : ", folderID);
	});
	usersID.exec(function(err, usersID){
		usersID['userId'].forEach(function(ui){
			User.findOne({'userId': ui}).select('userName').exec(function(err, userName){
				res.user_name = userName
				//this : { _id: 603095685916906f673e6fba, userName: 'JungIn Lee' }
				console.log("userName : " , userName);
			})
		})	
	})
}

async function getFolder(req, res, next) {
	let folder
	try {
		folder = await Folder.findOne({"folderId" : req.params.folder_id})
		if (folder == null) {
			return res.status(404).json({ message: 'Cannot find folder' })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.folder = folder
	next()
}

module.exports = router