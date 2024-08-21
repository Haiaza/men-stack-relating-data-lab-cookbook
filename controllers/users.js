const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Food = require('../models//food.js')
const { default: mongoose } = require('mongoose');

// Index
router.get('/', async (req, res) => {
  try {
    const user = req.session.user
    const foundUser = await User.findById(user._id)

    res.render('users/index.ejs')
  } catch (error) {
    
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

    res.render('users/show.ejs', {
      user
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

module.exports = router;