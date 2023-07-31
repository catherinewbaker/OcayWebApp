import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Form, Row, Modal, Col, Card, ProgressBar } from 'react-bootstrap';

const PhysicianCards = () => {
    const [patients, setPatients] = useState("");
    const [number, setNumber] = useState("");
    const [patientsContent, setPatientsContent] = useState("");

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        getPatients();
    }, [number]);

    useEffect(() => {
        setPatientsContent(renderCards());
    }, [patients])

    const getData = () => {
        const storedDataString = localStorage.getItem('userInfo');

        try {
            const storedDataObject = JSON.parse(storedDataString);
            //console.log(storedDataObject)
            if (storedDataObject && storedDataObject.userNumber) {
                setNumber(storedDataObject.userNumber);
                // console.log(number)
            } else {
                console.log("Invalid or missing 'userInfo' data in localStorage.");
            }
        } catch (error) {
            console.error("Error parsing 'userInfo' data from localStorage:", error);
        }
    }

    const getPatients = () => {
        if (number === "" || number === null) {
            console.log("Error: User number improperly pulled");
            setPatientsContent(<p>We had trouble pulling your patient information. Please reload the page to view your available patients.</p>)
            return;
        }
        const bodyParameters = {
            UserNumber: number,
        };
        axios.post('https://localhost:44408/api/Auth/loadConnections', bodyParameters)
            .then((res) => {
                 console.log(res);
                setPatients(res.data.connectedUsers)
            })
            .catch((err) => console.log(err)); 
    }; 

    const renderCards = () => {
        for (var user of Object.keys(patients)) {
            console.log(user);
            return (
                <Col style={{ marginBottom: '20px', width: '180px' }}>
                    <Button style={{
                        backgroundColor: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'left',
                        width: '200px',
                    }} >
                        <Card style={{
                            backgroundColor: '#FFFFFF',
                            border: 'none',
                            width: '100%',
                            color: '#79D4AC'
                        }}>
                            <Card.Body className="text-center">
                                <Card.Title className="card-title" style={{ fontSize: '15px' }}>{patients[user]}<br />ID: {user}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Button>
                </Col>
            );
        }
    }
    
    return (
        <Container className="d-flex flex-column align-items-left">
            <br />
            <h1 style={{ color: '#a6a6a6', fontSize: '35px' }} >Your Patients</h1>
            <p style={{ color: '#a6a6a6' }}>Please select one of your patients to view their results</p>
            <br />
            <Container className=" d-flex justify-content-left" >
                <Row >
                    {patientsContent}
                </Row>
            </Container>
        </Container>
    );

}
export { PhysicianCards };