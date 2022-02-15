const router = require('express').Router()
const { update } = require('../models/customer.model')
let Customer = require('../models/customer.model')

router.route('/add').post((req,res) => {    
    const owner = req.body.owner
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const address = {
        country: req.body.address.country,
        state: req.body.address.state,
        city: req.body.address.city,
        street: req.body.address.street,
        zipCode: req.body.address.zipCode
    }

    const newCustomer = new Customer({
        owner,
        firstName,
        lastName,
        email,
        address,
        active: true
    })

    newCustomer.save()
        .then(() => res.status(200).json('Customer added!'))
        .catch(error => res.status(400).json(error))
})

router.route('/owner/:username').get((req,res) => {
    Customer.find({ owner: req.params.username})
        .then(customer => res.status(200).json(customer))   
        .catch(error => res.status(400).json(error))
})

router.route('/:id').get((req,res) => {
    Customer.findById(req.params.id)
        .then(customer => res.status(200).json(customer))   
        .catch(error => res.status(400).json(error))
})

router.route('/:id').delete((req,res) => {
    Customer.findByIdAndDelete(req.params.id)
        .then(customer => res.status(200).json('Customer deleted'))   
        .catch(error => res.status(400).json(error))
})

router.route('/update/:id').post((req,res) => {
    
        const filter = { _id: req.params.id }
        const update = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            active: req.body.active                        
        }

        if(req.body.address){
            update.address = {
                country: req.body.address.country,
                state: req.body.address.state,
                city: req.body.address.city,
                street: req.body.address.street,
                zipCode: req.body.address.zipCode
            }
        }

        Customer.findOneAndUpdate(filter, update, {
            new:true
        })
            .then(() => res.status(200).json('Customer updated'))
            .catch(error => res.status(400).json(error))
})

module.exports = router