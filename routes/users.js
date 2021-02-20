const express = require('express')
const router = express.Router()
const User = require('../models/users')
var query_users = require('../api/login')



router.get('/checkValid', query_users.checkValid);

//find all
router.get('/', async (req, res) => {
    try{
        const users = await User.find()
		console.log(res.user)
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

	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = 5;
	for ( var i = 0; i < charactersLength; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	//var user_id = res.body.userId;
	//const user_Name = 'SoJeong Jo';
    //const user_PWD = '1225';
	// const newUser = await User.create(
	// 	{ groupId : req.body.groupId },
	// 	{ userId : await makeRandomId() }, 
	// 	{ userName: req.body.userName },
	// 	{ userPWD: req.body.userPWD }
	// )
	
	const user = new User({
		groupId: req.body.groupId,
		userId : result,
		userName: req.body.userName,
		userPWD: req.body.userPWD
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
	if (req.body.userName != null) {
		res.user.userName = req.body.userName
	  }
	if(req.body.userPWD != null){
		res.user.userPWD = req.body.userPWD
	}  
	if(req.body.groupId != null){
		res.user.groupId = req.body.groupId
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


// function makeRandomId() {
// return new Promise(function(resolve, reject) {
// 	var result           = '';
// 	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// 	var charactersLength = 5;
// 	for ( var i = 0; i < charactersLength; i++ ) {
// 	result += characters.charAt(Math.floor(Math.random() * charactersLength));
// 	}
// 	resolve(result);
// });
// }

// async function makeRandomId(){
// 	var result           = '';
// 	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// 	var charactersLength = 5;
// 	for ( var i = 0; i < charactersLength; i++ ) {
// 	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
// 	}
// 	return result;
// }

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