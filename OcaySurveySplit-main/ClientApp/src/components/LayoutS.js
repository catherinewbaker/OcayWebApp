import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import './Layout.css';
// import puzzleBackground from '../image/Alternative.png';

export class LayoutS extends Component {
    static displayName = LayoutS.name;

    render() {
        return (
            <div className="div1">
                <NavMenu />
                <div style={{ height: '100vh', backgroundImage: `url(${puzzleBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                    <Container tag="main" style={{ paddingTop: '2%' }}>
                        {this.props.children}
                    </Container>
                </div>
            </div>
        );
    }
}
