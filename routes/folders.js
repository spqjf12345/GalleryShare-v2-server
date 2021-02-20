const express = require('express')
const router = express.Router()
const Folder = require('../models/folders')
// const Group = require('../models/groups')
// const User = require('../models/users')


var query_folder = require('../api/folderPage')
var query_users = require('../api/folderPage')

router.get('/showUserName', query_folder.showUserName);

//getting all
router.get('/', async(req, res) => {
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

//updateing one
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

//deleting one 
router.delete('/:id', getFolder, async (req, res) =>{
	try {
		await res.folder.remove()
		res.json({ message: 'Deleted Folder' })
	  } catch (err) {
		res.status(500).json({ message: err.message })
	  }
})

async function getFolder(req, res, next) {
	let folder
	try {
		folder = await Folder.findById(req.params.id)
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