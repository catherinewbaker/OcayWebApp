import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
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
    const [isPatient, setIsPatient] = useState(null)

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
            setError('Please fill in all fields.')
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
                const response = await axios.post('https://localhost:44408/api/Auth/register', data);
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
                                            <h2 className="fw-bold mb-2 mt-md-3 text-uppercase">OCAY Register</h2>
                                            <p className="mb-5">Please enter all information fields to register!</p>
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
                                                <Form.Label className="text-center">
                                                    Email address
                                                </Form.Label>
                                                {error === "Email is already used." && (
                                                    <Form.Label className="text-center" style={{ color: 'red' }}>
                                                        * {error}
                                                    </Form.Label>
                                                )}
                                                <Form.Control
                                                    type="email"
                                                    placeholder="example@domain.com"
                                                    value={email}
                                                    onChange={handleEmailChange}
                                                />
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
                                                <Button type="submit" style={{ color: "black", outline: "none" }}>
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

