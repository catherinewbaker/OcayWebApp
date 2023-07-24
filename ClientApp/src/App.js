import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import PatientRoutes from './PatientRoutes';
import PhysicianRoutes from './PhysicianRoutes';
import AuthRoutes from './AuthRoutes'
import { Layout } from './components/Layout';
import Login from './components/Login';
import './custom.css';

class App extends Component {
    static displayName = App.name;

    state = {
        isAuthenticated: false, // Set initial authentication state here
        checkPatient: true,
    };

    // Function to check if the user is authenticated (you need to implement this)
    checkAuthentication = () => {
        const accessToken = localStorage.getItem('login'); // or sessionStorage.getItem('access_token');
        const isAuthenticated = !!accessToken; // Convert to a boolean (true if accessToken exists, false otherwise)
        this.setState({ isAuthenticated });
        if (isAuthenticated) {
            const userData = JSON.parse(localStorage.getItem('userInfo'));
            if (userData.isPatient === true) {
                this.setState({ checkPatient: true });
            } else {
                this.setState({ checkPatient: false });
            }
        }
    };

    componentDidMount() {
        // Call the authentication function when the app loads to check if the user is authenticated
        this.checkAuthentication();
    }

    render() {
        const { isAuthenticated } = this.state;
        const { checkPatient } = this.state;

        return (
            <>
                {isAuthenticated && checkPatient ? (
                    // If the user is authenticated and checkPatient is true, render the protected routes
                    <Layout>
                        <Routes>
                            {PatientRoutes.map((route, index) => {
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

    }
}

export default App;