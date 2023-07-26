import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography, MDBIcon } from 'mdb-react-ui-kit';
import { Button } from "react-bootstrap";

const PhysicianProfile = () => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const storedDataString = localStorage.getItem('userInfo');

        try {
            const userData = JSON.parse(storedDataString);
            setName(userData.fName + " " + userData.lName)
            setId(userData.userNumber)
            setEmail(userData.email)
        } catch (error) {
            console.error("Error parsing 'userInfo' data from localStorage:", error);
        }
    }


    return (
        <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
                <MDBCol lg="8" className="mb-4 mb-lg-0">
                    <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                        <MDBRow className="g-0">
                            <MDBCol
                                md="4"
                                className="gradient-custom text-center text-black d-flex flex-column justify-content-center position-relative"
                                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}
                            >
                                <div style={{ marginBottom: "20%" }}>
                                    <MDBTypography tag="h5">Dr. {name}</MDBTypography>
                                    <MDBCardText>Physician</MDBCardText>
                                </div>

                                {/* Bottom buttons */}
                                <MDBRow className="position-absolute bottom-0 w-55">
                                    <div>
                                        <Button style={{ color: "black", outline: "none", width: '90%', fontSize: "0.9em", marginBottom: '5%' }}>Change Password</Button>
                                        <Button style={{ backgroundColor: "#ff4d4d", color: "black", border: "none", outline: "none", width: '90%', fontSize: "0.9em", marginBottom: '5%' }}>Delete Account</Button>
                                    </div>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBCardBody className="p-4">
                                    <MDBTypography tag="h6">Information</MDBTypography>
                                    <hr className="mt-0 mb-4" />
                                    <MDBRow className="pt-1 mb-4">
                                        <MDBCol size="6" className="mb-3">
                                            <MDBTypography tag="h6">Email</MDBTypography>
                                            <MDBCardText className="text-muted">{email}</MDBCardText>
                                        </MDBCol>
                                        <MDBCol size="6" className="mb-3">
                                            <MDBTypography tag="h6">ID</MDBTypography>
                                            <MDBCardText className="text-muted">{id}</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>

                                    <MDBTypography tag="h6">Your Patients</MDBTypography>
                                    <hr className="mt-0 mb-4" />

                                    
                                    <MDBRow className="pt-1">
                                        <MDBCol size="6" className="mb-3">
                                            <MDBTypography tag="h6">Name</MDBTypography>
                                            <MDBCardText className="text-muted">Patient Name</MDBCardText>
                                        </MDBCol>
                                        <MDBCol size="6" className="mb-3">
                                            <MDBTypography tag="h6">Recent Score</MDBTypography>
                                            <MDBCardText className="text-muted">50 / 100</MDBCardText>
                                        </MDBCol>
                                    </MDBRow>

                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )

}
export { PhysicianProfile };