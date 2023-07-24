import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import logo from '../image/OCAY_logo.png';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.handleLogout = this.handleLogout.bind(this); // Bind the handleLogout function
        this.state = {
            collapsed: true
        };
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleLogout() {
        localStorage.removeItem('login');
        localStorage.removeItem('userInfo')

        window.location.reload()
    }

    render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                    <NavbarBrand tag={Link} to="/">
                        <img src={logo} alt="Responsive image" className="logo-image" /> Ocay Patient Portal
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                    <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
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
                                <NavLink tag={Link} className="text" to="/PatientResults">
                                    Results
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <a className="nav-link" onClick={this.handleLogout} style={{ cursor: 'pointer' }}>
                                    Logout
                                </a>
                            </NavItem>
                        </ul>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}
