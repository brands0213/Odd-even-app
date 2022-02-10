import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {

    // Allows us to consume the User context object and it's properties to use for user validation 
    const { user, setUser } = useContext(UserContext);

    // State hooks to store the values of the input fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // State to determine whether submit button is enabled or not
    const [isActive, setIsActive] = useState(true);

    function authenticate(e) {

        // Prevents page redirection via form submission
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => res.json())
        .then(data => {

            // If no user information is found, the "access" property will not be available and will return undefined
            // Using the typeof operator will return a string of the data type of the variable/expression it preceeds which is why the value being compared is in a string data type
            if (typeof data.access !== "undefined") {

                // The JWT will be used to retrieve user information across the the whole frontend application and storing it in the localStorage will allow ease of access to the user's information
                localStorage.setItem('token', data.access);
                retrieveUserDetails(data.access);

                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome to Zuitt!"
                });

            } else {

                Swal.fire({
                    title: "Authentication failed",
                    icon: "error",
                    text: "Check your login details and try again."
                });

            };

        })

        // Clear input fields after submission
        setEmail('');
        setPassword('');

    }

    const retrieveUserDetails = (token) => {
        
        // The token will be sent as part of the request's header information
        // We put "Bearer" in front of the token to follow implementation standards for JWTs
        fetch(`${process.env.REACT_APP_API_URL}/users/details`, {
            headers: {
                Authorization: `Bearer ${ token }`
            }
        })
        .then(res => res.json())
        .then(data => {

            // Changes the global "user" state to store the "id" and the "isAdmin" property of the user which will be used for validation across the whole application
            setUser({
              id: data._id,
              isAdmin: data.isAdmin
            });

        })

    };

    useEffect(() => {

        // Validation to enable submit button when all fields are populated and both passwords match
        if(email !== '' && password !== ''){
            setIsActive(true);
        }else{
            setIsActive(false);
        }

    }, [email, password]);

    return (
        (user.id !== null) ?
            <Redirect to="/courses" />
        :
            <Container>
                <Form onSubmit={(e) => authenticate(e)}>
                    <Form.Group controlId="userEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    { isActive ? 
                        <Button variant="primary" type="submit" id="submitBtn">
                            Submit
                        </Button>
                        : 
                        <Button variant="danger" type="submit" id="submitBtn" disabled>
                            Submit
                        </Button>
                    }
                </Form>
            </Container>
    )
}