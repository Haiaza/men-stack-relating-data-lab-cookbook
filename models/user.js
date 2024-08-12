const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {type: String, required: true},
  // delicious: {type: Boolean, required: true}
})


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry: [foodSchema]

});

const User = mongoose.model('User', userSchema);
const Food = mongoose.model('Food', foodSchema)
module.exports = User, Food;
