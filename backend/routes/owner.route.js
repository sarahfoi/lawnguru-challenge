const router = require('express').Router()
let Owner = require('../models/owner.model')

router.route('/login').post((req,res) => {
    Owner.findOne({username: req.body.username, password: req.body.password})
        .then(owner => {
            if(owner){
                res.status(200).json({token:"teste"})
            }
            else{
                res.status(400).json({error: 'Invalid username/password.'})
            }
        })
        .catch(error => res.status(400).json({error: 'Invalid username/password.'}))
})


module.exports = router