// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');


//Index
router.get('/', (req, res) => {``
    res.render('foods/index.ejs')
})

//Create
router.post('/', async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user._id)
    foundUser.pantry.push(req.body)
    await foundUser.save()
    res.redirect('/')
    } catch (error) {
        console.log(error)
    }
})

router.get('/new', (req, res) =>{
    res.render('new.ejs')
})
module.exports = router;

router.get('')