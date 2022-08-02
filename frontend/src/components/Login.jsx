import React, { useState } from 'react'
import { useLogin } from '../hook/useLogin'

function Login() {
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const { login, error, isLoading } = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Log in</h3>

      {/* <label>Name:</label>
      <input type='text' onChange={(e) => setName(e.target.value)} value={name} /> */}
      <label>Email:</label>
      <input type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
      <label>Password:</label>
      <input
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>Log in</button>
      {error & <div>{error}</div>}
    </form>
  )
}

export default Login
