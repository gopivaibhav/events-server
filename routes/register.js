const router=require('express').Router()
const userModel=require('../models/user')

router.post('/',async(req,res)=>{
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
        res.status(400).send(e)
    }
})



module.exports=router