import React, { useState, useEffect, useRef, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import LineChart from "./LineChart";
import RadarChart from "./RadarChart";
import axios from 'axios';

const PhysicianResults = () => {
    // LIST OF VARIABLES
    // table data
    const [table, setTable] = useState([]); // holds table data
    const [currentSurvey, setCurrentSurvey] = useState();
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
    const [totalCon, setTotalCon] = useState("Survey score loading..."); // array with data for total score

    // line chart data
    const [chart, setChart] = useState([]); // holds chart data
    const [months, setMonths] = useState([]); // holds x axis month numbers
    const [scores, setScores] = useState([]); // holds y axis score month averages
    const [monthNames, setMonthNames] = useState([""]); // holds x axis month names
    const lineData = { // data to pass to line chart
        labels: monthNames,
        datasets: [
            {
                label: "Score Average Per Month",
                data: scores,
                backgroundColor: "#79D4AC",
                borderColor: "#79D4AC",
                pointBorderColor: '#79D4AC',
                width: '100%',
            },
        ],
    };

    // radar chart data
    const [feelings, setFeelings] = useState({ // keeps track of how many times each word was selected in the last survey
        "Sad": 0,
        "Fear": 0,
        "Anger": 0,
        "Nauseous": 0,
        "Fatigue": 0,
        "Shortness of breath": 0,
        "Anxious": 0,
        "Confused": 0,
        "Bored": 0,
        "Reluctant": 0,
        "Fever": 0
    });
    const feelingsRef = useRef(feelings); // stores most recent update of the feelings dictionary
    const radarData = { // data to pass to radar chart
        labels: Object.keys(feelingsRef.current),
        datasets: [
            {
                label: "Amount Word was Selected in Past Survey",
                data: Object.values(feelingsRef.current),
                backgroundColor: "#79D4AC",
                borderColor: "#79D4AC",
                pointBorderColor: '#79D4AC',
                width: '100%',
            },
        ],
    };

    //drop down menu data
    const [optZero, setOptZero] = useState("");
    const [optOne, setOptOne] = useState("");
    const [optTwo, setOptTwo] = useState("");
    const [optThree, setOptThree] = useState("");
    const [optFour, setOptFour] = useState("");
    const [dropHolder, setDropHolder] = useState("");

    // loading variables
    const [loadingLine, setLoadingLine] = useState(true);
    const [loadingRadar, setLoadingRadar] = useState(true);
    const [loadingTable, setLoadingTable] = useState(true);
    const [loadingDrop, setLoadingDrop] = useState(true);
    const [isEmpty, setIsEmpty] = useState(true);

    // misc function variables
    var debugIndex = 0;
    var contentsTable = "";
    var contentsEmpty = "";
    var contentsRadar = "";
    var contentsLine = "";
    var contentsDrop = "";


    // FUNCTIONS
    // pull data from axios of most recent survey, survey monthly averages, and set individual question responses
    const getData = async () => {
        try {
            // pull data from axios of most recent survey, survey monthly averages, and set individual question responses
            const number = parseInt(localStorage.getItem("patientID"));

            const bodyParameters = {
                UserNumber: number, // change to pull actual UserNumber
            };

            const res = await axios.post('https://localhost:44408/api/Auth/getAllResults', bodyParameters);

            setChart(res.data.averageMonthlyScores); // set chart = 2D array of [{months}, {average score per month}]
            setTable(res.data.userSurveys); // set table = most recent survey
            setCurrentSurvey(res.data.userSurveys[0])
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
                setTotalCon(res.data.userSurveys[0].score);
            }
            console.log(table)
            console.log(currentSurvey)
            setLoadingDrop(false);
            setLoadingRadar(false);
            setLoadingLine(false);
            setLoadingTable(false);
        } catch (err) {
            console.log(err);
        }
    };

    // pull the monthly averages from [table] into an array of scores
    const scoreArray = (arr) => arr.map(x => x.averageScore);

    // pull the months from [table] that have monthly averages
    const monthArray = (arr) => arr.map(x => x.month);

    // determine if words in each [--Con] variable get a red or green badge
    const badgeSet = (arr, n) => arr.map(x => {
        debugIndex += 1;
        if (x !== null && x !== " ") {
            if (x === "Sad" || x === "Fear" || x === "Anger" || x === "Nauseous" || x === "Fatigue" || x === "Shortness of breath" || x === "Anxious" || x === "Scared" || x === "Confused" || x === "Bored" || x === "Reluctant" || x === "Once a day" || x === "More than three times a day" || x === "Twice a day" || x === n || x === "Many times" || x === "Never" || x === "Less than half of the week" || x === "Fever") {
                return <span key={debugIndex} className="badge badge-alert badge-pill mx-1">{x}</span>;
            } else {
                return <span key={debugIndex} className="badge badge-primary badge-pill mx-1">{x}</span>;
            }
        } else {
            return <span key={debugIndex} className="badge badge-primary badge-pill mx-1">I do not wish to answer.</span>;
        }
    });

    // take [months] and turn it into an array of month names with [monthNames]
    const names = (arr) => arr.map((month) => {
        if (month === 1) {
            return 'January';
        } else if (month === 2) {
            return 'February';
        } else if (month === 3) {
            return 'March';
        } else if (month === 4) {
            return 'April';
        } else if (month === 5) {
            return 'May';
        } else if (month === 6) {
            return 'June';
        } else if (month === 7) {
            return 'July';
        } else if (month === 8) {
            return 'August';
        } else if (month === 9) {
            return 'September';
        } else if (month === 10) {
            return 'October';
        } else if (month === 11) {
            return 'November';
        } else if (month === 12) {
            return 'December';
        } else {
            return ''; // Handle invalid month values as empty
        }
    });

    // sets the values of [feelings] equal to the number of times the keys were used in the most recent survey
    const updateFeelings = () => {
        const updatedFeelings = { // create a copy of the base [feelings] dictionary
            "Sad": 0,
            "Fear": 0,
            "Anger": 0,
            "Nauseous": 0,
            "Fatigue": 0,
            "Shortness of breath": 0,
            "Anxious": 0,
            "Confused": 0,
            "Bored": 0,
            "Reluctant": 0,
            "Fever": 0,
        };
        for (let x of Object.keys(updatedFeelings)) { // for each key in [updatedFeelings], check if the [--Con]'s hold that key
            if (oneCon.includes(x)) {
                updatedFeelings[x] += 1; // if they do, then increase the value stored in [updatedFeelings]
            }
            if (twoCon.includes(x)) {
                updatedFeelings[x] += 1;
            }
            if (threeCon.includes(x)) {
                updatedFeelings[x] += 1;
            }
            if (fourCon.includes(x)) {
                updatedFeelings[x] += 1;
            }
            if (fiveCon.includes(x)) {
                updatedFeelings[x] += 1;
            }
            if (sixCon.includes(x)) {
                updatedFeelings[x] += 1;
            }
            if (sevenCon.includes(x)) {
                updatedFeelings[x] += 1;
            }
            if (eightCon.includes(x)) {
                updatedFeelings[x] += 1;
            }
            if (nineCon.includes(x)) {
                updatedFeelings[x] += 1;
            }
            if (tenCon.includes(x)) {
                updatedFeelings[x] += 1;
            }
            if (elevenCon.includes(x)) {
                updatedFeelings[x] += 1;
            }
        }
        if (oneCon.includes("Scared")) {
            updatedFeelings["Fear"] += 1; // if they do, then increase the value stored in [updatedFeelings]
        }
        if (twoCon.includes("Scared")) {
            updatedFeelings["Fear"] += 1;
        }
        if (threeCon.includes("Scared")) {
            updatedFeelings["Fear"] += 1;
        }
        if (fourCon.includes("Scared")) {
            updatedFeelings["Fear"] += 1;
        }
        if (fiveCon.includes("Scared")) {
            updatedFeelings["Fear"] += 1;
        }
        if (sixCon.includes("Scared")) {
            updatedFeelings["Fear"] += 1;
        }
        if (sevenCon.includes("Scared")) {
            updatedFeelings["Fear"] += 1;
        }
        if (eightCon.includes("Scared")) {
            updatedFeelings["Fear"] += 1;
        }
        if (nineCon.includes("Scared")) {
            updatedFeelings["Fear"] += 1;
        }
        if (tenCon.includes("Scared")) {
            updatedFeelings["Fear"] += 1;
        }
        if (elevenCon.includes("Scared")) {
            updatedFeelings["Fear"] += 1;
        }
        return updatedFeelings;
    };

    const dropDown = (obj) => {
        return (
            <a className="dropdown-item" href="#" onClick={() => onSelect(obj)}>{obj.timestamp}</a>
        );
    };

    const onSelect = (obj) => {
        setCurrentSurvey(obj);
    }

    // RENDERING FUNCTIONS
    // render table
    const renderTable = () => {
        return (
            <Container className="d-flex flex-column align-items-center">
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

    // render line chart
    const renderLine = () => {
        return (
            <LineChart data={lineData} />
        );
    }

    // render radar chart
    const renderRadar = () => {
        // console.log(Object.values(feelingsRef.current))

        return (
            <RadarChart data={radarData} />
        );
    }


    // USE_EFFECT LOOPS
    // pull initial data from sql into [table], [chart], and [--Con]'s
    useEffect(() => {
        console.log(!table)
        console.log(table)
        //console.log(table[1])
        if (table != null && table != undefined) {
            console.log(table[4] != null && table[4] != undefined)
            if (table[0] != null && table[0] != undefined) {
                setOptZero(dropDown(table[0]));
            }
            if (table[1] != null && table[1] != undefined) {
                setOptOne(dropDown(table[1]));
            }
            if (table[2] != null && table[2] != undefined) {
                setOptTwo(dropDown(table[2]));
            }
            if (table[3] != null && table[3] != undefined) {
                setOptThree(dropDown(table[3]));
            }
            if (table[4] != null && table[4] != undefined) {
                setOptFour(dropDown(table[4]));
            }
        }

        setDropHolder(
            <div className="dropdown">
                <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    Select a recent survey to view
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {loadingDrop ? (
                        <a className="dropdown-item" href="#">
                            Loading...
                        </a>
                    ) : table.length > 0 ? ( // Check if table has data
                        <>
                            {optZero}
                            {optOne}
                            {optTwo}
                            {optThree}
                            {optFour}
                        </>
                    ) : (
                        <a className="dropdown-item" href="#">
                            No surveys available
                        </a>
                    )}
                </div>
            </div>
        );

        console.log(dropHolder)

    }, [table.length]);

    useEffect(() => {
        getData();
    }, []);

    // reset the [--Con]'s to equal their proper badge in JSX
    useEffect(() => {
        if (currentSurvey != null && currentSurvey != undefined) {
            setOneCon(badgeSet(currentSurvey.q1, " "));
            setTwoCon(badgeSet(currentSurvey.q2, " "));
            setThreeCon(badgeSet(currentSurvey.q3, " "));
            setFourCon(badgeSet(currentSurvey.q4, " "));
            setFiveCon(badgeSet(currentSurvey.q5, "Yes"));
            setSixCon(badgeSet(currentSurvey.q6, " "));
            setSevenCon(badgeSet(currentSurvey.q7, "No"));
            setEightCon(badgeSet(currentSurvey.q8, "No"));
            setNineCon(badgeSet(currentSurvey.q9, " "));
            setTenCon(badgeSet(currentSurvey.q10, " "));
            setElevenCon(badgeSet(currentSurvey.q11, " "));
            if (twelveCon >= 5) { // [twelveCon] is stored as an int (not an array), so it gets special treatment
                setTwelveCon(<span className="badge badge-alert badge-pill mx-1">{currentSurvey.q12}</span>);
            } else {
                setTwelveCon(<span className="badge badge-primary badge-pill mx-1">{currentSurvey.q12}</span>);
            }
        }
    }, [currentSurvey]);

    // if [chart] has values in it (i.e. the patient has taken at least one survey) then separate [chart] into [months] and [scores]
    useEffect(() => {
        if (chart.length !== 0) {
            setLoadingLine(true);
            setMonths((monthArray(chart)).reverse()); // set months = [{all months for which the user submitted at least 1 survey in chrono order}]
            setScores((scoreArray(chart)).reverse()); // set scores = [{average score per month for all months in the state: months}]
            setLoadingLine(false);
        }
    }, [chart]);

    // set [monthNames] to the names of the months in [months]
    useEffect(() => {
        setMonthNames(names(months));
    }, [months]);

    // update the feelings dictionary and it's reference
    useMemo(() => {
        setFeelings(updateFeelings(feelings));
        feelingsRef.current = feelings;
    }, [currentSurvey]);


    // FINAL LAODING FOR RENDERING
    // if [loadingTable] isn't true, load the table
    if (isEmpty) {
        contentsEmpty = (
            <p>
                <em>Your patient has no surveys in our records! They can log in and take their survey at any time.</em>
            </p>
        )
        contentsTable = <p> </p>
        contentsLine = <p> </p>
        contentsRadar = <p> </p>
    } else {
        contentsEmpty = <p> </p>
        // if [loadingTable] isn't true, load the table
        contentsTable = loadingTable ? (
            <p>
                <em>Your recent survey results are loading...</em>
            </p>
        ) : (
            renderTable()
        );
        // if [loadingLine] isn't true, load the line chart
        contentsLine = loadingLine ? (
            <p>
                <em>Your line chart is loading...</em>
            </p>
        ) : (
            renderLine()
        );
        // if [loadingRadar] isn't true, load the radar chart
        contentsRadar = loadingRadar ? (
            <p>
                <em>Your radar chart is loading...</em>
            </p>
        ) : (
            renderRadar()
        );

        contentsDrop = loadingDrop ? (
            <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Loading past surveys...
                </button>
            </div>
        ) : (
            dropHolder
        );
    }
    

    // FINAL RETURN
    return (// add "d-flex" to the container for alternate chart format
        <Container className="justify-content-center" >
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
                            <Card.Title className="text-left">
                                {contentsDrop}
                            </Card.Title>
                            {contentsTable}
                        </Card.Body>
                    </Card>

                </Col>
            </Row>
            <br />
            
            
            <Row >
                <Col style={{ marginBottom: '2px', marginRight: '20px' }}>
                    <Card style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#79D4AC',
                        color: '#79D4AC',
                    }}>
                        <Card.Body className="text-center">
                            {contentsLine}
                        </Card.Body>
                    </Card>
                    
                </Col>
                <Col style={{ marginBottom: '20px', marginRight: '20px' }}>
                    <Card style={{
                        backgroundColor: '#FFFFFF',
                        borderColor: '#79D4AC',
                        color: '#79D4AC'
                    }}>
                        <Card.Body className="text-center">
                            {contentsRadar}
                        </Card.Body>
                    </Card>
                    
                </Col>
            </Row>
            <br />
        </Container>
    );
};

export { PhysicianResults };