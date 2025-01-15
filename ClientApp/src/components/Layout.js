import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import './Layout.css';
// import puzzleBackground from '../image/Alternative.png';

// Provides the layout for the navbar component with the web pages
export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <div className="div1">
                <NavMenu />
                <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <Container tag="main">
                        {this.props.children}
                    </Container>
                </div>
            </div>
        );
    }
}