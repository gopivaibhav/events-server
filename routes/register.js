const router = require('express').Router()
const userModel = require('../models/user')

router.post('/', async (req, res) => {
    const obj = await userModel.find({ email: req.body.email })
    if (obj.length === 0) {
        let user = ''
        if (req.body.googleId) {
            user = new userModel({
                fName: req.body.fName,
                lName: req.body.lName,
                email: req.body.email,
                password: req.body.password,
                googleId: req.body.googleId,
                imageUrl: req.body.imageUrl
            })
        } else {
            user = new userModel({
                fName: req.body.fName,
                lName: req.body.lName,
                email: req.body.email,
                password: req.body.password
            })
        }
        try {
            await user.save()
            res.send({ "error": "User created succesfully" })
        } catch (e) {
            res.send({ 'error': e })
        }
    } else if (obj[0].googleId) {
        obj[0].password = req.body.password
        try {
            await obj[0].save()
            res.send({ 'error': "Added password to your account", "user": obj[0] })
        } catch (e) {
            res.status(400).send({ "error": e })
        }
    } else {
        obj[0].googleId = req.body.googleId
        obj[0].imageUrl = req.body.imageUrl
        try {
            await obj[0].save()
            res.send({ 'error': "User already exists with this email", "user": obj[0] })
        } catch (e) {
            res.status(400).send({ "error": e })
        }
    }
})


module.exports = router