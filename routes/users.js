const express = require('express')
const router = express.Router()
const User = require('../models/users')

//getting all
router.get('/', async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }catch(err){
        res.status(500).json({ message: err.message })    
    }  
})

//getting one
router.get('/:id', getUser, (req, res)=> {
	console.log(res.user)
    res.json(res.user)
})

//create one
router.post('/', async (req, res) =>{
	const user = new User({
		userId: req.body.userId,
		userPWD: req.body.userPWD
		//: req.body.subscribedToChannel
	  })
	  try {
		const newUser = await user.save()
		res.status(201).json(newUser)
	  } catch (err) {
		res.status(400).json({ message: err.message })
	  }
})

//updateing one
router.patch('/:id', getUser, async (req, res) =>{
	if (req.body.userId != null) {
		res.user.userId = req.body.userId
	  }
	if(req.body.userPWD != null){
		res.user.userPWD = req.body.userPWD
	}
	  
	  try {
		const updatedUser = await res.user.save()
		res.json(updatedUser)
	  } catch (err) {
		res.status(400).json({ message: err.message })
	  }
})

//deleting one 
router.delete('/:id', getUser, async (req, res) =>{
	try {
		await res.user.remove()
		res.json({ message: 'Deleted User' })
	  } catch (err) {
		res.status(500).json({ message: err.message })
	  }
})

async function getUser(req, res, next) {
	let user
	try {
		user = await User.findById(req.params.id)
		if (user == null) {
			return res.status(404).json({ message: 'Cannot find user' })
		}
	} catch (err) {
		return res.status(500).json({ message: err.message })
	}
	res.user = user
	next()
}

module.exports = router