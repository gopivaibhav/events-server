const router=require('express').Router()
const userModel=require('../models/user')

router.post('/',async(req,res)=>{
    try {
        const user=await userModel.find({
            email:req.body.email
        })
        if(user[0]===undefined){
            res.status(404).send('No email found')
        }else{
            if(user[0].password===req.body.password){
                res.send('LoggedIN succesfully')
            }else{
                res.status(401).send('Wrong Password')
            }
        }
    } catch (e) {
        res.status(400).send(e)
    }
})



module.exports=router