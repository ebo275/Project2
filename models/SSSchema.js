const mongoose = require('mongoose')


const surfSchema = new mongoose.Schema({
    name: String,
    image: String,
    coordinates: String,
    description: String,
    idealConditions: String,
    quiverSelection: [String],
    checkTheCam: String,
    

})

const SurfingSpot = mongoose.model('SurfingSpot', surfSchema)
module.exports = SurfingSpot