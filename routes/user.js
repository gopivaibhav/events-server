const router = require('express').Router()
const chatModel = require('../models/chat')
const userModel = require('../models/user')
const auth = require('./auth')

router.post('/addfrnd', auth, async (req, res) => {
    try {
        let obj = await userModel.find({ _id: req.userId._id })
        obj[0].friends.push(req.body.frnd)
        res.send("Added friend")
    } catch (e) {
        console.log(e);
    }
})

router.post('/unfrnd', auth, async (req, res) => {
    try {
        let obj = await userModel.find({ _id: req.userId._id })
        obj[0].friends = obj[0].friends.filter(check => {
            return check !== req.body.frnd
        })
        res.send('Unfriended')
    } catch (e) {
        console.log(e);
    }
})

router.get('/getfrnds', auth, async (req, res) => {
    try {
        let obj = await userModel.find({ _id: req.userId._id })
        res.send(obj[0].friends)
    } catch (e) {
        console.log(e);
    }
})

router.post('/msg', auth, async (req, res) => {
    try {
        const chatObj = new chatModel({
            sender: req.body.sender,
            personId: req.userId._id,
            msg: req.body.msg,
            time: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour12: false })
        })
        await chatObj.save()
        res.send(chatObj)
    } catch (err) {
        res.send(err)
    }
})

router.post('/edit', auth, async (req, res) => {
    try {
        let obj = await userModel.findOneAndUpdate({ _id: req.userId._id }, {
            fName: req.body.fName,
            lName: req.body.lName,
            skills: req.body.skills
        }, { new: true })
        res.send('updated succesfully')
    } catch (e) {
        res.send(e)
    }
})

router.get('/view', auth, async (req, res) => {
    try {
        // const getObj = await chatModel.find({ personId: req.userId._id }).populate({ path: 'personId', select: ['fName', 'lName'] })
        const getObj = await chatModel.find({ personId: req.userId._id })
        if (getObj.length == 0) {
            res.send('NTG')
        } else {
            res.send(getObj)
        }
    } catch (error) {
        res.send(error)
    }
})

router.post('/form', auth, async (req, res) => {
    try {
        let obj = await userModel.findOneAndUpdate({ _id: req.userId._id }, {
            filledForm: req.body.value
        }, { new: true })
        res.send('voted succesfully')
    } catch (e) {
        res.send(e)
    }
})

module.exports = router