const router = require('express').Router()
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

router.post('/', async(req, res) => {
    try {
        const user = await userModel.find({
            email: req.body.email
        })
        if(user[0] === undefined){
            res.send({'error': "No user found"})
        }else{
            if(user[0].password === req.body.password){
                const token = jwt.sign({_id: user[0]._id}, process.env.JWT_SECRET)
                res.send(token)
            }else{
                res.send({'error': "Wrong Password"})
            }
        }
    } catch (e) {
        res.status(400).send(e)
    }
})


module.exports = router