// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

//Index
router.get('/', async (req, res) => {
    const userPantry = await User.findOne({_id: req.params.id}).populate('pantry')
    console.log('Working?')
    res.render('foods/index.ejs', {
        items: userPantry,
    })
})

//New
router.get('/new', (req, res) =>{
    res.render('new.ejs')
    console.log('new page')
})

// Create
router.post(`/users/:userId/foods`, async (req, res) => {
    try {
        const foundUser = await User.findById(req.session.user._id)
        console.log(foundUser)
        foundUser.pantry.push(req.body)
        await foundUser.save() 
        console.log(`Item added`)
        res.redirect('/')
    } catch (error) {
        console.log('Error Adding an item')
        res.redirect('/')
    }
})
module.exports = router;
