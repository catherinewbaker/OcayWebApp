import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthRoutes from './AuthRoutes'
import { Layout } from './components/Layout';
import Login from './components/Login';
import './custom.css';

class App extends Component {
    static displayName = App.name;

    state = {
        isAuthenticated: false, // Set initial authentication state here
    };

    // Function to check if the user is authenticated (you need to implement this)
    checkAuthentication = () => {
        const accessToken = localStorage.getItem('login'); // or sessionStorage.getItem('access_token');
        const isAuthenticated = !!accessToken; // Convert to a boolean (true if accessToken exists, false otherwise)
        this.setState({ isAuthenticated });
    };

    componentDidMount() {
        // Call the authentication function when the app loads to check if the user is authenticated
        this.checkAuthentication();
    }

    render() {
        const { isAuthenticated } = this.state;

        return isAuthenticated ? (
            // If the user is authenticated, render the protected routes
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                </Routes>
            </Layout>
        ) : (
            // If the user is not authenticated, render the login page
                
            <>
                <Routes>
                    {AuthRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                </Routes>
            </>
        );
    }
}

export default App;