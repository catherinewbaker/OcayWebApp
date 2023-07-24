import React, { Component, useState, useEffect } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import logo from '../image/OCAY_logo.png';

const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const [selectedRoute, setSelectedRoute] = useState('/PatientResults');

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = () => {
        localStorage.removeItem('login');
        localStorage.removeItem('userInfo');
        window.location.reload();
    };

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userInfo'));
        if (userData.isPatient === false) {
            setSelectedRoute('/PhysicianResults');
        } else {
            setSelectedRoute('/PatientResults');
        }
    }, []);

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">
                    <img src={logo} alt="Responsive image" className="logo-image" /> Ocay Patient Portal
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text" to="/">
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text" to="/survey">
                                Survey
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            {/* Use the selectedRoute state variable to dynamically set the 'to' attribute */}
                            <NavLink tag={Link} className="text" to={selectedRoute}>
                                Results
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <a className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                Logout
                            </a>
                        </NavItem>
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
};

export { NavMenu };