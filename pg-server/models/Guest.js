const mongoose = require('mongoose')

const GuestSchema = new mongoose.Schema({
    username: String,
    password: String,
    confirmPassword:String
})

const GuestModel = mongoose.model("Guests", GuestSchema)
module.exports = GuestModel