import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { MdOutlineStopCircle } from "react-icons/md";
import { BsRecord2 } from "react-icons/bs";
import { BiReset } from "react-icons/bi";

// SpeechToText component for speech recognition functionality
const SpeechToText = ({ q13, onQ13Change }) => {
    const [isListening, setIsListening] = useState(false);

    // Destructuring properties from the `useSpeechRecognition` hook:
    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    // Triggers when the `isListening` state or `transcript` changes
    useEffect(() => {
        if (!isListening && transcript) {
            onQ13Change(transcript);
        }
    }, [isListening, transcript, onQ13Change]);

    // Function to start speech recognition and update the listening state
    const startListening = () => {
        setIsListening(true);
        SpeechRecognition.startListening();
    };

    // Function to stop speech recognition and update the listening state
    const stopListening = () => {
        setIsListening(false);
        SpeechRecognition.stopListening();
    };

    // Function to reset the transcript and clear the associated question value
    const onResetTranscript = () => {
        setIsListening(false);
        resetTranscript();
        onQ13Change('');
    }

    // Function to handle manual changes to question 13's value (text input)
    const onChangeQ13 = (e) => {
        onQ13Change(e.target.value);
    };

    // Conditional rendering: If the browser does not support speech recognition, display error message
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <Container style={{ textAlign: 'center', paddingBottom: '330px', marginTop: '100px' }}>
            {isListening ? (
                <Form.Control
                    className="w-50 record-btn"
                    type="text"
                    placeholder="Listening...press stop button when finished recording"
                    value={transcript}
                    disabled
                />
            ) : (
                <Form.Control
                    className="w-50 record-btn"
                    type="text"
                    placeholder="Enter text or press the record button"
                    value={q13}
                    onChange={onChangeQ13}
                />
            )}
            <Container id='k-record'>
                <BsRecord2  className= "k-btn"
                    style={{
                        cursor: 'pointer',
                        fontSize: "6.3em",
                        color: '#7ab8a5',
                    }}
                    onClick={startListening}
                />
            </Container>
            <Container id='k-stop'>
                <MdOutlineStopCircle className= "k-btn"
                    style={{
                        cursor: 'pointer',
                        fontSize: "5em",
                        color: '#7ab8a5',
                        marginRight: '15px',
                    }}
                    onClick={stopListening}
                />
            </Container>
            <Container id='k-reset'>
                <BiReset  className= "k-btn"
                    style={{
                        cursor: 'pointer',
                        fontSize: "5em",
                        color: '#7ab8a5',
                    }}
                    onClick={onResetTranscript}
                />
            </Container>
            
        </Container>

        

        
    );

}

export { SpeechToText };
