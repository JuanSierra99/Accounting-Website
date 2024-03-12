import React, { useState } from "react";
import { post } from "./Request.js"; // Ensure this correctly imports your post function
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Add a state for the password
  const [name, setName] = useState(""); // Add a state for the name

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const apiUrl = "http://127.0.0.1:3000/auth/register"; // Ensure the URL is correct
    const sendJson = { email, password, name }; // Include password in the payload
    const response = await post(apiUrl, sendJson); // Post request, wait for json response with token

    if (response) {
      navigate("/login"); // Navigate to the login page
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="email">Email:</label>
          <input
            type="email" // Change type to "email" for appropriate keyboard on mobile devices
            id="email" // Corrected typo in id
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="">
          <label htmlFor="password">Password:</label>
          <input
            type="password" // Ensure input type is "password" to hide input characters
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="">
          <label htmlFor="name">name:</label>
          <input
            type="text" // Ensure input type is "password" to hide input characters
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
