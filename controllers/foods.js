const express = require('express');
const router = express.Router();

const Food = require('../models/food.js')
const User = require('../models/user.js');

// Index
router.get('/', async (req, res) => {
    try {
      const foods = await Food.find({ pantry: req.session.user._id})
      res.render('foods/index.ejs', { foods })
    }   catch (error) {
      console.error(error)
      res.redirect('/')
    }
});
// Create
router.post('/', async (req, res) => {
    try {
      const {name} = req.body
      const newFood = new Food({
        name,
        pantry: req.session.user._id
      })
      await newFood.save();
      res.redirect(`/users/${currentUser._id}/foods`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
  });
// New
router.get('/new', async (req, res) => {
    res.render('foods/new.ejs');
  });
  
router.get('/:foodId', async (req, res) => {
  try {
      const food = await Food.findById(req.params.foodId).populate("pantry")
              res.render('foods/show.ejs', { food, sessionOwner: req.session.user })
  } catch (error) {
      console.error(error)
      res.redirect(`/users/${req.session.user._id}/foods`)
  }
});


  

// Edit
router.get('/:foodId/edit', async (req, res) => {
  try {
    const food = await Food.findById(req.params.foodId);
    if (!food) {
      return res.redirect(`/users/${req.session.user._id}/foods`)
    }
    res.render('foods/edit.ejs', { food });
  } catch (error) {
    console.error('Error grabbing dish for edit:', error);
    res.redirect(`/users/${req.session.user._id}/foods`)
  }
});

// Update
router.put('/:foodId', async (req, res) => {
  try {
    const { name } = req.body
    await Food.findByIdAndUpdate(req.params.foodId, { name })
    res.redirect(`/users/${req.session.user._id}/foods`)
} catch (error) {
    console.error('Error updating food:', error)
    res.redirect(`/users/${req.session.user._id}/foods`)
}
});

// Delete
router.delete('/:foodId', async (req, res) => {
try {
    await Food.findByIdAndDelete(req.params.foodId)
    res.redirect(`/users/${req.session.user._id}/foods`)

} catch (error) {
    console.log(error);
    res.redirect('/')
}
});

module.exports = router;