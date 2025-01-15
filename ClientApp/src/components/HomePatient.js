import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Form, Row, Modal, Col, Card, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import temp from '../image/temp.png';
import sleep from '../image/DogSleeping.gif'

const HomePatient = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

    // Function to retrieve and parse user data from localStorage
    const getData = () => {
        const storedDataString = localStorage.getItem('userInfo');

        try {
            const storedDataObject = JSON.parse(storedDataString);
            console.log(storedDataObject)
            if (storedDataObject && storedDataObject.fName) {
                setName(storedDataObject.fName);
            } else {
                console.log("Invalid or missing 'userInfo' data in localStorage.");
            }
        } catch (error) {
            console.error("Error parsing 'userInfo' data from localStorage:", error);
        }
    }

    // Quick link user to survey
    const onPressSurvey = () => {
        navigate('/survey')
    }

    // Quick link user to results
    const onPressResults = () => {
        navigate('/PatientResults')
    }

    return (
        <div style={{ height: "100vh" }}>
            <h1 className="d-flex justify-content-center mt-5" style={{ color: 'black', fontSize: '35px' , fontWeight: 'bold' }} >Welcome back {name}!</h1>
            <p className="d-flex justify-content-center" style={{ color: 'black' }}>To get started, select the <strong> &nbsp;Survey</strong> &nbsp;or <strong> &nbsp;Results</strong> &nbsp;menus</p>
            <div className="d-flex justify-content-center">
                <img style={{ width: "35%" }} src={sleep} alt="Responsive image" />
            </div>
            <br />
            <br />
            <br/>

            <Container className=" d-flex justify-content-center" >
                <Row >
                    <Col style={{ marginTop: "20px", marginBottom: '20px', marginRight: '200px' }}>
                        <Button onClick={onPressSurvey} style={{
                            backgroundColor: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'left',
                            width: '250px',
                        }} >
                            <Card style={{
                                backgroundColor: '#FFFFFF',
                                border: 'none',
                                width: '100%',
                                color: '#40bb85'
                            }}>
                                <Card.Body className="main-select text-center">
                                    <Card.Title className="card-title mb-0" style={{fontWeight: 'bold', fontSize: '20px'} }>Take Survey</Card.Title>
                                </Card.Body>
                            </Card>
                        </Button>
                    </Col>
                    <Col style={{ marginTop: "20px", marginBottom: '20px'}}>
                        <Button onClick={onPressResults} style={{
                            backgroundColor: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'left',
                            width: '250px'
                        }} >
                            <Card style={{
                                backgroundColor: '#FFFFFF',
                                border: 'none',
                                width: '100%',
                                color: '#40bb85'
                            }}>
                                <Card.Body className="main-select text-center">
                                    <Card.Title className="card-title mb-0" style={{ fontSize: '20px',fontWeight: 'bold'} }>See Results</Card.Title>
                                </Card.Body>
                            </Card>
                        </Button>
                    </Col>
                </Row>

            </Container>
            <br />
            <br />
            <br />
            <br />
        </div>
    )

}
export { HomePatient };