const router = require('express').Router()
const userModel = require('../models/user')
const auth = require('./auth')

router.get('/', async (req, res) => {
    try {
        const people = await userModel.find()
        res.send({ 'people': people })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/main', auth, async (req, res) => {
    const people = await userModel.find({ _id: req.userId._id })
    res.send(people[0])
})

router.get('/:id', auth, async (req, res) => {
    try {
        const people = await userModel.find({ _id: req.params.id })
        res.send(people[0])
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router