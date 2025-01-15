import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBTypography} from 'mdb-react-ui-kit';
import { Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'

const GuardianProfile = () => {
    const navigate = useNavigate();
    // Guardian information pulled from user data
    const [name, setName] = useState("");
    const [id, setId] = useState("");
    const [email, setEmail] = useState("");
    // Patient information 
    const [nameArray, setNameArray] = useState([]);
    const [idArray, setIdArray] = useState([]);
    const [scoreArray, setScoreArray] = useState([]);
    const [input, setInput] = useState();

    // Function to retrieve user data from localStorage and update state variables
    const getUserData = () => {
        const storedDataString = localStorage.getItem('userInfo');

        try {
            const userData = JSON.parse(storedDataString);
            setName(userData.fName + " " + userData.lName)
            setId(userData.userNumber)
            setEmail(userData.email)
            setInput(parseInt(userData.userNumber))
        } catch (error) {
            console.error("Error parsing 'userInfo' data from localStorage:", error);
        }
    }

    // Function to fetch connected user data from the API and update related state variables
    const getCons = async () => {
        const pInput = {
            UserNumber: input,
        }
        if (input === null || input === "") {
            console.log("input is null: " + input)
            return;
        } else {
            try {
                const response = await axios.post('https://portal.ocay.org/api/Auth/loadConnections', pInput);

                const dictionary = response.data.connectedUsers;
                const dataArray = Object.entries(dictionary).map(([key, value]) => ({ id: key, name: value }));

                const names = dataArray.map(item => item.name);
                const ids = dataArray.map(item => +item.id);

                setNameArray(names);
                setIdArray(ids);

            } catch (error) {
                console.log(error.message);
            }
        }
    }

    // Function to fetch scores for connected users from the API
    const getScores = async () => {
        try {
            const input2 = {
                IdArray: idArray,
            }
           
            const response2 = await axios.post('https://portal.ocay.org/api/Auth/getScore', input2);
            setScoreArray(response2.data.userScores)

        } catch (error) {
            console.error(error.message);
        }
    }

    // Function to delete the user's account
    const onPressDeleteAccount = async () => {
        try {
            const storedDataString = localStorage.getItem('userInfo')
            const userData = JSON.parse(storedDataString)

            const input = {
                UserNumber: parseInt(userData.userNumber),
            }

            const response = await axios.post('https://portal.ocay.org/api/Auth/deleteAccount', input);

            localStorage.clear()
            window.location.reload()


        } catch (error) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        getCons(); // Call getCons() when 'input' state changes
    }, [input]);

    useEffect(() => {
        getScores(); // Call getScores() when 'idArray' state changes
    }, [idArray]);

    return (
        <MDBContainer className="py-5" style={{ height: "100vh" }}>
            <MDBRow className="justify-content-center align-items-center">
                <MDBCol lg="8" className="mb-4 mb-lg-0">
                    <MDBCard className="p-4 mb-3" style={{ borderRadius: '.5rem' }}>
                        <MDBRow className="g-0">
                            <MDBCol
                                md="4"
                                className="gradient-custom text-center text-black d-flex flex-column justify-content-center position-relative"
                                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}
                            >
                                <div style={{ marginBottom: "35%" }}>
                                    <MDBTypography tag="h5">{name}</MDBTypography>
                                    <MDBCardText>Guardian</MDBCardText>
                                </div>

                                {/* Bottom buttons */}
                                <MDBRow className="position-absolute bottom-0 mb-4">
                                    <div>
                                        <Button onClick={() => { navigate('/change-password') }} style={{ color: "white", outline: "none", width: '90%', fontSize: "0.9em", marginBottom: '5%' }}>Change Password</Button>
                                        <Button onClick={onPressDeleteAccount} style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", outline: "none", width: '90%', fontSize: "0.9em", marginBottom: '5%' }}>Delete Account</Button>
                                    </div>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol md="8">
                                <MDBCardBody style={{padding:'20px 50px'}} className="p-4">
                                    <MDBTypography className="mt-3" style={{fontWeight: "bold"}} tag="h6">Information</MDBTypography>
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
                                                {nameArray.map((name, index) => (
                                                    <MDBCardText key={index} className="text-muted">
                                                        {name}
                                                    </MDBCardText>
                                                ))}
                                        </MDBCol>
                                        <MDBCol size="6" className="mb-3">
                                            <MDBTypography tag="h6">Recent Score</MDBTypography>
                                            {scoreArray.map((score, index) => (
                                                <MDBCardText key={index} className="text-muted">
                                                    {score !== -1 ? `${score} / 100` : 'No score available'}
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
            <p className="mb-0 text-center"> <em>This website is a work in progress! Please contact OCAY at team@ocay.org for bug reports, tech support, or questions.</em> </p>
        </MDBContainer>
    )

}
export { GuardianProfile };