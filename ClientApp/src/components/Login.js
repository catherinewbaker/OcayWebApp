import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import logo from '../image/OCAY_logo.png';
import puzzleBackground from '../image/puzzleBackground.png';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLoginFormSubmit = async (event) => {
        event.preventDefault();

        if (email === '' || password === '') {
            setError('Please fill in all fields.')
        } else {
            const data = {
                Email: email, Password: password
            };

            try {
                const response = await axios.post('https://localhost:44408/api/Auth/login', data);
                console.log(response.data);
                setError('')
                await localStorage.setItem('login', "success")
                localStorage.setItem('userInfo', JSON.stringify(response.data));

                window.location.reload()

            } catch (error) {
                setError(error.response.data)
                console.error(error.response.data);
            }
        }
    };

    return (
        <div style={{ backgroundImage: `url(${puzzleBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">

                    <Col md={8} lg={6} xs={12}>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <h2 className="fw-bold mb-2 mt-md-3 text-uppercase">OCAY Login</h2>
                                            <p className="mb-5">Please enter your email and password!</p>
                                        </div>
                                        <div style={{ flexGrow: 1 }}></div>
                                        <img src={logo} alt="Responsive image" style={{ height: '20%', width: '20%' }} />
                                    </div>

                                    {error === "Please fill in all fields." && (
                                        <Form.Label className="text-center" style={{ color: 'red' }}>
                                            {error}
                                        </Form.Label>
                                    )}

                                    {error === "Please check your email or password." && (
                                        <Form.Label className="text-center" style={{ color: 'red' }}>
                                            {error}
                                        </Form.Label>
                                    )}

                                    <div className="mb-3">

                                        <Form onSubmit={handleLoginFormSubmit}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    placeholder="example@domain.com"
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={handlePasswordChange}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <p className="small">
                                                    <a
                                                        onClick={() => navigate('/forgot-password')}
                                                        style={{ color: "#69b895", cursor: "pointer", textDecoration: "underline" }}
                                                    >
                                                        Forgot password?
                                                    </a>
                                                </p>
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button
                                                    type="submit"
                                                    style={{ color: "black", outline: "none" }}
                                                    
                                                >
                                                    Login
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0 text-center">
                                                Don't have an account?{" "}
                                                <a
                                                    onClick={() => navigate('/signup')}
                                                    style={{ color: "#69b895", cursor: "pointer", textDecoration: "underline" }}
                                                >
                                                    Sign Up
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export { Login };
