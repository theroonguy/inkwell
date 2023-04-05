import React, { useState, useEffect } from "react";
import { Form, Button, FormGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submitForm = () => {
        console.log("Form Submitted");
        console.log(username)
        console.log(password)

        setUsername('')
        setPassword('')
    }

    return (
        <div className="login-page">
            <div className="form-container">
                <h1>Log In</h1>
                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            placeholder="A unique username."
                            value={username}
                            name="username"
                            onChange={(e) => { setUsername(e.target.value) }} />
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Your password."
                            value={password}
                            name="password"
                            onChange={(e) => { setPassword(e.target.value) }} />
                    </Form.Group>
                    <br></br>

                    <Form.Group>
                        <Button onClick={submitForm}>Log In</Button>
                    </Form.Group>
                    <Form.Group>
                        <small>Don't have an account? <Link to="/register">Register</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;