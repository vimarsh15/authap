let mongoose = require('mongoose')
let userschema = mongoose.Schema({


  name:{ type:String, required:true},
  email:{ type:String, required:true, unique:true},
  password:{ type:String, required:true},
   
//   picture:{ type:String,default:'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'},
//   isGroupchat:{ type:Boolean, default:false},
  
  
  
//   users:[{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'User'
  

//   }],
//   latestmessage:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'Message'    
  

// },
// groupAdmin:{ 
//     type:mongoose.Schema.Types.ObjectId,
//     ref:'User'    
//  }    
},
{
    timestamps:true
}
)

let User = mongoose.model('User', userschema)



module.exports = User 