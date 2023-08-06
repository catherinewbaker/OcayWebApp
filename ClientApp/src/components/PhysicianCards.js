import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Form, Row, Modal, Col, Card, ProgressBar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const PhysicianCards = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState({});
    const [number, setNumber] = useState("");
    const [patientsContent, setPatientsContent] = useState("");

    useEffect(() => {
        getPatients();
    }, [number]);

    const getPatients = async () => {
        const storedDataString = localStorage.getItem('userInfo');
        const storedDataObject = JSON.parse(storedDataString);
        await setNumber(storedDataObject.userNumber);

        const bodyParameters = {
            UserNumber: number,
        };

        if (number !== "") {
            axios.post('https://localhost:44408/api/Auth/loadConnections', bodyParameters)
                .then((res) => {
                    setPatients(res.data.connectedUsers)
                })
                .catch((err) => console.log(err)); 
        }

    };

    const onPressPatient = async (patientID) => {
        await localStorage.setItem("patientID", patientID)
        navigate("/PhysicianResults")
    }
    
    return (
        <Container className="d-flex flex-column align-items-left">
            <br />
            <h1 style={{ color: "black", fontSize: '35px' }} >Your Patients</h1>
            <p style={{ color: "black" }}>Please select one of your patients to view their results</p>
            <br />
            <Container className="d-flex justify-content-left" >
                <Row>
                    {Object.entries(patients).map(([id, name]) => (
                        <Col key={id} style={{ marginBottom: '20px', width: '100%'}}>
                            <Button
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'left',
                                    width: '200px',
                                }}
                                onClick={() => onPressPatient(id)}
                            >
                                <Card
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        border: 'none',
                                        width: '90%',
                                        color: '#79D4AC',
                                    }}
                                >
                                    <Card.Body className="text-center">
                                        <Card.Title className="card-title" style={{ fontSize: '15px' }}>
                                            {name}
                                            <br />
                                            ID: {id}
                                        </Card.Title>
                                    </Card.Body>
                                </Card>
                            </Button>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );

}
export { PhysicianCards };