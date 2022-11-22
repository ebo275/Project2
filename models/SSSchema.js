const mongoose = require('mongoose')

const Schema = mongoose.Schema

const surfSchema = new Schema({
    name: {type: String},
    coordinates: {type: String},
    description:{type: String},
    idealConditions: {type: String},
    quiverSelection: [{type: String}],
    checkTheCam: {type: String},
    img: {type: String}

})

const SurfSpot = mongoose.model('SurfSpot', surfSchema)
module.exports = SurfSpot