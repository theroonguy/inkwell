import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const submitForm = () => {
  //   console.log("Form Submitted");
  //   console.log(username);
  //   console.log(password);

  //   setUsername("");
  //   setPassword("");
  // };

  const submitForm = async (e) => {
    e.preventDefault();
  
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    
  
    const data = await response.json();
  
    if (response.ok) {
      // Save user information to local storage or use state management library
      localStorage.setItem('user', JSON.stringify(data));
  
      // Redirect to the home page
      console.log('Login successful:', data);
      // Replace this with the actual URL of your home page
      window.location.replace('/');
    } else {
      // Show an error message
      console.log('Login failed:', data);
      alert('Invalid username or password');
    }
  };
  
  return (
    <div className="login-page">
      <div className="form-container">
        <h1>Log In</h1>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="A unique username"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Your password"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="buttons-container">
            <Form.Group>
              <Button onClick={submitForm}>Log In</Button>
            </Form.Group>
            <Form.Group>
            <small>Don't have an account? <Link to="/register">Register</Link></small>
            </Form.Group>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
