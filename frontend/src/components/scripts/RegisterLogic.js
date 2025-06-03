import { useState } from "react";
import axios from "axios";

export const useRegister = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        username,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMessage("Registration successful!");
    } catch (error) {
      if (error.response && error.response.data) {
        // server side
        setMessage("Registration failed: " + error.response.data.message || error.response.data);
      } else {
        // no response from the server
        setMessage("Registration failed: " + error.message);
      }
    }
  };

  return { username, setUsername, password, setPassword, handleRegister, message };
};