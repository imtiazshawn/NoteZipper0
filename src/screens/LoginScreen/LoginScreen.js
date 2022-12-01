import React, { useState } from 'react';
import MainScreen from '../../components/MainScreen';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import './LoginScreen.css';
import axios from 'axios';

const LoginScreen = () => {
    // States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    // Functions
    const submitHandler = async (e) => {
        e.preventDefault();   
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            setLoading(true);
            const { data } = await axios.post (
                "http://localhost:5000/api/users/login", {
                    email,
                    password,
                }, config
                );
                console.log(data);
                localStorage.setItem("userInfo", JSON.stringify(data));
                setLoading(false);
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    

  return (
    <MainScreen title="LOGIN">

        {/* Forms */}
        <Form className='loginContainer' onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
                type="email" 
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
        </Form.Group>
        

        {/* New Customer */}
        <p>New Customer ? <Link to="/register">Register Here</Link></p>


        {/* Buttons */}
        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>
    </MainScreen>
  )
}

export default LoginScreen;
