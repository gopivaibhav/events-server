const router=require('express').Router()
const userModel= require('../models/user')

router.get('/',async(req,res)=>{
    try {
        const people=await userModel.find()
        res.send({'people':people})
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/:id',async(req,res)=>{
    try {
        const people=await userModel.find({_id:req.params.id})
        res.send(people[0])
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports=router