import React, { useState } from 'react'
import { Form, Button, FormGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const RegisterPage = () => {

    const { register, watch, handleSubmit, reset, formState: { errors } } = useForm();

    const submitForm = (data) => {

        if (data.password === data.confirmPassword) {

            const body = {
                username: data.username,
                email: data.email,
                password: data.password
            }

            const requestOptions = {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            }

            fetch('/auth/register', requestOptions)
            .then(res=>res.json())
            .then(data=>console.log(data))
            .catch(err=>console.log(err))

            reset()
        } else {
            alert("Passwords do not match.")
        }

    }

    console.log(watch("username"));
    console.log(watch("email"));
    console.log(watch("password"));
    console.log(watch("confirmPassword"));

    return (
        <div className = "login-page">
            <div className="form-container">
                <h1>Register</h1>
                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text"
                            placeholder="A unique username."
                            {...register("username", { required: true, maxLength: 25 })}
                        />

                        {errors.username && <p style={{ color: "red" }}><small>Username is required</small></p>}
                        {errors.username?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters: 25</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email"
                            placeholder="A valid email address."
                            {...register("email", { required: true, maxLength: 80 })}
                        />

                        {errors.email && <p style={{ color: "red" }}><small>Email is required</small></p>}
                        {errors.email?.type === "maxLength" && <p style={{ color: "red" }}><small>Max characters: 80</small></p>}

                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Your password."
                            {...register("password", { required: true, minLength: 8 })}
                        />

                        {errors.password && <p style={{ color: "red" }}><small>Password is required</small></p>}
                        {errors.password?.type === "minLength" && <p style={{ color: "red" }}><small>Min characters: 8</small></p>}

                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password"
                            placeholder="Your password."
                            {...register("confirmPassword", { required: true, minLength: 8 })}
                        />

                        {errors.confirmPassword && <p style={{ color: "red" }}><small>Password confirmation is required</small></p>}
                        {errors.confirmPassword?.type === "minLength" && <p style={{ color: "red" }}><small>Min characters: 8</small></p>}

                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button onClick={handleSubmit(submitForm)}>Register</Button>
                    </Form.Group>
                    <Form.Group>
                        <small>Already have an account? <Link to="/login">Log in</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;