const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

console.log(createToken())

// login user
const loginUser = async (req, res) => {
  res.json({ msg: 'login user' })
}

// signup user
const signupUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = await User.signup(name, email, password)

    // create a token
    const token = createToken(user._id)
    res.status(200).json({ name, email, token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

  // res.json({ msg: 'signup user' })
}

module.exports = {
  loginUser,
  signupUser,
}
