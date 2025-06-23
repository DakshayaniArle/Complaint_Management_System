import React, { useState } from 'react'

const Login = () => {
  return (
    <div>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" /><br></br>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" /><br></br>
        <button>Sign Up</button>
    </div>
  )
}

export default Login