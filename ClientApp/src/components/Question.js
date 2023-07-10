import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Container, Form, Row, Modal, Col, Card, ProgressBar } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import AWS from './authorization/aws';
import { MdPlayCircle, MdArrowCircleLeft, MdArrowCircleRight } from "react-icons/md";
import { SpeechToText } from './SpeechToText'
import { CustomSlider } from './CustomSlider'

const Question = () => {
    const navigate = useNavigate();
    const [answer, setAnswer] = useState('');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const onPressAnswer = ({ input }) => {
        setAnswer({ input })
    }

    const now = Math.round((questionIndex + 1) / 13 * 100);

    const cardsData = [
        {
            question: 'I feel ____ about the appointment today.',
            answers: [
                { imageSrc: require('../image/happy2.png'), description: 'Happy', color: '#56BF4F' },
                { imageSrc: require('../image/sad2.png'), description: 'Sad', color: '#088FDB' },
                { imageSrc: require('../image/fear2.png'), description: 'Fear', color: '#F4B000' },
                { imageSrc: require('../image/anger2.png'), description: 'Anger', color: '#AE0803' },
            ],
        },

        {
            question: 'I sometimes feel ____',
            answers: [
                { imageSrc: require('../image/nauseous.png'), description: 'Nauseous', color: '#56BF4F' },
                { imageSrc: require('../image/tired.png'), description: 'Fatigue', color: '#088FDB' },
                { imageSrc: require('../image/shortnessofbreath.png'), description: 'Shortness of breath', color: '#F4B000' },
                { imageSrc: require('../image/fever.png'), description: 'Fever', color: '#AE0803' },
            ],
        },

        {
            question: 'My treaments make me feel ____',
            answers: [
                { imageSrc: require('../image/anxious.png'), description: 'Anxious', color: '#088FDB' },
                { imageSrc: require('../image/scared.png'), description: 'Scared', color: '#AE0803' },
                { imageSrc: require('../image/ready.png'), description: 'Ready', color: '#F4B000' },
                { imageSrc: require('../image/supported.png'), description: 'Supported', color: '#56BF4F' },
            ],
        },

        {
            question: 'I eat ____ everyday.',
            answers: [
                { imageSrc: require('../image/happy.png'), description: 'Once a day' },
                { imageSrc: require('../image/happy.png'), description: 'Twice a day' },
                { imageSrc: require('../image/happy.png'), description: 'Three times a day' },
                { imageSrc: require('../image/happy.png'), description: 'More than three times a day' },
            ],
        },

        {
            question: 'At night, I wake up ____',
            answers: [
                { imageSrc: require('../image/happy.png'), description: 'No' },
                { imageSrc: require('../image/happy.png'), description: 'Sometimes' },
                { imageSrc: require('../image/happy.png'), description: 'Many times ' },
                { imageSrc: require('../image/happy.png'), description: 'Yes' },
            ],
        },

        {
            question: 'In school, I feel ____ about what is being taught.',
            answers: [
                { imageSrc: require('../image/happy.png'), description: 'Confused' },
                { imageSrc: require('../image/happy.png'), description: 'Confident' },
                { imageSrc: require('../image/happy.png'), description: 'Bored' },
                { imageSrc: require('../image/happy.png'), description: 'Excited' },
            ],
        },

        {
            question: 'I feel safe during my daily activities.',
            answers: [
                { imageSrc: require('../image/happy.png'), description: 'Yes' },
                { imageSrc: require('../image/happy.png'), description: 'Maybe' },
                { imageSrc: require('../image/happy.png'), description: 'No' },
                { imageSrc: require('../image/happy.png'), description: 'I don\'t know' },
            ],
        },

        {
            question: 'I have friends or classmates in school who I can spend time with',
            answers: [
                { imageSrc: require('../image/happy.png'), description: 'Yes' },
                { imageSrc: require('../image/happy.png'), description: 'Maybe' },
                { imageSrc: require('../image/happy.png'), description: 'No' },
                { imageSrc: require('../image/happy.png'), description: 'I don\'t know' },
            ],
        },

        {
            question: 'I feel ____ throughout the day.',
            answers: [
                { imageSrc: require('../image/happy.png'), description: 'Joy' },
                { imageSrc: require('../image/happy.png'), description: 'Sad' },
                { imageSrc: require('../image/happy.png'), description: 'Fear' },
                { imageSrc: require('../image/happy.png'), description: 'Anger' },
            ],
        },

        {
            question: 'Taking home medicines make me feel',
            answers: [
                { imageSrc: require('../image/happy.png'), description: 'Eager' },
                { imageSrc: require('../image/happy.png'), description: 'Sad' },
                { imageSrc: require('../image/happy.png'), description: 'Reluctant' },
                { imageSrc: require('../image/happy.png'), description: 'Anger' },
            ],
        },

        {
            question: 'During the week, I am active ____',
            answers: [
                { imageSrc: require('../image/happy.png'), description: 'Everyday' },
                { imageSrc: require('../image/happy.png'), description: 'Most of the week' },
                { imageSrc: require('../image/happy.png'), description: 'Less than half of the week' },
                { imageSrc: require('../image/happy.png'), description: 'Never' },
            ],
        },

        {
            question: 'On levels 1-10, I normally feel __ levels of pain.',
        },

        {
            question: 'Is there anything you want to tell us?'
        }
    ];

    const [isPlaying, setIsPlaying] = useState(false); // whether audio is playing or not
    const [audioElement, setAudioElement] = useState(new Audio()); // audio element for playing the synthesized speech

    const polly = new AWS.Polly(); // creating polly from AWS

    // specific parameters to call function synthesizeSpeech
    const params = {
        Text:
            //'<speak>I feel <prosody rate="slow" duration="2s"/>about the appointment today.</speak>', // Controlling speech speed
            '<speak>I feel <break time="1s"/>about the appointment today. <break time="0.5s"/> Happy <break time="0.5s"/> Sad <break time="0.5s"/> Fear <break time="0.5s"/> Anger <break time="0.5s"/> I do not wish to answer. </speak>',
        OutputFormat: 'mp3',
        VoiceId: 'Ruth',
        TextType: 'ssml',
    };

    // function that converts text to speech
    const synthesize = () => {
        polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                // creating an audio Blob from the audio data received from AWS Polly, converting to URL
                const audioBlob = new Blob([data.AudioStream], { type: 'audio/mpeg' });
                const audioUrl = URL.createObjectURL(audioBlob);

                // creating an HTML audio element and setting the audio source
                audioElement.src = audioUrl;
                audioElement.play();
                setIsPlaying(true);
            }
        });
    };

    // function called to toggle/untoggle play button
    const togglePlay = () => {
        if (isPlaying) {
            audioElement.pause();
            setIsPlaying(false);
        } else {
            console.log('hello')
            synthesize();
        }
    };

    const backButton = () => {
        if (questionIndex > 0) {
            setQuestionIndex(questionIndex - 1)
        }
        if (questionIndex == 0) {
            setShowModal(true)
        }
    }

    const forwardButton = () => {
        if (questionIndex <= 11) {
            setQuestionIndex(questionIndex + 1)
        }
    }

    const closeModal = () => {
        setShowModal(false);
    };

    const onPressExit = () => {
        navigate('/survey')
    }

    return (
        <Container className='' style={{ margin: 'auto' }}>

            <ProgressBar now={now} label={`${now}%`} style={{ width: '100%', height: '3vh', margin: 'auto' }} />

            <Container className="d-flex justify-content-center" style={{ marginTop: '20px' }}>
                <h1 className="mb-5 question">{cardsData[questionIndex].question}</h1>
                <MdPlayCircle
                    onClick={togglePlay}
                    style={{
                        cursor: "pointer",
                        fontSize: "3em",
                        color: "grey",
                        marginLeft: "10px",
                    }}
                />
            </Container>

            <Container className=" d-flex align-items-center justify-content-center" style={{ height: '15vh', marginBottom: '10px' }}>
                <h1>Put animation here</h1>
            </Container>

            {questionIndex < 11 && (
                <Container className=" d-flex justify-content-center" >
                    <Row>
                        {cardsData[questionIndex].answers.map((card, idx) => (
                            <Col key={idx} xs={3} md={3} lg={3} style={{ marginBottom: '20px' }}>
                                <Button className="btn-answer" style={{ backgroundColor: card.color, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }} >
                                    <Card style={{ backgroundColor: card.color, border: 'none', width: '100%' }}>
                                        <Card.Img variant="top" src={card.imageSrc} />
                                        <Card.Body className="text-center">
                                            <Card.Title className="card-title">{card.description}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Button>
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}

            {questionIndex < 11 && (
                <Container className=' d-flex justify-content-center'>
                    <Button className='btn-idonot d-flex justify-content-center align-items-center' style={{ backgroundColor: 'rgba(218, 223, 225,1)' }}>
                        <Card style={{ backgroundColor: 'rgba(218, 223, 225,1)', border: 'none' }}>
                            <Card.Title style={{ margin: 'auto' }}>I do not wish to answer.</Card.Title>
                        </Card>
                    </Button>
                </Container>
            )}

            {questionIndex === 11 && (
                // put scale 1-10 here
                <CustomSlider />

            )}

            {questionIndex == 12 && (
                <SpeechToText />
            )}

            <Container className="d-flex justify-content-center align-items-end">
                <div className="mt-auto"></div>
                <Container className="arrow-container">
                    <MdArrowCircleLeft
                        style={{
                            cursor: "pointer",
                            fontSize: "4em",
                            color: "#79D4AC",
                        }}
                        onClick={backButton}
                    />

                    <MdArrowCircleRight
                        style={{
                            cursor: "pointer",
                            fontSize: "4em",
                            color: "#79D4AC",
                        }}
                        onClick={forwardButton}
                    />
                </Container>
            </Container>

            <Modal show={showModal} onHide={closeModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to exit the survey? We will miss you :(
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onPressExit}>Exit</Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
};

export { Question };
