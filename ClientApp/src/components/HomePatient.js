import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Form, Row, Modal, Col, Card, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const HomePatient = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getData();
    }, []);

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

    const onPressSurvey = () => {
        navigate('/survey')
    }

    const onPressResults = () => {
        navigate('/PatientResults')
    }

    return (
        <div>
            <h1>Welcome back {name}!</h1>
            <p>To get started, select the <strong>Survey</strong> or <strong>Results</strong> menus</p>
            <br />
            <Container className=" d-flex justify-content-left" >
                <Row >
                    <Col style={{ marginBottom: '20px', width: '180px' }}>
                        <Button onClick={onPressSurvey} style={{
                            backgroundColor: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'left',
                            width: '150px'
                        }} >
                            <Card style={{
                                backgroundColor: '#FFFFFF',
                                border: 'none',
                                width: '100%',
                                color: '#79D4AC'
                            }}>
                                <Card.Body className="text-center">
                                    <Card.Title className="card-title" style={{ fontSize: '15px'} }>Take Survey</Card.Title>
                                </Card.Body>
                            </Card>
                        </Button>
                    </Col>
                    <Col style={{ marginBottom: '20px' }}>
                        <Button onClick={onPressResults} style={{
                            backgroundColor: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'flex-start',
                            justifyContent: 'left',
                            width: '150px'
                        }} >
                            <Card style={{
                                backgroundColor: '#FFFFFF',
                                border: 'none',
                                width: '100%',
                                color: '#79D4AC'
                            }}>
                                <Card.Body className="text-center">
                                    <Card.Title className="card-title" style={{ fontSize: '15px'} }>See Results</Card.Title>
                                </Card.Body>
                            </Card>
                        </Button>
                    </Col>
                    
                </Row>
            </Container>
            
        </div>
    )

}
export { HomePatient };