const mongoose = require('mongoose')

const Schema = mongoose.Schema

const customerSchema = new Schema({
    owner: { type: String,required: true },
    firstName: { type: String,required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    address: { 
        country: { type: String, required: true },
        state: { type: String, required: true, max: 2 },
        city: { type: String, required: true },
        street: { type: String, required: true },
        zipCode: { type: Number, required: true }
    },
    active: { type: Boolean, required: true }
}, 
{
    timestamps: true
})

const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer