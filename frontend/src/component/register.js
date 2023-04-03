import React, { useState } from 'react'
import { Form, Button, FormGroup } from 'react-bootstrap'

const RegisterPage = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const submitForm = () => {
        console.log("Form Submitted");
        console.log(username)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)

        setUsername('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    return (
        <div>
            <div className="form">
                <h1>Register</h1>
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
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            placeholder="A valid email address."
                            value={email}
                            name="email"
                            onChange={(e) => { setEmail(e.target.value) }} />
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
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Your password."
                            value={confirmPassword}
                            name="confirmPassword"
                            onChange={(e) => { setConfirmPassword(e.target.value) }} />
                    </Form.Group>
                    <br></br>

                    <Form.Group>
                        <Button onClick={submitForm}>Register</Button>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;