import React, { useState } from 'react'
import { useSignup } from '../hook/useSignup'

function Signup() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { signup, error, isLoading } = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(name, email, password)
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
      <button disabled={isLoading}>Sign up</button>
      {error && <div>{error}</div>}
    </form>
  )
}

export default Signup
