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
                    <NavbarBrand style={{ marginLeft:"5px", fontWeight: "bold", color: "#333333" }}  tag={Link} to="/">
                        <img src={logo} alt="Responsive image" className="logo-image" /> Ocay <span className="survey-portal">Survey Portal </span>
                    </NavbarBrand>
                    <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                        <ul className="navbar-nav ml-auto" style={{ margin: '0', fontWeight: '500' }}> {/* Use 'ml-auto' to push items to the right */}
                            <NavItem>
                                <NavLink tag={Link} className="text" to="/">
                                    Home
                                </NavLink>
                            </NavItem>
                            { (isPatient == '1') && (
                                <NavItem>
                                    <NavLink tag={Link} className="text" to="/survey">
                                        Survey
                                    </NavLink>
                                </NavItem>
                            )}
                            <NavItem>
                                {/* Use the selectedRoute state variable to dynamically set the 'to' attribute */}
                                <NavLink tag={Link} className="text" to={selectedRoute}>
                                    Results
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                {/* Use the selectedRoute state variable to dynamically set the 'to' attribute */}
                                <NavLink tag={Link} className="text" to={selectedRoute2}>
                                    Profile
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <a className="nav-link logout" onClick={handleLogout} style={{ cursor: 'pointer' , color: '#adadad' }}>
                                    Logout
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