import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Form, Row, Modal, Col, Card, ProgressBar } from 'react-bootstrap';

const PhysicianCards = () => {
    const [patients, setPatients] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const bodyParameters = {
            UserNumber: "36587325", // change to pull actual UserNumber
        };
        axios.post('https://localhost:44408/api/Auth/loadConnections', bodyParameters)
            .then((res) => {
                console.log(res);
                setPatients(res.data.connectedUsers)
            })
            .catch((err) => console.log(err));
    };

    var holder;
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
                        width: '150px'
                    }} >
                        <Card style={{
                            backgroundColor: '#FFFFFF',
                            border: 'none',
                            width: '100%',
                            color: '#79D4AC'
                        }}>
                            <Card.Body className="text-center">
                                <Card.Title className="card-title" style={{ fontSize: '15px' }}>{patients[user]}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Button>
                </Col>
            );
        }
    }
    
    const patientsContent = renderCards();
    return (
        <div>
            <h1>Please select one of your patients for viewing</h1>
            <Container className=" d-flex justify-content-left" >
                <Row >
                    {patientsContent}
                </Row>
            </Container>
        </div>
    );

}
export { PhysicianCards };