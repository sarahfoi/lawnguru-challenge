const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ownerSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, 
{
    timestamps: true
})

const Owner = mongoose.model('Owner', ownerSchema)

module.exports = Owner