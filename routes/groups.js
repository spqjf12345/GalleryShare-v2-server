const express = require('express')
const router = express.Router()
const Group = require('../models/groups')
const Folder = require('../models/folders')

const users_query = require('../models/users')
const groups_query = require('../models/groups')

var query_groups = require('../api/groupPage')
var query_users = require('../api/groupPage')

router.get('/showGroup', query_groups.showGroup);

//router.post('/makeGroup', query_groups.makeGroup);

//getting all
router.get('/', async(req, res) => {
    try{
        const groups = await Group.find()
        res.json(groups)
    }catch(err){
        res.status(500).json({ message: err.message })    
    }  
})

//getting one
router.get('/:id', getGroup, (req, res)=> {
	console.log(res.group)
    res.json(res.group)
})

//create one
//var groupId = 0;
router.post('/', async (req, res) => {
	const myName = { userName : 'DaJin Han'};
    //if input 받은 그룹번호가 null이 아니라면 그리고 그룹 만들기 버튼 누르면
    var group_Name = "힐링 모임";

	var userid = '';
	const query = users_query.find(myName).select('-_id userId')
	var result = await query.exec((err, userid) => {
		console.log("makeGroup: " , userid[0]['userId']);
        userid = userid[0]['userId'];
		console.log(userid);
	})

	console.log(userid);

	const group = new Group({
		groupId: "10", 
		groupName: group_Name,
		userId: userid // 왜 밖으로 나가면 얘가 죽어버리지 ?? 
		//빈칸이 저장된다.. 
		//,folderId: req.body.folderId
	  })

	const newGroup = await group.save()
	res.status(201).json(newGroup)

	// const group = new Group({
	// 	groupId: "10", 
	// 	groupName: group_Name,
	// 	userId: userid,
    //     //folderId: req.body.folderId
	//   })

	//   try {
	// 	const newGroup = await group.save()
	// 	res.status(201).json(newGroup)
	//   } catch (err) {
	// 	res.status(400).json({ message: err.message })
	//   }
})

//updateing one
router.patch('/:id', getGroup, async (req, res) =>{
	if (req.body.groupName != null) {
		res.group.groupName = req.body.groupName
	  }
	if(req.body.userId != null){
		res.group.userId = req.body.userId
	}
    if(req.body.folderId != null){
		res.group.folderId = req.body.folderId
	}
	
	try {
		const updatedGroup = await res.group.save()
		res.json(updatedGroup)
	} catch (err) {
		res.status(400).json({ message: err.message })
	}
})

//deleting one 
router.delete('/:id', getGroup, async (req, res) =>{
	try {
		await res.group.remove()
		res.json({ message: 'Deleted Group' })
	  } catch (err) {
		res.status(500).json({ message: err.message })
	  }
})

async function getGroup(req, res, next) {
	let group
	try {
		group = await Group.findById(req.params.id)
		if (group == null) {
			return res.status(404).json({ message: 'Cannot find group' })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.group = group
	next()
}

module.exports = router