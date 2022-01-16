const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    fName:{
        type:String,
        required:true 
    },
    lName:{
        type:String,
        required:true 
    },
    email:{
        type: String,
        required:true 
    },
    password:{
        type: String,
    },
    imageUrl:{
        type: String,
    },
    googleId:{
        type: String,
    },
})
module.exports = mongoose.model('User',userSchema)