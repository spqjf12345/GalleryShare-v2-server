const users_query = require('../models/users')
var userController = {};

//var users_query = mongoose.model('Users', usersSchema)

// userController.checkValid = function(req, res){ 
//     const cmpName = { userName : 'DaJin Han'};
//     const cmpPWD = {userPWD : '97531'};
//     //login button 눌렀을 때 
//     users_query.findOne(cmpName).countDocuments().exec((err, name) =>{
//         users_query.findOne(cmpPWD).countDocuments().exec((err, pwd) =>{
//             if(name && pwd == 1){
//                 console.log("name, pwd" , name + " " + pwd);
//                 console.log("유효한 아이디입니다.") // 창 넘기기 
//             }else{
//                 console.log('다시 입력해주세요')
//             } 
//         })
//     }) 
// }

// userController.signUp = function(req, res){ 
//     const cmpName = { userName : 'SoJeong Jo'};
//     const cmpPWD = {userPWD : '12'};
    

//     //register button 눌렀을 때 post 해야 함 
//     const newUser = new User({
		
// 		userId: req.body.userId, // 랜덤한 5개의 스트링 숫자 넘겨받기 
// 		userName: req.body.userName,
// 		userPWD: req.body.userPWD,
// 		groupId: req.body.groupId
// 	  })

     
// }

module.exports = userController

