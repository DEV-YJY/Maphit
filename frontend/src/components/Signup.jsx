import React, { useState } from 'react'

function Signup() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(name, email, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Sign up</h3>

      <label>Name:</label>
      <input type='text' onChange={(e) => setName(e.target.value)} value={name} />
      <label>Email:</label>
      <input type='text' onChange={(e) => setEmail(e.target.value)} value={email} />
      <label>Password:</label>
      <input type='text' onChange={(e) => setPassword(e.target.value)} value={password} />
      <button>Sign up</button>
    </form>
  )
}

export default Signup
