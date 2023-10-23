import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'

const GuardianCards = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState({});
    const [number, setNumber] = useState("");

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
            axios.post('https://portal.ocay.org/api/Auth/loadConnections', bodyParameters)
                .then((res) => {
                    setPatients(res.data.connectedUsers)
                })
                .catch((err) => console.log(err)); 
        }

    };

    const onPressPatient = async (patientID) => {
        await localStorage.setItem("patientID", patientID)
        navigate("/GuardianResults")
    }

    useEffect(() => {
        console.log(patients)
    }, [patients])

    if(Object.keys(patients).length === 0 || patients == null){
        return (
             <Container className="d-flex flex-column align-items-left">
                <br />
                <h1 style={{ color: "black", fontSize: '35px' }} >Your Patients</h1>
                <p style={{ color: "black" }}>We could not find any of your children. If this is a mistake and your connections do not load in the next 2 minutes, please contact support.</p>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </Container>
        );
    }
    
    return (
        <Container className="d-flex flex-column align-items-left" style={{ height: "100vh" }}>
            <br />
            <h1 style={{ color: "#7CBBA6", fontSize: '35px' }} >Your Children</h1>
            <p style={{ color: "#7CBBA6" }}>Please select one of your children to view their results</p>
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
                                    justifyContent: 'center',
                                    width: '200px',
                                }}
                                onClick={() => onPressPatient(id)}
                            >
                                <Card
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        border: 'none',
                                        width: '90%',
                                        color: '#7CBBA6',
                                    }}
                                >
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '15px', color: '#7CBBA6' }}>
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
export { GuardianCards };