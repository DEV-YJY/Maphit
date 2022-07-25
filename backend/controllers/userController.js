const User = require('../models/userModel')

// login user
const loginUser = async (req, res) => {
  res.json({ msg: 'login user' })
}

// signup user
const signupUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const user = await User.signup(name, email, password)
    res.status(200).json({ name, email, user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

  // res.json({ msg: 'signup user' })
}

module.exports = {
  loginUser,
  signupUser,
}
