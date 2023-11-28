import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Container, Form, Row, Modal, Col, Card, ProgressBar } from 'react-bootstrap';
import Slider from '@mui/material/Slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import AWS from './authorization/aws';
import { MdPlayCircle, MdArrowCircleLeft, MdArrowCircleRight, MdVolumeMute } from "react-icons/md";
import { RiPlayFill, RiVolumeUpFill, RiVolumeMuteFill } from "react-icons/ri";
import { SpeechToText } from './SpeechToText'
import { CustomSlider } from './CustomSlider'
import axios from 'axios'
import back from '../image/DogBackflip.gif'
import chase from '../image/DogChasing.gif'
import eat from '../image/DogEating.gif'
import play from '../image/DogPlaying.gif'
import roll from '../image/DogRolling.gif'
import run from '../image/DogRunning.gif'
import sit from '../image/DogSitting.gif'
import sleep from '../image/DogSleeping.gif'
import tilt from '../image/DogTilting.gif'
import walk from '../image/DogWalking.gif'

const Question = () => {
    const navigate = useNavigate();
    const [answer, setAnswer] = useState('');
    const [questionIndex, setQuestionIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [showCompleteModal, setShowCompleteModal] = useState(false);
    const [showDogModal, setShowDogModal] = useState(false);
    const [dogGif, setDogGif] = useState('../image/DogBackflip');
    const [buttonActive, setButtonActive] = useState(false);
    const [q1, setQ1] = useState([]);
    const [q2, setQ2] = useState([]);
    const [q3, setQ3] = useState([]);
    const [q4, setQ4] = useState([]);
    const [q5, setQ5] = useState([]);
    const [q6, setQ6] = useState([]);
    const [q7, setQ7] = useState([]);
    const [q8, setQ8] = useState([]);
    const [q9, setQ9] = useState([]);
    const [q10, setQ10] = useState([]);
    const [q11, setQ11] = useState([]);
    const [q12, setQ12] = useState(5);
    const [q13, setQ13] = useState("");
    const [mute, setMute] = useState(false);
    const [last, setLast] = useState(0);

    var dogArray = [back, chase, eat, play, roll, run, sit, sleep, tilt, walk]

    const whichDog = () => {
        let indexArray = JSON.parse(localStorage.getItem('indexArray')) || [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let reset = indexArray.every((val) => val === 1);

        if (reset) {
            indexArray = indexArray.map(() => 0);
        }

        let ind = Math.floor(Math.random() * 10);
        while (indexArray[ind] === 1 || ind === last) {
            ind = (ind + 1) % 10;
        }

        indexArray[ind] = 1;
        localStorage.setItem('indexArray', JSON.stringify(indexArray));

        setLast(ind)
        setDogGif(dogArray[ind]);
    };

    const onPressAnswer = (questionIndex, description) => {

        // Get the corresponding state setter function based on the question index
        const setAnswer = getSetAnswerFunction(questionIndex);

        if (description === "I do not wish to answer.") {
            // If "I do not wish to answer" is selected, set the array with only that description
            const isSelected = getSelectedAnswers(questionIndex).includes(description);
            if (isSelected) {
                setAnswer([])
            } else {
                setAnswer(["I do not wish to answer."]);
            }
        } else if (questionIndex === 3 || questionIndex === 4 || questionIndex === 6 || questionIndex === 7 || questionIndex === 10) {
            const isSelected = getSelectedAnswers(questionIndex).includes(description);
            if (isSelected) {
                setAnswer([])
            } else {
                setAnswer([description]);
            }
        } else {
            // Check if the selected answer choice is already in the array
            const isSelected = getSelectedAnswers(questionIndex).includes(description);

            if (isSelected) {
                // If it is selected, remove it from the array
                const updatedAnswers = getSelectedAnswers(questionIndex).filter((answer) => answer !== description);
                setAnswer(updatedAnswers);
            } else {
                // If it is not selected, add it to the array
                const updatedAnswers = [...getSelectedAnswers(questionIndex), description].filter(answer => answer !== "I do not wish to answer.");
                setAnswer(updatedAnswers);
            }
        }
    };

    const getSetAnswerFunction = (questionIndex) => {
        // Return the corresponding state setter function based on the question index
        switch (questionIndex) {
            case 0:
                return setQ1;
            case 1:
                return setQ2;
            case 2:
                return setQ3;
            case 3:
                return setQ4;
            case 4:
                return setQ5;
            case 5:
                return setQ6;
            case 6:
                return setQ7;
            case 7:
                return setQ8;
            case 8:
                return setQ9;
            case 9:
                return setQ10;
            case 10:
                return setQ11
            case 11:
                return setQ12;
            case 12:
                return setQ13;
            default:
                return null;
        }
    };

    const getSelectedAnswers = (questionIndex) => {
        // Return the corresponding selected answers array based on the question index
        switch (questionIndex) {
            case 0:
                return q1;
            case 1:
                return q2;
            case 2:
                return q3;
            case 3:
                return q4;
            case 4:
                return q5;
            case 5:
                return q6;
            case 6:
                return q7;
            case 7:
                return q8;
            case 8:
                return q9;
            case 9:
                return q10;
            case 10:
                return q11
            case 11:
                return q12;
            case 12:
                return q13;
            default:
                return [];
        }
    };

    const handleQ12Change = (value) => {
        setQ12(value);
    };

    const handleQ13Change = (value) => {
        setQ13(value);
    };

    const now = Math.round((questionIndex + 1) / 13 * 100);

    const cardsData = [
        {
            question: 'I feel ____ about the appointment today.',
            answers: [
                { imageSrc: require('../image/1.png'), description: 'Happy', color: '#8074b5' },
                { imageSrc: require('../image/2.png'), description: 'Sad', color: '#fbf0d6' },
                { imageSrc: require('../image/3.png'), description: 'Fear', color: '#4fa75a' },
                { imageSrc: require('../image/4.png'), description: 'Anger', color: '#6d7b84' },
            ],
        },

        {
            question: 'I sometimes feel ____',
            answers: [
                { imageSrc: require('../image/5.png'), description: 'Fever', color: '#8074b5' },
                { imageSrc: require('../image/6.png'), description: 'Fatigue', color: '#fbf0d6' },
                { imageSrc: require('../image/7.png'), description: 'Shortness of breath', color: '#4fa75a' },
                { imageSrc: require('../image/8.png'), description: 'Nauseous', color: '#6d7b84' },
            ],
        },

        {
            question: 'My treaments make me feel ____', 
            answers: [
                { imageSrc: require('../image/9.png'), description: 'Anxious', color: '#8074b5' },
                { imageSrc: require('../image/10.png'), description: 'Scared', color: '#fbf0d6' },
                { imageSrc: require('../image/11.png'), description: 'Ready', color: '#4fa75a' },
                { imageSrc: require('../image/12.png'), description: 'Supported', color: '#6d7b84' },
            ],
        },

        {
            question: 'I eat ____ everyday.',
            answers: [
                { imageSrc: require('../image/oneFood.png'), description: 'Once a day', color: '#8074b5' },
                { imageSrc: require('../image/twoFood.png'), description: 'Twice a day', color: '#fbf0d6' },
                { imageSrc: require('../image/threeFood.png'), description: 'Three times a day', color: '#4fa75a' },
                { imageSrc: require('../image/fourFood.png'), description: 'More than three times a day', color: '#6d7b84' },
            ],
        },

        {
            question: 'At night, I wake up ____', // this section is not done
            answers: [
                { imageSrc: require('../image/13.png'), description: 'No', color: '#8074b5' },
                { imageSrc: require('../image/14.png'), description: 'Sometimes', color: '#fbf0d6' },
                { imageSrc: require('../image/15.png'), description: 'Many times', color: '#4fa75a' },
                { imageSrc: require('../image/16.png'), description: 'Yes', color: '#6d7b84' },
            ],
        },

        {
            question: 'In school, I feel ____ about what is being taught.',
            answers: [
                { imageSrc: require('../image/17.png'), description: 'Confused', color: '#8074b5' },
                { imageSrc: require('../image/18.png'), description: 'Confident', color: '#fbf0d6' },
                { imageSrc: require('../image/19.png'), description: 'Bored', color: '#4fa75a' },
                { imageSrc: require('../image/20.png'), description: 'Excited', color: '#6d7b84' },
            ],
        },

        {
            question: 'I feel safe during my daily activities.', // this section is not done
            answers: [
                { imageSrc: require('../image/21.png'), description: 'Yes', color: '#8074b5' },
                { imageSrc: require('../image/22.png'), description: 'Maybe', color: '#fbf0d6' },
                { imageSrc: require('../image/23.png'), description: 'No', color: '#4fa75a' },
                { imageSrc: require('../image/24.png'), description: 'I don\'t know', color: '#6d7b84' },
            ],
        },

        {
            question: 'I have friends or classmates in school who I can spend time with', // this section is not done
            answers: [
                { imageSrc: require('../image/21.png'), description: 'Yes', color: '#8074b5' },
                { imageSrc: require('../image/22.png'), description: 'Maybe', color: '#fbf0d6' },
                { imageSrc: require('../image/23.png'), description: 'No', color: '#4fa75a' },
                { imageSrc: require('../image/24.png'), description: 'I don\'t know', color: '#6d7b84' },
            ],
        },

        {
            question: 'I feel ____ throughout the day.',
            answers: [
                { imageSrc: require('../image/25.png'), description: 'Joy', color: '#8074b5' },
                { imageSrc: require('../image/26.png'), description: 'Sad', color: '#fbf0d6' },
                { imageSrc: require('../image/3.png'), description: 'Fear', color: '#4fa75a' },
                { imageSrc: require('../image/4.png'), description: 'Anger', color: '#6d7b84' },
            ],
        },

        {
            question: 'Taking home medicines make me feel',
            answers: [
                { imageSrc: require('../image/27.png'), description: 'Eager', color: '#8074b5' },
                { imageSrc: require('../image/26.png'), description: 'Sad', color: '#fbf0d6' },
                { imageSrc: require('../image/28.png'), description: 'Reluctant', color: '#4fa75a' },
                { imageSrc: require('../image/4.png'), description: 'Anger', color: '#6d7b84' },
            ],
        },

        {
            question: 'During the week, I am active ____', // this section is not done yet
            answers: [
                { imageSrc: require('../image/21.png'), description: 'Yes', color: '#8074b5' },
                { imageSrc: require('../image/29.png'), description: 'Most of the week', color: '#fbf0d6' },
                { imageSrc: require('../image/30.png'), description: 'Less than half of the week', color: '#4fa75a' },
                { imageSrc: require('../image/31.png'), description: 'Never', color: '#6d7b84' },
            ],
        },

        {
            question: 'On levels 1-10, I normally feel __ levels of pain.',
        },

        {
            question: 'Is there anything you want to tell us?'
        }
    ];

    useEffect(() => {
        if (!mute) {
            let question = cardsData[questionIndex].question;
            let answers = cardsData[questionIndex].answers;
            let inputString = createAWSinput(questionIndex, question, answers);
            synthesize(inputString);
        }
    }, [questionIndex, mute]);

    const [audioElement, setAudioElement] = useState(new Audio()); // audio element for playing the synthesized speech

    const polly = new AWS.Polly(); // creating polly from AWS

    const synthesize = (input) => {
        const params = {
            Text: input,
            OutputFormat: 'mp3',
            VoiceId: 'Ruth',
            TextType: 'ssml',
            Engine: "neural"
        };

        polly.synthesizeSpeech(params, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const audioBlob = new Blob([data.AudioStream], { type: 'audio/mpeg' });
                const audioUrl = URL.createObjectURL(audioBlob);

                audioElement.src = audioUrl;
                audioElement.play();
            }
        });
    };

    // function called to toggle/untoggle play button
    const togglePlay = () => {
        if (!mute) {
            synthesize(createAWSinput(questionIndex, cardsData[questionIndex].question, cardsData[questionIndex].answers));
        }
    };

    const createAWSinput = (index, question, answers) => {
        let result = "<speak> ";

        if (index <= 10) {
            if (question.includes("____")) {
                let helper = question.replace("____", "<break time=\"1s\"/>");
                result += helper
            } else {
                result += question
            }

            // Adding answers to the result
            for (const answer of answers) {
                const { imageSrc, description } = answer;
                result += `<break time=\"0.5s\"/> ${description} `;
            }

            result += "<break time=\"0.5s\"/> I do not wish to answer. </speak>";
        }

        if (index == 11) {
            let helper = question.replace("__", "<break time=\"1s\"/>");
            result += helper
            result += " Click on the scale to change your level. </speak>"

        }

        if (index == 12) {
            result += question
            result += " <break time=\"0.5s\"/> Press the record button to talk about something or type in your thoughts. </speak>"

        }



        return result;
    };

    const onPressMute = () => {
        if (mute == false) {
            audioElement.pause();
        }
        setMute((prevMute) => !prevMute);
    }
    const backButton = () => {
        if (questionIndex > 0) {
            setQuestionIndex(questionIndex - 1)
        }
        if (questionIndex == 0) {
            setShowModal(true)
        }
    }

    const forwardButton = () => {
        // put logic to call synthesize function
        if (questionIndex !== 12 && getSelectedAnswers(questionIndex).length === 0) {
            setShowQuestionModal(true)
        } else {

            if (questionIndex <= 10) {
                setQuestionIndex(questionIndex + 1)
                console.log(eval(`q${questionIndex + 1}`));
                whichDog();
                setShowDogModal(true);
            }
            if (questionIndex == 11) {
                setQuestionIndex(questionIndex + 1)
                whichDog();
                setShowDogModal(true);
            }
            if (questionIndex == 12) {
                // check if any of the answer arrays are empty except q13, render popup warning if empty, render loading animation if answers are all filled
                whichDog();
                setShowDogModal(true);
                setShowCompleteModal(true)
            }
        }

    }

    const closeModal = () => {
        setShowModal(false);
    };

    const closeQuestionModal = () => {
        setShowQuestionModal(false)
        setShowCompleteModal(false)
    }

    const closeDogModal = () => {
        setShowDogModal(false);
    }

    const onPressExit = () => {
        navigate('/survey')
    }

    const onPressComplete = async () => {
        var object = JSON.parse(localStorage.getItem('userInfo'))

        const data = {
            UserNumber: object.userNumber,
            q1,
            q2,
            q3,
            q4,
            q5,
            q6,
            q7,
            q8,
            q9,
            q10,
            q11,
            q12,
            q13
        };

        try {
            const response = await axios.post('https://portal.ocay.org/api/Auth/postSurvey', data);
            console.log(response);
            navigate('/PatientResults')
        } catch (error) {
            //console.error(error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error("Data:", error.response.data);
                console.error("Status:", error.response.status);
                console.error("Headers:", error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Request:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error("Error:", error.message);
            }
            console.error("Config:", error.config);
        }
    };


    return (

        <Container className='mt-4' style={{ margin: 'auto' }}>
            <Container className="d-flex justify-content-center" style={{ }}>
                <ProgressBar now={now} label={`${now}%`} style={{ width: '78%', height: '3vh', marginRight:'30px' }} />
                <h2 className="ml-2">{questionIndex + 1} / 13</h2>
            </Container>

            <Container className="d-flex justify-content-center" style={{ marginTop: '20px' }}>
                <Container className="d-flex justify-content-center">

                {!mute ? (
                    <RiVolumeUpFill
                        onClick={onPressMute}
                        style={{
                            cursor: "pointer",
                            fontSize: "2.8em",
                            color: "grey",
                        }}
                    />
                ) : (
                    <RiVolumeMuteFill
                        onClick={onPressMute}
                        style={{
                            cursor: "pointer",
                            fontSize: "2.8em",
                            color: "grey",
                        }}
                    />
                )} 
                    <h1 className="mb-1 question" style={{ marginLeft: '15px',marginRight: '15px', textAlign: 'center' }}>{cardsData[questionIndex].question}</h1>
                    <MdPlayCircle
                        onClick={togglePlay}
                        style={{
                            cursor: "pointer",
                            fontSize: "2.8em",
                            color: "grey",
                        }}
                    />
                </Container>

                
            </Container>

            {![3, 4, 6, 7, 10, 11, 12].includes(questionIndex) && (
                <Container className="d-flex align-items-center justify-content-center">
                    <p>(You can select multiple answer choices if you'd like!)</p>
                </Container>
            )}

            <Container className=" d-flex align-items-center justify-content-center" style={{ height: '10vh', marginTop:'50px',marginBottom: '10px' }}>
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

            {questionIndex < 11 && (
                <Container className=" d-flex justify-content-center" >
                    <Row>
                        {cardsData[questionIndex].answers.map((card, idx) => (
                            <Col key={idx} xs={3} md={3} lg={3} style={{ marginBottom: '20px' }}>
                                <Button onClick={() => onPressAnswer(questionIndex, card.description)} className={`btn-answer ${getSelectedAnswers(questionIndex).includes(card.description) ? 'active' : ''}`} style={{ backgroundColor: 'white', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }} >
                                    <Card style={{ backgroundColor: 'white', border: 'none', height: '100%' }}>
                                        <Card.Img variant="top" src={card.imageSrc} />
                                    </Card>
                                </Button>
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}

            {questionIndex < 11 && (
                <Container className=' d-flex justify-content-center'>
                    <Button
                        onClick={() => onPressAnswer(questionIndex, "I do not wish to answer.")}
                        className={`btn-idonot d-flex justify-content-center align-items-center ${getSelectedAnswers(questionIndex).includes("I do not wish to answer.") ? 'active' : ''}`}
                        style={{ borderColor:'#5fccab',  borderRadius:'10px', backgroundColor: 'white' }}
                    >
                        <Card style={{ border: 'none' }}>
                            <Card.Title style={{ color:'#5fccab', margin: 'auto' }}>I do not wish to answer.</Card.Title>
                        </Card>
                    </Button>
                </Container>
            )}

            {questionIndex === 11 && (
                // put scale 1-10 here
                <CustomSlider q12={q12} onQ12Change={handleQ12Change} />

            )}

            {questionIndex == 12 && (
                <SpeechToText q13={q13} onQ13Change={setQ13} />
            )}

            

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

            <Modal show={showQuestionModal} onHide={closeQuestionModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please make sure to answer the question before you move on!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={closeQuestionModal}>Okay</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showCompleteModal} onHide={closeQuestionModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Complete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Please make sure to double check your answers before you move on!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={onPressComplete}>See Result</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showDogModal} onHide={closeDogModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>You're doing great!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center">
                        <img style={{ width: "80%" }} src={dogGif} alt="Responsive" />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={closeDogModal}>Close</Button>
                </Modal.Footer>
            </Modal>


        </Container>
    );
};

export { Question };