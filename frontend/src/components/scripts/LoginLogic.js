import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setMessage("Username and password are required.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", {
        username,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const token = response.data
      setToken(token);
      localStorage.setItem("token", token);
      const decoded = jwtDecode(token);
      const userId = decoded.id;
      localStorage.setItem("userId", userId);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data) {
        // server side
        setMessage("Login failed: " + error.response.data.message || error.response.data);
      } else {
        // no response from the server
        setMessage("Login failed: " + error.message);
      }
    }
  };

  return { username, setUsername, password, setPassword, handleLogin, message, token };
};