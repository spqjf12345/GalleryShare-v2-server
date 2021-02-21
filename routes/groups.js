const express = require('express')
const router = express.Router()
const Group = require('../models/groups')
const Folder = require('../models/folders')

const users_query = require('../models/users')
const groups_query = require('../models/groups')

var query_groups = require('../api/groupPage')
var query_users = require('../api/groupPage')

router.get('/showGroup', query_groups.showGroup);
router.post('/makeGroup', query_groups.makeGroup);
router.get('/exitGroup', query_groups.exitGroup);



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
	const group = new Group({
		groupId: req.body.groupId, 
		groupName: req.body.groupName,
		userId: req.body.userId, 
		folderId: req.body.folderId
	  })

	  try {
		const newGroup = await group.save()
		res.status(201).json(newGroup)
	  } catch (err) {
		res.status(400).json({ message: err.message })
	  }
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