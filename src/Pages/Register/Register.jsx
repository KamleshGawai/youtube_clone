import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    dob: "",
    email: "",
    mobile: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.success) {
      alert("Registration successful");
      navigate("/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} />
      <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} />
      <input type="text" name="username" placeholder="Username" onChange={handleChange} />
      <input type="date" name="dob" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="tel" name="mobile" placeholder="Mobile Number" onChange={handleChange} />
      <input type="text" name="country" placeholder="Country" onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm Password"
        onChange={handleChange}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
