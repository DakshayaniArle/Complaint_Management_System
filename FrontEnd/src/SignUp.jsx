import { useState } from "react";

const SignUp = () => {

  const [formData,setFormData] = useState({
    fullname :"", email:"",password:"",mobile:"",
  })

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };

  const handleSubmit = async (e)=>{
    e.preventDefault();

    const response =await  fetch("http://localhost:5000/api/user/signup",{
      method:"post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="fullname" onChange={handleChange} placeholder="Full Name" />
      <input name="email" onChange={handleChange} placeholder="Email" />
      <input name="password" onChange={handleChange} type="password" placeholder="Password" />
      <input name="mobile" onChange={handleChange} type="text" placeholder="Mobile Number" />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp