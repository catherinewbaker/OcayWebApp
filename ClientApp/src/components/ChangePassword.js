import React, { useState, useEffect } from 'react';
import { Col, Button, Row, Container, Card, Form, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import logo from '../image/OCAY_logo.png';
import puzzleBackground from '../image/puzzleBackground.png';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('')
    const [location, setLocation] = useState(false)

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const storedDataString = localStorage.getItem('userInfo');

        if (!storedDataString) {
            setEmail(localStorage.getItem("email"))
        } else {
            setLocation(true)
            const storedDataObject = JSON.parse(storedDataString);
            setEmail(storedDataObject.email)
        }
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlerePasswordChange = (event) => {
        setRePassword(event.target.value);
    };

    const handleRegisterFormSubmit = async (event) => {
        event.preventDefault();

        if (password !== rePassword) {
            setError('Please check if your passwords match.')
        } else {
            const data = {
                Email: email,
                Password: password,
            };

            try {
                const response = await axios.post('https://portal.ocay.org/api/Auth/changePassword', data);
                if (!location) {
                    localStorage.clear()
                    setError('')
                    navigate('/')
                } else {
                    setError('')
                    navigate('/')
                }
                
            } catch (error) {
                setError(error.response.data)
                console.error(error.response.data);
            }
        }
    }

    const content = (
        <Container>
            <Row className="vh-100 d-flex justify-content-center align-items-center" style={{ marginTop:'-7%'}}>
                <Col md={8} lg={6} xs={12}>
                    <Card style={{ padding: "50px"}}>
                        <Card.Body>
                            <div className="mb-3">
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom:'50px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <h2 className="fw-bold mb-2 mt-md-3 text-uppercase">OCAY Change Password</h2>
                                        <p className="mb-0">Please enter your new password and confirm the changes!</p>
                                    </div>
                                    <div style={{ flexGrow: 1 }}></div>
                                    <img src={logo} alt="Responsive image" style={{ height: '80px', width: '100px' }} />
                                </div>
                                {error === "Please fill in all fields." && (
                                    <Form.Label className="text-center" style={{ color: 'red' }}>
                                        {error}
                                    </Form.Label>
                                )}
                                <div className="mb-3">
                                    <Form onSubmit={handleRegisterFormSubmit}>
                                        <Form.Group className="mb-3" controlId="formBasicPassword">
                                            {error === "Please check if your passwords match." && (
                                                <Form.Label className="text-center" style={{ color: 'red' }}>
                                                    * {error}
                                                </Form.Label>
                                            )}
                                            <div className="mb-2" style={{ display: 'block' }}>
                                                <Form.Text style={{ color: error === "Password must be at least 8 characters long and contain at least one uppercase letter." ? 'red' : 'initial' }}>
                                                    Your password must be at least 8 characters long and contain at least one uppercase letter.
                                                </Form.Text>
                                            </div>
                                            <Form.Control
                                                type="password"
                                                placeholder="New Password"
                                                value={password}
                                                onChange={handlePasswordChange}
                                                className="mb-2"
                                            />
                                            <Form.Control
                                                type="password"
                                                placeholder="Confirm New Password"
                                                value={rePassword}
                                                onChange={handlerePasswordChange}
                                            />
                                        </Form.Group>
                                        <div className="d-grid">
                                            <Button type="submit" style={{ fontWeight:'bold', outline: "none" }}>
                                                Confirm
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

    return !location ? (
        <div style={{ backgroundImage: `url(${puzzleBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            {content}
        </div>
    ) : (
        <div>
            {content}
        </div>
    );
};

export { ChangePassword };