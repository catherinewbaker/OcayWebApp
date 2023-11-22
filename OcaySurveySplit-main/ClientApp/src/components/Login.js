import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form, Modal } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import logo from '../image/whiteLogo.png';
import puzzleBackground from '../image/puzzleBackground.png';
import loginLoad from '../image/loginLoad.gif';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState('')
    const [modalEmail, setModalEmail] = useState('')
    const [showInput, setShowInput] = useState(false)
    const [code, setCode] = useState('')
    const [inputCode, setInputCode] = useState('')
    const [verifyError, setVerifyError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [loadingLogin, setLoadingLogin] = useState(false)

    const onClickVerify = async () => {
        const input = {
            Email: modalEmail
        }

        try {
            const response = await axios.post('https://portal.ocay.org/api/Auth/checkEmail', input);
            onClickVerify2()
        } catch (error) {
            setEmailError(error.response.data)
            console.error(error.response.data);
        }
    }

    const onClickVerify2 = async () => {
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
                    email: modalEmail,
                    name: 'New User',
                },
            ],
            subject: 'OCAY Forgot Password Code',
            htmlContent: `<html><head>Hello!</head><body><h1>Here is your 4 digit code for email verification to create a new password: ${code}</h1></body></html>`, // Use the updated value of code here
            headers: {
                'X-Mailin-custom': 'custom_header_1:custom_value_1|custom_header_2:custom_value_2|custom_header_3:custom_value_3',
                charset: 'iso-8859-1',
            },
        };

        try {
            await axios.post('https://api.sendinblue.com/v3/smtp/email', requestData, {
                headers: {
                    'accept': 'application/json',
                    'api-key': process.env.REACT_APP_BREVO_API_KEY,
                    'content-type': 'application/json',
                },
            });
            // Handle success if needed
            setEmailError('')
            console.log('Email sent successfully');
            setShowInput(true);
        } catch (error) {
            // Handle errors if any
            console.error('Error sending email:', error);
            setEmailError("Please check your email.")
            setShowInput(false)
        }

    };
   
    const onClickSubmit = () => {
        if (code === inputCode) {
            setVerifyError("")
            setShowModal(false)
            localStorage.setItem("email", modalEmail)
            navigate("/change-password")
            
        } else {
            setVerifyError("Please check the 4 digit code again.")
        }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLoginFormSubmit = async (event) => {
        setLoadingLogin(true)
        event.preventDefault();

        if (email === '' || password === '') {
            setError('Please fill in all fields.')
        } else {
            const data = {
                Email: email, Password: password
            };

            try {
                const response = await axios.post('https://portal.ocay.org/api/Auth/login', data);
                console.log(response.data);
                setError('')
                await localStorage.setItem('login', "success")
                localStorage.setItem('userInfo', JSON.stringify(response.data));

                setLoadingLogin(false)

                window.location.reload()

            } catch (error) {
                setError(error.response.data)
                console.error(error.response.data);
                setLoadingLogin(false)
            }
        }
        
    };

    var loginLoadContents = loadingLogin ? (
        <>
            <em>  </em>
            <img src={loginLoad} style={{ width: '5%' }} alt="Responsive image" />
        </>
    ): (
        <>
        </>
    )

    return (
        <div style={{ backgroundColor: '#7ab8a5', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>

            <Modal show={showModal} onHide={() => {setShowModal(false)} } centered>
                <Modal.Header closeButton>
                    <Modal.Title>Forgot Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {emailError !== "" && (
                        <Form.Label className="text-center" style={{ color: 'red' }}>
                            {emailError}
                        </Form.Label>
                    )}
                    <div className="d-flex align-items-center">
                        <Form.Control
                            type="text"
                            placeholder="Please enter your email registered with OCAY."
                            value={modalEmail}
                            onChange={(event) => setModalEmail(event.target.value)}
                            className="me-2"
                            disabled={showInput}
                        />
                        <Button disabled={showInput} style={{ fontWeight: "bold" }} variant="primary" onClick={onClickVerify}>Verify</Button>
                    </div>

                    {showInput && (
                        <div>
                            <Form.Control
                                type="text"
                                placeholder="Please enter the 4-digit code sent to your email!"
                                value={inputCode}
                                onChange={(event) => setInputCode(event.target.value)}
                                className="mt-4"
                            />
                            {verifyError !== "" && (
                                <Form.Label className="text-center" style={{ color: 'red' }}>
                                    {verifyError}
                                </Form.Label>
                            )}
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={!showInput} style={{ color: "black" }} variant="primary" onClick={onClickSubmit}>Submit</Button>
                </Modal.Footer>
            </Modal>

            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">

                    <Col md={8} lg={6} xs={12}>
                        <Card className="shadow" style={{ padding: "50px"}}>
                            <Card.Body>
                                <div className="mb-3">
                                    <div id="logindiv" style={{ display: 'flex', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <h2 className="login-title fw-bold mb-1 mt-md-3 text-uppercase" >Login</h2>
                                            <p className="mb-3">Please enter your email and password!</p>
                                        </div>
                                        <div style={{ flexGrow: 1 }}></div>
                                        <img src={logo} alt="Responsive image" style={{ height: '80px', width: '100px' }} />
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
                                            <Form.Group className="mb-5" controlId="formBasicCheckbox">
                                                <p className="small">
                                                    <a
                                                        onClick={() => {setShowModal(true)} }
                                                        style={{ color: "#69b895", cursor: "pointer", textDecoration: "underline" }}
                                                    >
                                                        Forgot password?
                                                    </a>
                                                </p>
                                            </Form.Group>
                                            <div className="d-grid">
                                                <Button
                                                    className="fw-bold"
                                                    type="submit"
                                                    style={{ outline: "none" }}
                                                >
                                                    Login{loginLoadContents}
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
