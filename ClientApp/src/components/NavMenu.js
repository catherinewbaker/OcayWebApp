import React, { Component, useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { useNavigate } from 'react-router-dom'
import logo from '../image/whiteLogo.png';

const NavMenu = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(true);
    const [selectedRoute, setSelectedRoute] = useState('/PatientResults');
    const [selectedRoute2, setSelectedRoute2] = useState('/PatientProfile');
    const [isPatient, setIsPatient] = useState('')

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
        localStorage.removeItem('login');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('patientID');
        navigate("/")
        window.location.reload();
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userInfo'));
        if (userData.isPatient == '1') {
            setSelectedRoute('/PatientResults');
            setSelectedRoute2('/PatientProfile');
            setIsPatient('1')
        } else if (userData.isPatient == '2') {
            setSelectedRoute('/GuardianCards');
            setSelectedRoute2('/GuardianProfile');
            setIsPatient('2');
        } else {
            setSelectedRoute('/PhysicianCards');
            setSelectedRoute2('/PhysicianProfile');
            setIsPatient('0');
        }
    }, []);

    return (
        <header>
            <div className="container-fluid" style={{ padding: '0' }}>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow" light style={{ margin: '0' }}>
                    <NavbarBrand tag={Link} to="/">
                        <img src={logo} alt="Responsive image" style={{ height: '15%', width: '20%' }} className="logo-image" /> <b>Ocay Patient Portal</b>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                        <ul className="navbar-nav ml-auto" style={{ margin: '0' }}> {/* Use 'ml-auto' to push items to the right */}
                            <NavItem>
                                <NavLink tag={Link} className="text" to="/">
                                    <b>Home</b>
                                </NavLink>
                            </NavItem>
                            { (isPatient == '1') && (
                                <NavItem>
                                    <NavLink tag={Link} className="text" to="/survey">
                                        <b>Survey</b>
                                    </NavLink>
                                </NavItem>
                            )}
                            <NavItem>
                                {/* Use the selectedRoute state variable to dynamically set the 'to' attribute */}
                                <NavLink tag={Link} className="text" to={selectedRoute}>
                                <b>Results</b>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                {/* Use the selectedRoute state variable to dynamically set the 'to' attribute */}
                                <NavLink tag={Link} className="text" to={selectedRoute2}>
                                <b>Profile</b>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <a className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                    <b>Logout</b>
                                </a>
                            </NavItem>
                        </ul>
                    </Collapse>
                </Navbar>
            </div>
        </header>
    );




};

export { NavMenu };