const mongoose = require('mongoose')

const textSchema = mongoose.Schema({
    senderId: { type: mongoose.Types.ObjectId, ref: 'User' },
    receiverId: { type: mongoose.Types.ObjectId, ref: 'User' },
    msg: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model('Texting', textSchema)