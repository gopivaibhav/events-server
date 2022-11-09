const mongoose = require('mongoose')

const feedSchema = mongoose.Schema({
    personId: { type: mongoose.Types.ObjectId, ref: 'User' },
    content: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    },
    registration:{
        type: String,
        required: true
    }

})
module.exports = mongoose.model('Feed', feedSchema)