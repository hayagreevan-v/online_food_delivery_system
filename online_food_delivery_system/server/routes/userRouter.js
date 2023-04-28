const express = require('express')

const router = express.Router()

const User = require('../models/userModel')

router.post('/create-user', async(req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        _id: req.body._id,
    });

    try {
        const savedUser = await user.save();
        res.status(200).send({ data: savedUser });
    } catch (err) {
        res.status(400).send({ error: err });
    }    
})


module.exports = router