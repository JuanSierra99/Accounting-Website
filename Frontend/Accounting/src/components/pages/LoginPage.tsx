import { useState } from "react";
import { post } from "./Request.js"; // Ensure this correctly imports your post function
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Add a state for the password

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const apiUrl = "http://127.0.0.1:3000/auth/login"; // Ensure the URL is correct
    const sendJson = { email, password }; // Include password in the payload
    const response = await post(apiUrl, sendJson); // Post request, wait for json response with token

    if (response && response.access_token) {
      localStorage.setItem("jwtToken", response.access_token); // Save the JWT to local storage
      navigate("/Invoices"); // Navigate to the Home page
    } else {
      console.error("Login failed: No token received");
    }
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
