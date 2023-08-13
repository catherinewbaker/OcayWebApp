﻿import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import logo from '../image/OCAY_logo.png';
import puzzleBackground from '../image/puzzleBackground.png';

const Signup = () => {
    const navigate = useNavigate();
    const [FName, setFName] = useState('');
    const [LName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');
    const [verifyError, setVerifyError] = useState('')
    const [isPatient, setIsPatient] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [inputCode, setInputCode] = useState("");
    const [code, setCode] = useState("");

    const onClickVerify = async () => {
        const randomNum = Math.floor(Math.random() * 10000);
        const code = randomNum.toString().padStart(4, '0');
        await setCode(code); // Update the state with the new code value

        const requestData = {
            sender: {
                name: 'OCAY Team',
                email: 'team@ocay.org',
            },
            to: [
                {
                    email: email,
                    name: 'New User',
                },
            ],
            subject: 'OCAY Registration Code',
            htmlContent: `<html><head></head><body><h1>Hello! Here is your 4 digit code for email verification upon registration: ${code}</h1></body></html>`, // Use the updated value of code here
            headers: {
                'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3',
                charset: 'iso-8859-1',
            },
        };

        try {
            await axios.post('https://api.sendinblue.com/v3/smtp/email', requestData, {
                headers: {
                    'accept': 'application/json',
                    'api-key': "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",
                    'content-type': 'application/json',
                },
            });
            // Handle success if needed
            console.log('Email sent successfully');
        } catch (error) {
            // Handle errors if any
            console.error('Error sending email:', error);
        }

        setShowModal(true);
    };

    const onClickVerify2 = () => {
        if (code === inputCode) {
            setVerifyError("")
            setShowModal(false)
            setIsVerified(true)
        } else {
            setVerifyError("Please check the 4 digit code again.")
        }
    }

    const closeModal = () => {
        setShowModal(false);
    };

    const handleFNameChange = (event) => {
        setFName(event.target.value);
    };

    const handleLNameChange = (event) => {
        setLName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handlerePasswordChange = (event) => {
        setRePassword(event.target.value);
    };

    const handleCheckChange = (event) => {
        const value = event.target.value;
        setIsPatient(value === "Patient")
    }

    const handleRegisterFormSubmit = async (event) => {
        event.preventDefault();

        if (email === '' || password === '' || rePassword === '' || FName === '' || LName === '' || isPatient === null) {
            setError('Please fill in all fields and verify your email address.')
        } else if (password !== rePassword) {
            setError('Please check if your passwords match.')
        } else {
            const data = {
                FName: FName,
                LName: LName,
                IsPatient: isPatient,
                SurveyStatus: 0,
                Email: email,
                Password: password,
                ConnectedUsers: ""
            };

            try {
                const response = await axios.post('https://portal.ocay.org/api/Auth/register', data);
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

            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Email Verification</Modal.Title>
                </Modal.Header>
                <Modal.Body> {/* This is the new Modal.Body containing the input box */}
                    <Form.Control
                        type="text"
                        placeholder="Please enter the 4-digit code sent to your email!"
                        value={inputCode}
                        onChange={(event) => setInputCode(event.target.value)}
                    />
                    {verifyError !== "" && (
                        <Form.Label className="text-center" style={{ color: 'red' }}>
                            {verifyError}
                        </Form.Label>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{color: "black"}} variant="primary" onClick={onClickVerify2}>Verify</Button>
                </Modal.Footer>
            </Modal>

            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="shadow">
                            <Card.Body>
                                <div className="mb-3">
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <h2 className="fw-bold mb-2 mt-md-3 text-uppercase">Register</h2>
                                            <p className="mb-5">Hi! Please enter all information fields to register!</p>
                                        </div>
                                        <div style={{ flexGrow: 1 }}></div>
                                        <img src={logo} alt="Responsive image" style={{ height: '20%', width: '20%' }} />
                                    </div>
                                    {error === "Please fill in all fields." && (
                                        <Form.Label className="text-center" style={{ color: 'red' }}>
                                            {error}
                                        </Form.Label>
                                    )}
                                    <div className="mb-3">

                                        <Form onSubmit={handleRegisterFormSubmit}>

                                            <div className="custom-check">
                                                <Form.Check
                                                    inline
                                                    label="Patient"
                                                    name="group1"
                                                    type="radio"
                                                    value="Patient"
                                                    checked={isPatient === true}
                                                    onChange={handleCheckChange}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="Physician"
                                                    name="group1"
                                                    type="radio"
                                                    value="Physician"
                                                    checked={isPatient === false}
                                                    onChange={handleCheckChange}
                                                    className="mb-3"
                                                />
                                            </div>


                                            <Form.Group className="mb-3" controlId="formBasicName">
                                                <Form.Label className="text-center">
                                                    First Name
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter first name"
                                                    value={FName}
                                                    onChange={handleFNameChange}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicName">
                                                <Form.Label className="text-center">
                                                    Last Name
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Enter last name"
                                                    value={LName}
                                                    onChange={handleLNameChange}
                                                />
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Row>
                                                    <Col>
                                                        <Form.Label className="text-center">
                                                            Email address
                                                        </Form.Label>
                                                        {error === "Email is already used." && (
                                                            <Form.Label className="text-center" style={{ color: 'red' }}>
                                                                * {error}
                                                            </Form.Label>
                                                        )}
                                                        <div className="d-flex align-items-center">
                                                            <Form.Control
                                                                type="email"
                                                                placeholder="example@domain.com"
                                                                value={email}
                                                                onChange={handleEmailChange}
                                                                className="me-2"
                                                                disabled={isVerified}
                                                            />
                                                            <Button disabled={isVerified} onClick={onClickVerify} style={{ color: "black", outline: "none" }}>
                                                                Verify
                                                            </Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label className="mb-0">Password</Form.Label>

                                                {error === "Please check if your passwords match." && (
                                                    <Form.Label className="text-center" style={{ color: 'red' }}>
                                                        * {error}
                                                    </Form.Label>
                                                )}

                                                <div className="mb-2" style={{ display: 'block'}}>
                                                    <Form.Text style={{ color: error === "Password must be at least 8 characters long and contain at least one uppercase letter." ? 'red' : 'initial' }}>
                                                    Your password must be at least 8 characters long and contain at least one uppercase letter.
                                                  </Form.Text>
                                                </div>
                                            
                                                <Form.Control
                                                    type="password"
                                                    placeholder="Password"
                                                    value={password}
                                                    onChange={handlePasswordChange}
                                                    className="mb-2"
                                                />

                                                <Form.Control
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    value={rePassword}
                                                    onChange={handlerePasswordChange}
                                                    
                                                />
                                            </Form.Group>

                                            <div className="d-grid">
                                                <Button disabled={!isVerified} type="submit" style={{ color: "black", outline: "none" }}>
                                                    Register
                                                </Button>
                                            </div>
                                        </Form>
                                        <div className="mt-3">
                                            <p className="mb-0 text-center">
                                                Already have an account?{" "}
                                                <a
                                                    onClick={() => navigate('/')}
                                                    style={{ color: "#69b895", cursor: "pointer", textDecoration: "underline" }}
                                                >
                                                    Login
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

export { Signup };

