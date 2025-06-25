import React, { useState } from 'react'

const Login = () => {
  const [formData,setFormData] = useState({
    email:"",password:"",
  })

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/user/login",{
      method:"post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })

    const data = await response.json();
    alert(data.message);
  }


  return (
    <div>
       <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" onChange={handleChange} type="password" placeholder="Password" />
      <button onSubmit={handleSubmit}>Login</button>
    </div>
  )
}

export default Login