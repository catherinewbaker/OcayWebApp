import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';

const Survey = () => {
    const navigate = useNavigate();

    var warning = " ";
    const onPressStart = () => {
        if (hasRead) {
            navigate('/survey/questions')
        }
    }

    const [hasRead, setHasRead] = useState(false); // whether user has read the terms and conditions yet
    const toggleRead = () => { // switches bool values when checkbox pressed
        if (hasRead) {
            setHasRead(!hasRead);
        } else {
            setHasRead(!hasRead);
            warning = "*You must read and accept the terms and conditions before taking the survey";
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center vh-100 mt-4 " >
            <div className="scrollHold" style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}>
                <h1 className="d-flex justify-content-center mt-4 " style={{ color: '#8074B5', fontSize: '35px', fontWeight: "700" }}>
                    OCAY Patient Consent Form
                </h1>
                <p style={{ margin:"0 auto", textAlign: "center", color: 'black', width: "1017px" }}>
                    Please read the following terms and conditions carefully before proceeding with the survey. <br/> By selecting the "I Agree" checkbox, you acknowledge that you have read, understood, and agreed to the terms outlined below.
                </p>
                <br />
                <div className="scroller" >
                    <p>
                        I. Purpose and Scope:
                        <br /><span className="indent" >This consent form serves to inform you, the patient, about how your personal data will be handled during the survey process. The information you provide in this survey will be shared solely with your assigned medical workers, including your doctor, to assist in your healthcare treatment.

                        </span><br /><br />II. Confidentiality and Data Usage:
                        <br /><span className="indent" >1. Personal Data Protection: <br /><span class="indent2" >Oncology Care Advocates for Youth (referred to as "OCAY") is committed to protecting the privacy and confidentiality of your personal data. Your personal information will not be used, accessed, or disclosed by anyone other than yourself and your doctor, as required for your healthcare treatment.
                        </span></span><br /><span className="indent" >2. Limited Data Access: <br /><span class="indent2" >OCAY ensures that its employees, contractors, or any other affiliated individuals will not have access to your personal data collected in this survey. Your responses will only be accessible by your assigned medical workers who require this information for providing appropriate medical care and treatment. Any reported survey data viewed or accessed by OCAY is through full anonymity of the patient's identifying information including but not limited to name, email, doctor, and account password. This data will only never be accessed for reviewing or viewing, only as a byproduct of IT processes.
                        </span></span><br /><span className="indent" >3. Data Deletion: <br /><span class="indent2" >You have the right to request the deletion of your personal data collected during the survey process at any time. To exercise this right, please naviagte to your account menu and to personal data and then select "Delete my data".

                        </span></span><br /><br />III. Responsibility and Liability:
                        <br /><span className="indent" >1. Data Loss or Leaks: <br /><span class="indent2" >While OCAY takes reasonable measures to secure your personal data, it cannot guarantee the complete security of information transmitted or stored electronically. You acknowledge that any loss, unauthorized access, or data leaks of your information that occur beyond the control of OCAY, once shared with your assigned medical workers, are not the responsibility of OCAY or its owners.
                        </span></span><br /><span className="indent" >2. Limitation of Liability: <br /><span class="indent2" >OCAY and its owners will not be held responsible for any damages, losses, claims, or expenses arising out of or related to the survey, data transmission, or storage of personal data, including but not limited to breaches of confidentiality or security.
                        </span></span>

                        <br /><br />IV. Consent and Agreement:
                        <br /><span className="indent" >By selecting the "I Agree" checkbox, you hereby acknowledge and agree to the following:
                        </span><br /><span className="indent2" >1. You consent to sharing your personal data collected in this survey with your assigned medical workers, including your doctor, for the purpose of your healthcare treatment.
                        </span><br /><span className="indent2" >2. You understand and accept that OCAY will not have access to your personal data and will not be able to view or use it for any purpose.
                        </span><br /><span className="indent2" >3. You acknowledge that you have the right to request the deletion of your personal data collected during the survey process.
                        </span><br /><span className="indent2" >4. You agree that any loss, data leaks, or unauthorized access to your personal data beyond the control of OCAY, once shared with your assigned medical workers, is not the responsibility of OCAY or its owners.
                        </span><br /><br />If you do not agree with these terms, please do not proceed with the survey.

                        <br /><br />Please note that this consent form is provided for your information and records. You may request a copy of this form for your reference.

                        <br /><br />By clicking the "I Agree" checkbox, you indicate that you have carefully read, understood, and agreed to the terms and conditions outlined above.
                    </p>
                </div>
            </div>
      
            <Container className="d-flex flex-column align-items-center">
                <Form.Check style={{ color: '#a6a6a6' }} type="checkbox" label="I have read and agree to the terms and conditions" onClick={toggleRead} />
                <p>{warning}</p>
                <Button
                    label="btnStartSurvey"
                    type="button"
                    className="btn - primary start-hover"
                    style={{ fontSize: '20px', width: '180px', color: '#FFFFFF', fontWeight:'bold' }}
                    onClick={onPressStart}
                    disabled={!hasRead}
                >
                    Press to Start
                    </Button>
            </Container>
        </Container>
    );
};

export { Survey };
