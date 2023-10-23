import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBTypography, MDBInputGroup, MDBBtn } from 'mdb-react-ui-kit';
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import '../custom.css';

const PatientProfile = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    const [physicianUserNumber, setPhysicianUserNumber] = useState("")
    const [error, setError] = useState("")
    const [nameArray, setNameArray] = useState({});

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

            const response = await axios.post('https://portal.ocay.org/api/Auth/loadConnections', input);

            setNameArray(response.data.connectedUsers);


        } catch (error) {
            console.error(error.message);
        }
    }

    const onPressAdd = async () => {
        try {
            const inputPhys = parseInt(physicianUserNumber)

            if (isNaN(inputPhys) || physicianUserNumber.length !== 8) {
                setError("Please check your guardian's ID number.")
                
            } else {
                const storedDataString = localStorage.getItem('userInfo')
                const userData = JSON.parse(storedDataString)
                setError("")
                const input = {
                    PatientUserNumber: parseInt(userData.userNumber),
                    PhysicianUserNumber: inputPhys
                }
                console.log(userData.userNumber)
                console.log(inputPhys)

                const res = await axios.post('https://portal.ocay.org/api/Auth/connectPhysician', input);
                console.log(res)
                window.location.reload()
            }


        } catch (error) {
            console.log(error)
            setError(error.response.data)
        }
    } // 86328226

    const onPressDelete = async () => {
        try {
            const inputPhys = parseInt(physicianUserNumber)

            if (isNaN(inputPhys) || physicianUserNumber.length !== 8) {
                setError("Please check your guardian's ID number.")
            } else {

                const storedDataString = localStorage.getItem('userInfo')
                const userData = JSON.parse(storedDataString)

                setError("")
                const input = {
                    PatientUserNumber: parseInt(userData.userNumber),
                    PhysicianUserNumber: inputPhys
                }

                await axios.post('https://portal.ocay.org/api/Auth/disconnectPhysician', input);
                
                window.location.reload()
            }
            


        } catch (error) {
            setError(error.response.data)
        }
    }

    const onPressDeleteAccount = async () => {
        try {
            const storedDataString = localStorage.getItem('userInfo')
            const userData = JSON.parse(storedDataString)

            const input = {
                UserNumber: parseInt(userData.userNumber),
            }

            await axios.post('https://portal.ocay.org/api/Auth/deleteAccount', input);

            localStorage.clear()
            window.location.reload()

        } catch (error) {
            console.log(error.response.data)
        }
    }



    return (
        <MDBContainer className="py-5" style={{ height: "100vh" }}>
            <MDBRow className="justify-content-center align-items-center">
                <MDBCol lg="8" className="mb-4 mb-lg-0">
                    <MDBCard className="mb-3" style={{ borderRadius: '.5rem' }}>
                        <MDBRow className="g-0">
                            <MDBCol
                                md="4"
                                className="gradient-custom text-center text-black d-flex flex-column justify-content-center position-relative"
                                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}
                            >
                                <div style={{ marginBottom: "20%" }}>
                                    <MDBTypography tag="h5">{name}</MDBTypography>
                                    <MDBCardText>Patient</MDBCardText>
                                </div>

                                {/* Bottom buttons */}
                                <MDBRow className="position-absolute bottom-0">
                                    <div>
                                        <Button onClick={() => { navigate('/change-password') }} style={{ backgroundColor: "#79D4AC", color: "white", outline: "none", width: '80%', fontSize: "0.9em", marginBottom: '5%' }}>Change Password</Button>
                                        <Button onClick={onPressDeleteAccount} style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", outline: "none", width: '80%', fontSize: "0.9em", marginBottom: '5%' }}>Delete Account</Button>
                                    </div>
                                </MDBRow>
                            </MDBCol>

                            <MDBCol md="8">
                                <MDBCardBody className="p-4">
                                    <MDBTypography tag="h6">Your Information</MDBTypography>
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

                                    <MDBTypography tag="h6">Your Guardians</MDBTypography>

                                    <hr className="mt-0 mb-4" />

                                    {error !== '' && (
                                        <MDBCardText className="mb-1" style={{ color: "red", fontSize: "0.9em" }}>
                                            {error}
                                        </MDBCardText>
                                    )}

                                    <MDBRow className="align-items-center mb-3" >
                                        <MDBCol size="12" className="">
                                            <MDBInputGroup style={{ height: "36px" }}>
                                                <input
                                                    className="form-control"
                                                    placeholder="Enter your guardian's 8-digit ID to add or delete"
                                                    style={{
                                                        fontSize: "0.9em",
                                                    }}
                                                    value={physicianUserNumber}
                                                    onChange={(event) => setPhysicianUserNumber(event.target.value)}

                                                />
                                                <MDBBtn style={{ backgroundColor: "#79D4AC", color: "white", fontSize: "0.9em", border: "none", outline: "none", height: "100%", width: "13%" }} onClick={onPressAdd}>Add</MDBBtn>
                                                <MDBBtn style={{ color: "white", fontSize: "0.9em", backgroundColor: "#ff4d4d", border: "none", outline: "none", height: "100%", width: "16%" }} onClick={onPressDelete}>Delete</MDBBtn>
                                            </MDBInputGroup>
                                        </MDBCol>
                                    </MDBRow>


                                    <MDBRow className="pt-1">
                                        <MDBCol size="6" >
                                            <MDBTypography tag="h6">Name</MDBTypography>
                                            {Object.values(nameArray).map((name, index) => (
                                                <MDBCardText key={index} className="text-muted mb-2">
                                                    {name}
                                                </MDBCardText>
                                            ))}
                                        </MDBCol>
                                        <MDBCol size="6" className="mb-2">
                                            <MDBTypography tag="h6">Guardian ID</MDBTypography>
                                            {Object.keys(nameArray).map((id, index) => (
                                                <div key={index} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                                    <MDBCardText style={{ flex: 1 }} className="text-muted mb-2">
                                                        {id}
                                                    </MDBCardText>
                                                </div>
                                            ))}
                                        </MDBCol>
                                    </MDBRow>

                                </MDBCardBody>
                            </MDBCol>
                        </MDBRow>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <br />
            <br />
            <p className="mb-0 text-center"> <em>This website is a work in progress! Please contact OCAY at team@ocay.org for bug reports, tech support, or questions.</em> </p>
        </MDBContainer>
    )

}
export { PatientProfile };