import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import PatientRoutes from './PatientRoutes';
import PhysicianRoutes from './PhysicianRoutes';
import GuardianRoutes from './GuardianRoutes';
import AuthRoutes from './AuthRoutes'
import { Layout } from './components/Layout';
import Login from './components/Login';
import './custom.css';
import tilt from './image/DogTilting.gif'
import axios from 'axios';
import { Col, Button, Row, Container, Card, Form, Modal } from "react-bootstrap";

class App extends Component {
    static displayName = App.name;

    state = {
        isAuthenticated: false, // Set initial authentication state here
        checkPatient: '1',
        loadingState: true,
    };

    // Function to check if the user is authenticated (you need to implement this)
    checkAuthentication = () => {
        const accessToken = localStorage.getItem('login'); // or sessionStorage.getItem('access_token');
        const isAuthenticated = !!accessToken; // Convert to a boolean (true if accessToken exists, false otherwise)
        this.setState({ isAuthenticated });
        if (isAuthenticated) {
            const userData = JSON.parse(localStorage.getItem('userInfo'));
            if (userData.isPatient === '1') {
                this.setState({ checkPatient: '1' });
            } else if (userData.isPatient === '0') {
                this.setState({ checkPatient: '0' });
            } else {
                this.setState({ checkPatient: '2' });
            }
        }
    };

    componentDidMount() {
        // Call the authentication function when the app loads to check if the user is authenticated
        this.checkAuthentication();
        // Start checking for loading state periodically
        this.checkLoadingInterval = setInterval(this.checkLoading, 5000); // Check every 5 seconds
    }

    componentWillUnmount() {
        // Clear the interval when the component is unmounted
        clearInterval(this.checkLoadingInterval);
    }

    checkLoading = async () => {
        const data = {
            Email: 'catherine.baker@ocay.org', Password: 'Asdf1234!'
        };

        try {
            const response = await axios.post('https://portal.ocay.org/api/Auth/login', data);
            console.log(response.data);
            this.setState({ loadingState: false });
            // Stop checking for loading state once it's successful
            clearInterval(this.checkLoadingInterval);

        } catch (error) {
            console.error(error.response.data);
            this.setState({ loadingState: true });
        }
    }

    render() {
        const { isAuthenticated, loadingState, checkPatient } = this.state;

        console.log(loadingState)

        const contents = loadingState ? (
            <Container>
                <br />
                <br />
                <br />
                <br />
                <br />
                <div className="d-flex justify-content-center">
                    <img src={tilt} alt="Responsive image" />
                </div>
                <br />
                <br />
                <p className="mb-0 text-center">
                    Thanks for choosing OCAY!
                </p>
                <br />
                <br />
                <p className="mb-0 text-center">
                    Please give us a moment while we contact our servers. If this takes longer than 2 minutes, please try relaoding the page, or contacting support.
                </p>

            </Container>
        ) : (
            <>
                {isAuthenticated && (checkPatient === '1') ? (
                    // If the user is authenticated and checkPatient says patient, render the patient routes
                    <Layout>
                        <Routes>
                            {PatientRoutes.map((route, index) => {
                                const { element, ...rest } = route;
                                return <Route key={index} {...rest} element={element} />;
                            })}
                        </Routes>
                    </Layout>
                ) : (isAuthenticated && (checkPatient === '2')) ? (
                    // If the user is authenticated and checkPatient says guardian, render the guardian routes
                    <Layout>
                        <Routes>
                            {GuardianRoutes.map((route, index) => {
                                const { element, ...rest } = route;
                                return <Route key={index} {...rest} element={element} />;
                            })}
                        </Routes>
                    </Layout>
                ) : isAuthenticated ? (
                    // If the user is authenticated but checkPatient is false, render the physician routes
                    <Layout>
                        <Routes>
                            {PhysicianRoutes.map((route, index) => {
                                const { element, ...rest } = route;
                                return <Route key={index} {...rest} element={element} />;
                            })}
                        </Routes>
                    </Layout>
                ) : (
                    // If the user is not authenticated, render the login page
                    <Routes>
                        {AuthRoutes.map((route, index) => {
                            const { element, ...rest } = route;
                            return <Route key={index} {...rest} element={element} />;
                        })}
                    </Routes>
                )}
            </>
        );

        return <>{contents}</>;
    }
}

export default App;