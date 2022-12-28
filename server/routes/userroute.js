let express = require('express')
let userroute = express.Router()



let asynchandler = require('express-async-handler')
let User = require('../model/usermodel')

let generatetoken = require('../util/generatetoken')
let bcrypt = require('bcryptjs')



let protect = require('../middleware/authmiddleware')
// userroute.get('/',(req,res)=>{

//   res.send('hello')
// })

userroute.post('/register', asynchandler(async(req,res)=>{
    let { name, email, password} = req.body
    
    //  console.log(req.body)
    if(!name || !email || !password){
  //   res.send('please enter the required fields')
    res.status(401)
    throw new Error('please enter the required fields') 
  }
    else {   
      let reguser = await User.findOne({ email:email})
      if(!reguser){
          let salt = await bcrypt.genSalt(10)
          let haspwd = await bcrypt.hash(password, salt)
          let user = await User.create({
               
               name,
               email,
               password:haspwd,       
            //    picture:pictur != null ? pictur.url : 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
              })
      if(user){
      res.json({
        _id:user._id,
        
        
        name: user.name,
        email: user.email,
        token: generatetoken(user._id),
      })  
    }
    else {
      res.status(401)
      throw new Error('user can not be saved')
    }
     
  
  
  }    
      else{
          res.status(400)
          
          throw new Error('user has already signed up')
        }
    }
  }))


userroute.post('/login', asynchandler(async(req,res)=>{
    let {email, password} = req.body
    
    if(!email || !password){
    res.status(400)
    throw new Error('please enter the required fields')  
    }
    else {
      let user = await User.findOne({email})
      if(user && await bcrypt.compare(password, user.password)){
          res.json({
            _id:user._id,
            name:user.name,    
            email:user.email,
            token: generatetoken(user._id),
    
            userphoto:user.picture
          })    
      }
      else {
        
        res.status(401)
        throw new Error('wrong credentials')
      }
    }
    }))  

userroute.get('/', protect,async(req,res)=>{
  
  let keyword = req.query.username ? {
     $or:[
      
       {name: { $regex: req.query.username, $options:'i'}},
       {email: { $regex: req.query.username, $options:'i'}}
     ]
     } : {} 
     let loginuser = req.user._id
     let userlist = await User.find(keyword).find({_id:{$ne:loginuser}})
    //  .skip(page * userperpage).limit(userperpage)
     res.send(userlist)    
   })




userroute.get('/page', async(req,res)=>{
 let page = req.query.page ? req.query.page : 0  
 let userperpage = 2
//  let loginuser = req.user._id
    
 
 let userlist = await User.find()
 .skip(page * userperpage)
 .limit(userperpage)
     res.send(userlist)
})   
module.exports = userroute