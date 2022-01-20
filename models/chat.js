const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    personId: { type: mongoose.Types.ObjectId, ref: 'User' },
    msg: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model('Chat', chatSchema)