const router=require('express').Router()
const userModel=require('../models/user')

router.post('/',async(req,res)=>{
    const obj=await userModel.find({email:req.body.email})
    if(obj.length===0){
        const user=new userModel({
            fName:req.body.fName,
            lName:req.body.lName,
            email:req.body.email,
            password:req.body.password
        })
        try {
            await user.save()
            res.send(user)
        } catch (e) {
            res.send({'error':e})
        }
    }else{
        res.send({'error':"User already exists with this email"})
    }
    
})



module.exports=router