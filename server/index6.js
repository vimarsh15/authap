let express = require('express')


let app = express()
let cors = require('cors')
let mongoose = require('mongoose')
const userrouter = require('./routes/userroute')
// let chatroute = require('./routes/chatroute')
app.use(cors())



mongoose.connect('mongodb+srv://talkative:u7ONdc9zERIoXNMZ@cluster0.fub93zf.mongodb.net/?retryWrites=true&w=majority').then(()=>{
console.log('db connected')  
}).catch((err)=>{
     console.log(err) 
})



app.use(express.urlencoded({limit: "50mb", extended: false}))
app.use(express.json()) 


app.use('/api/user', userrouter)
app.use((err, req,res,next)=>{
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
       message:err.message
  })
})







app.listen(3200, console.log('server on'))