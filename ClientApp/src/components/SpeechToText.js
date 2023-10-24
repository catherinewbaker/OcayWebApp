import React, { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { MdOutlineStopCircle } from "react-icons/md";
import { BsRecord2 } from "react-icons/bs";
import { BiReset } from "react-icons/bi";

const SpeechToText = ({ q13, onQ13Change }) => {
    const [isListening, setIsListening] = useState(false);

    const {
        transcript,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    useEffect(() => {
        if (!isListening && transcript) {
            onQ13Change(transcript);
        }
    }, [isListening, transcript, onQ13Change]);

    const startListening = () => {
        setIsListening(true);
        SpeechRecognition.startListening();
    };

    const stopListening = () => {
        setIsListening(false);
        SpeechRecognition.stopListening();
    };

    const onResetTranscript = () => {
        setIsListening(false);
        resetTranscript();
        onQ13Change('');
    }

    const onChangeQ13 = (e) => {
        onQ13Change(e.target.value);
    };

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <Container className='d-flex justify-content-center align-items-center' style={{ paddingBottom: '330px', marginTop: '20px' }}>
            <BsRecord2
                style={{
                    cursor: 'pointer',
                    fontSize: "2.6em",
                    color: 'grey',
                }}
                onClick={startListening}
            />
            <MdOutlineStopCircle
                style={{
                    cursor: 'pointer',
                    fontSize: "2em",
                    color: 'grey',
                    marginRight: '3px',
                }}
                onClick={stopListening}
            />
            <BiReset
                style={{
                    cursor: 'pointer',
                    fontSize: "2em",
                    color: 'gray',
                    marginRight: '5px',
                }}
                onClick={onResetTranscript}
            />
            {isListening ? (
                <Form.Control
                    className="w-50"
                    type="text"
                    placeholder="Listening...press stop button when finished recording"
                    value={transcript}
                    disabled
                />
            ) : (
                <Form.Control
                    className="w-50"
                    type="text"
                    placeholder="Enter text or press the record button"
                    value={q13}
                    onChange={onChangeQ13}
                />
            )}
        </Container>
    );

}

export { SpeechToText };
