const router = require('express').Router()
const textingModel = require('../models/texting')
const auth = require('./auth')

router.get('/:receiverId', auth, async(req, res) => {
    try {
        let obj = await textingModel.find({
            senderId: req.userId._id,
            receiverId: req.params.receiverId
        }).populate({
            path: 'senderId',
            select: ['fName', 'lName'] 
        }).populate({
            path: 'receiverId',
            select: ['fName', 'lName'] 
        })
        let obj2 = await textingModel.find({
            receiverId: req.userId._id,
            senderId: req.params.receiverId
        }).populate({
            path: 'senderId',
            select: ['fName', 'lName'] 
        }).populate({
            path: 'receiverId',
            select: ['fName', 'lName'] 
        })
        obj = obj.concat(obj2)
        obj = obj.sort(function(a, b){
            return a.time.localeCompare(b.time);
        })
        res.send(obj)
    } catch (e) {
        console.log(e);
    }
})

router.post('/', auth, async(req, res) => {
    try {
        const feedObj = new textingModel({
            senderId: req.userId._id,
            receiverId: req.body.receiverId,
            msg: req.body.msg,
            time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false }),
        })
        await feedObj.save()
        res.send("Successs")
    } catch (error) {
        console.log(error)
    }
})

module.exports = router