import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import "./Login.css"



import Sidebar from "../../Components/Sidebar/Sidebar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      if (response.data.success) {
        alert("Login successful");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        setUser(response.data.user); // Update global state
        navigate("/");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Invalid username or password");
    }
  };

  return (
    
    <div className="login-page">
  <h2>Login</h2>
  <input
    type="text"
    placeholder="Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button onClick={handleLogin}>Login</button>
  <button onClick={() => navigate("/register")}>Register</button>
</div>

  );
};

export default Login;
