const mongoose = require('mongoose')

const AdsSchema = new mongoose.Schema({
    image : String
})

module.exports = mongoose.model('Ads', AdsSchema)