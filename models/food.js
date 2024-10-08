const mongoose = require('mongoose')


const foodSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true},
    
    pantry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required: true
    }
    })

const Food = mongoose.model('Food', foodSchema)

module.exports = Food