const router = require('express').Router()
const chatModel = require('../models/chat')
const auth=require('./auth')

router.post('/msg',auth, async (req, res) => {
    try {
        const chatObj = new chatModel({
            sender: req.body.sender,
            personId:req.userId._id,
            msg: req.body.msg,
            time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })
        })
        await chatObj.save()
        res.send(chatObj)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.get('/view', auth, async (req, res) => {
    try {
        const getObj = await chatModel.find({ personId:req.userId._id }).populate({ path: 'personId', select: ['fName', 'lName'] })
        if(getObj.length==0){
            res.send('NTG')
        }else{
            res.send(getObj)
        }
    } catch (error) {
        res.send(error)
    }
})

module.exports = router