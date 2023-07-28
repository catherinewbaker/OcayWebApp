import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBTypography, MDBInputGroup, MDBBtn  } from 'mdb-react-ui-kit';
import { Button } from "react-bootstrap";

const PatientProfile = () => {
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [physicianUserNumber, setPhysicianUserNumber] = useState("")
    const [error, setError] = useState("")

    const [nameArray, setNameArray] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const storedDataString = localStorage.getItem('userInfo');

        try {
            const userData = JSON.parse(storedDataString);
            setName(userData.fName + " " + userData.lName)
            setId(userData.userNumber)
            setEmail(userData.email)

            const input = {
                UserNumber: parseInt(userData.userNumber)
            }

            const response = await axios.post('https://localhost:44408/api/Auth/loadConnections', input);

            setNameArray(Object.values(response.data.connectedUsers));

            console.log(nameArray)


        } catch (error) {
            console.error(error.message);
        }
    }

    const onPressAdd = async () => {
        try {
            const inputPhys = parseInt(physicianUserNumber)

            if (isNaN(inputPhys) || physicianUserNumber.length !== 8) {
                setError("Please check your physician's ID number.")
            } else {

                const storedDataString = localStorage.getItem('userInfo')
                const userData = JSON.parse(storedDataString)
                
                setError("")
                const input = {
                    PatientUserNumber: parseInt(userData.userNumber),
                    PhysicianUserNumber: inputPhys
                }

                const response = await axios.post('https://localhost:44408/api/Auth/connectPhysician', input);

                window.location.reload()
            }


        } catch (error) {
            setError(error.response.data)
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
                                <div style={{marginBottom: "20%"}}>
                                    <MDBTypography tag="h5">{name}</MDBTypography>
                                    <MDBCardText>Patient</MDBCardText>
                                </div>

                                {/* Bottom buttons */}
                                <MDBRow className="position-absolute bottom-0">
                                    <div>
                                        <Button style={{ color: "black", outline: "none", width: '80%', fontSize: "0.9em", marginBottom: '5%' }}>Change Password</Button>
                                        <Button style={{ backgroundColor: "#ff4d4d", color: "black", border: "none", outline: "none", width: '80%', fontSize: "0.9em", marginBottom: '5%' }}>Delete Account</Button>
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

                                    <MDBTypography tag="h6">Your Physician</MDBTypography>

                                    <hr className="mt-0 mb-4" />

                                    {error !== '' && (
                                        <MDBCardText className="mb-1" style={{ color: "red", fontSize: "0.9em" }}>
                                            {error}
                                        </MDBCardText>
                                    )}

                                    <MDBRow className="align-items-center mb-3">
                                        <MDBCol size="12" className="">
                                            <MDBInputGroup>
                                                <input
                                                    className="form-control"
                                                    placeholder="Enter your physician's 8-digit ID to add a new physician."
                                                    style={{
                                                        fontSize: "0.9em",
                                                    }}
                                                    value={physicianUserNumber}
                                                    onChange={(event) => setPhysicianUserNumber(event.target.value)}

                                                />
                                                <MDBBtn style={{ color: "black", fontSize: "0.9em" }} onClick={onPressAdd}>Add</MDBBtn>
                                            </MDBInputGroup>
                                        </MDBCol>
                                    </MDBRow>


                                    <MDBRow className="pt-1">
                                        <MDBCol size="6" >
                                            <MDBTypography  tag="h6">Name</MDBTypography>
                                                {nameArray.map((name, index) => (
                                                    <MDBCardText key={index} className="text-muted mb-2">
                                                        Dr. {name}
                                                    </MDBCardText>
                                                ))}
                                        </MDBCol>
                                        <MDBCol size="6" className="mb-2">
                                            <MDBTypography tag="h6">Hospital</MDBTypography>
                                                {nameArray.map((name, index) => (
                                                    <MDBCardText key={index} className="text-muted mb-2">
                                                        Hospital Name
                                                    </MDBCardText>
                                                ))}
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
export { PatientProfile };