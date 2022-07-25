const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

// static signup method
userSchema.statics.signup = async function (name, email, password) {
  // const nameExists = await this.findOne({ name })

  // validation first
  if (!name || !email || !password) {
    throw Error('All fields must be filled')
  }
  // is it a valid name?
  if (!validator.isEmail(email)) {
    throw Error('Email not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }

  const emailExists = await this.findOne({ email })

  if (emailExists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ name, email, password: hash })

  return user
}

module.exports = mongoose.model('User', userSchema)
