const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Food = require('../models//food.js')
const { default: mongoose } = require('mongoose');

// Index
router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    res.render('users/index.ejs', { users })
  } catch (error) {
    console.error(error)
    res.redirect('/')
  }
});

// Show
router.get('/:userId', async (req, res) => {
  try {
    const pageOwner = req.params.userId;
    const userIdobject = new mongoose.Types.ObjectId(pageOwner)
    const user = await User.findById(userIdobject)

    if (!user){
      return res.redirect('/users')
    }

    const userDishes = await Food.find({ pantry: pageOwner })
    res.render('users/show.ejs', {
      user,
      dishes: userDishes
    });
  } catch (error) {
    console.log(error);
    res.redirect('/users')
  }
});

module.exports = router;