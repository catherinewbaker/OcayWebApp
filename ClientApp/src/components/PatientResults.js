import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LineChart from "./LineChart";
import axios from 'axios';

const PatientResults = () => {
    // LIST OF VARIABLES
    // table data
    const [table, setTable] = useState(); // holds table data
    const [oneCon, setOneCon] = useState(["loading..."]); // array with data for q1
    const [twoCon, setTwoCon] = useState(["loading..."]); // array with data for q2
    const [threeCon, setThreeCon] = useState(["loading..."]); // array with data for q3
    const [fourCon, setFourCon] = useState(["loading..."]); // array with data for q4
    const [fiveCon, setFiveCon] = useState(["loading..."]); // array with data for q5
    const [sixCon, setSixCon] = useState(["loading..."]); // array with data for q6
    const [sevenCon, setSevenCon] = useState(["loading..."]); // array with data for q7
    const [eightCon, setEightCon] = useState(["loading..."]); // array with data for q8
    const [nineCon, setNineCon] = useState(["loading..."]); // array with data for q9
    const [tenCon, setTenCon] = useState(["loading..."]); // array with data for q10
    const [elevenCon, setElevenCon] = useState(["loading..."]); // array with data for q11
    const [twelveCon, setTwelveCon] = useState("loading..."); // array with data for q12
    const [thirteenCon, setThirteenCon] = useState("loading..."); // array with data for q13
    const [totalCon, setTotalCon] = useState(["Survey score loading..."]); // array with data for total score

    // loading variables
    const [loadingTable, setLoadingTable] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true)

    // misc function variables
    var debugIndex = 0;
    var contentsTable = "";
    var contentsEmpty = "";





    // FUNCTIONS
    // pull data from axios of most recent survey, survey monthly averages, and set individual question responses
    const getData = () => {
        var object = JSON.parse(localStorage.getItem('userInfo'))

        const bodyParameters = {
            UserNumber: object.userNumber
        };

        axios.post('https://portal.ocay.org/api/Auth/getAllResults', bodyParameters)
            .then((res) => {
                console.log(res);
                setTable(res.data.userSurveys[0]); // set table = most recent survey
                if (res.data.userSurveys[0] == null) {
                    setIsEmpty(true)
                } else {
                    setIsEmpty(false)
                    setOneCon(res.data.userSurveys[0].q1);
                    setTwoCon(res.data.userSurveys[0].q2);
                    setThreeCon(res.data.userSurveys[0].q3);
                    setFourCon(res.data.userSurveys[0].q4);
                    setFiveCon(res.data.userSurveys[0].q5);
                    setSixCon(res.data.userSurveys[0].q6);
                    setSevenCon(res.data.userSurveys[0].q7);
                    setEightCon(res.data.userSurveys[0].q8);
                    setNineCon(res.data.userSurveys[0].q9);
                    setTenCon(res.data.userSurveys[0].q10);
                    setElevenCon(res.data.userSurveys[0].q11);
                    setTwelveCon(res.data.userSurveys[0].q12);
                    setThirteenCon(res.data.userSurveys[0].q13);
                    setTotalCon(res.data.userSurveys[0].score)
                }
                console.log(isEmpty)
            })
            .catch((err) => console.log(err));
    };

    // determine if words in each [--Con] variable get a red or green badge
    const badgeSet = (arr, n) => arr.map((x, index) => {
        debugIndex += 1;
        if (x !== null && x !== " ") {
            return <span key={debugIndex} className="badge badge-primary badge-pill mx-1">{x}</span>;
        } else {
            return <span key={debugIndex} className="badge badge-primary badge-pill mx-1">I do not wish to answer.</span>;
        }
    });

    // USE_EFFECT LOOPS
    // pull initial data from sql into [table], [chart], and [--Con]'s
    useEffect(() => {
        setLoadingTable(true); // while we pull data, don't load the table
        getData();
        setLoadingTable(false);
    }, []);

    // reset the [--Con]'s to equal their proper badge in JSX
    useEffect(() => {
        setOneCon(o => badgeSet(o, " "));
        setTwoCon(o => badgeSet(o, " "));
        setThreeCon(o => badgeSet(o, " "));
        setFourCon(o => badgeSet(o, " "));
        setFiveCon(o => badgeSet(o, "Yes"));
        setSixCon(o => badgeSet(o, " "));
        setSevenCon(o => badgeSet(o, "No"));
        setEightCon(o => badgeSet(o, "No"));
        setNineCon(o => badgeSet(o, " "));
        setTenCon(o => badgeSet(o, " "));
        setElevenCon(o => badgeSet(o, " "));
        setTwelveCon(o => <span className="badge badge-primary badge-pill mx-1">{o}</span>);
    }, [table]);




    // RENDERING FUNCTIONS
    // render table
    const renderTable = () => {
        return (
            <Container className="p-5 d-flex flex-column align-items-center" >
                <h1 style={{ color: '#a6a6a6', fontSize: '35px' }}> Most Recent Score: {totalCon} / 100</h1>
                <br />
                <ol className="list-group list-group-numbered " style={{ height: '90%', width: '100%' }} >
                    <li className="list-group-item d-flex justify-content-between align-items-start" >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold header">I feel ____ about the appointment today</div>
                        </div>
                        {oneCon}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold header">I sometimes feel ____</div>
                        </div>
                        {twoCon}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold header">My treatments make me feel ____</div>
                        </div>
                        {threeCon}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold header">I eat ____ everday</div>
                        </div>
                        {fourCon}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold header">At night, I wake up ___</div>
                        </div>
                        {fiveCon}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold header">In school, I feel ____ about what is being taught</div>
                        </div>
                        {sixCon}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold header">I feel safe during my daily activities</div>
                        </div>
                        {sevenCon}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold header">I have friends or classmates in school who I can spend time with</div>
                        </div>
                        {eightCon}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold header">I feel ____ throughout the day</div>
                        </div>
                        {nineCon}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold header">Taking home medicines make me feel ____</div>
                        </div>
                        {tenCon}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold header">During the week, I am active ____</div>
                        </div>
                        {elevenCon}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold header">On levels 1-10, I normally feel ____ levels of pain</div>
                        </div>
                        {twelveCon}
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold header">Is there anything else you want to tell us?</div>
                        </div>
                        {thirteenCon}
                    </li>
                </ol>
            </Container>
        );
    };

    // FINAL LAODING FOR RENDERING
    // if [loadingTable] isn't true, load the table
    if (isEmpty) {
        contentsEmpty = (
            <p>
                <em>You have no surveys in our records! To get started, navigate to the <strong>Survey</strong> tab and take your first survey!</em>
                <br />
                <br />
                <em>If this is a mistake, just give us a minute or two to load in your survey.</em>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </p>
        )
        contentsTable = <p> </p>
        return (
            <Container>
                {contentsEmpty}
            </Container>
        )
    } else {
        contentsEmpty = <p> </p>
        contentsTable = loadingTable ? (
            <p>
                <em>Your recent survey results are loading...</em>
            </p>
        ) : (
            renderTable()
        );
    }



    // FINAL RETURN
    return (
        <Container className="justify-content-center" style={{ height: "100vh" }}>
            <Row>
                {contentsEmpty}
            </Row>
            <Row style={{ width: '100%', alignItems: 'center' }} >
                <Col className=" justify-content-center">
                    <Card style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#79D4AC',
                        width: '100%',
                        color: '#79D4AC'
                    }}>
                        <Card.Body className="text-center">
                            {contentsTable}
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </Container>
    );
};

export { PatientResults };