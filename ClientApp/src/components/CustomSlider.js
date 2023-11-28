import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Container, Form, Row, Modal, Col, Card, ProgressBar, Image } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import { styled } from '@mui/material/styles';
import Level1 from "../image/happyPain.png"
import Level5 from "../image/middlePain.png"
import Level10 from "../image/sadPain.png"

const CustomSlider = ({ q12, onQ12Change }) => {

    const marks = [
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
        {
            value: 4,
            label: '4',
        },
        {
            value: 5,
            label: '5',
        },
        {
            value: 6,
            label: '6',
        },
        {
            value: 7,
            label: '7',
        },
        {
            value: 8,
            label: '8',
        },
        {
            value: 9,
            label: '9',
        },
        {
            value: 10,
            label: '10',
        },
    ];

    const handleSliderChange = (event) => {
        const value = event.target.value;
        onQ12Change(value);
    };

    // Custom styles for the Slider
    const CustomSliderComponent = styled(Slider)(({ theme }) => ({
        color: '#79D4AC', // Custom color (replace with desired color)
        height: 10, // Increase the height for a thicker slider
        '& .MuiSlider-thumb': {
            height: 20, // Increase the height of the thumb
            width: 20, // Increase the width of the thumb
        },
        '& .MuiSlider-track': {
            height: 10, // Increase the height of the track
        },
        '& .MuiSlider-rail': {
            height: 10, // Increase the height of the rail
        },
        '& .MuiSlider-valueLabel': {
            fontSize: 14, // Adjust the font size as per your preference
            color: '#FFFFFF', // Adjust the color of the value label
            background: 'rgba(90, 156, 127, 1)', // Adjust the background color of the value label
            borderRadius: 4, // Adjust the border radius of the value label
            padding: '4px 8px', // Adjust the padding of the value label
        },
    }));

    return (

        <Container className='d-flex justify-content-center flex-column align-items-center' style={{ paddingTop: '5vh', paddingBottom: '70px' }}>
            <Row className="justify-content-center" style={{ width: '80%' }}>
                <Col>
                    <CustomSliderComponent
                        aria-label="Always visible"
                        step={1}
                        min={1}
                        max={10}
                        marks={marks}
                        valueLabelDisplay="auto"
                        onChange={handleSliderChange}
                        value={q12}
                    />
                </Col>
            </Row>

            <Row className="justify-content-center mt-5" style={{ width: '100%' }}>
                <Col xs={4} sm={4} md={4} className="text-center">
                    <Image src={Level1} width="40%" />
                </Col>
                <Col xs={4} sm={4} md={4} className="text-center">
                    <Image src={Level5} width="40%" />
                </Col>
                <Col xs={4} sm={4} md={4} className="text-center">
                    <Image src={Level10} width="40%" />
                </Col>
            </Row>
        </Container>
    )
}

export { CustomSlider }
