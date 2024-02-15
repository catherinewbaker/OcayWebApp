import React, { useState, useEffect, useRef, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import { Container, Row, Form, Card, Col, Dropdown } from 'react-bootstrap';
import LineChart from "./LineChart";
import RadarChart from "./RadarChart";
import axios from 'axios';
import puzzleBackground from '../image/Beige.png';

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

    const [tableDropTitle, setTableDropTitle] = useState("Select a recent survey...")
    const [lineDropTitle, setLineDropTitle] = useState("Select a time range...")

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
    const [val, setVal] = useState(12); // holds chart data

    // radar chart data
    const [startDate, setStartDate] = useState("2023-03-25");
    const [endDate, setEndDate] = useState("2023-08-03");
    const [radarSurveys, setRadarSurveys] = useState([]);
    const [ticks, setTicks] = useState(30);
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
    const [dropHolder, setDropHolder] = useState();

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
    var maxTick = 30;


    // FUNCTIONS
    // pull data from axios of most recent survey, survey monthly averages, and set individual question responses
    const getData = async () => {
        try {
            // pull data from axios of most recent survey, survey monthly averages, and set individual question responses
            var patientID = JSON.parse(localStorage.getItem('patientID'));

            const bodyParameters = {
                UserNumber: patientID, // change to pull actual UserNumber
            };

            const res = await axios.post('https://portal.ocay.org/api/Auth/getAllResults', bodyParameters);

            setChart(res.data.averageMonthlyScores); // set chart = 2D array of [{months}, {average score per month}]
            setTable(res.data.userSurveys); // set table = most recent survey
            setCurrentSurvey(res.data.userSurveys[0])
            if (res.data.userSurveys[0] == null) {
                setIsEmpty(true)
            } else {
                setIsEmpty(false)
            }
            setLoadingDrop(false);
            setLoadingRadar(false);
            setLoadingLine(false);
            setLoadingTable(false);
            console.log(table)
        } catch (err) {
            console.log(err);
        }
    };

    const getRadarData = async () => {
        try {
            // pull data from axios of most recent survey, survey monthly averages, and set individual question responses
            var patientID = JSON.parse(localStorage.getItem('patientID'));

            const bodyParameters = {
                UserNumber: patientID, // change to pull actual UserNumber
                StartDate: startDate,
                EndDate: endDate,
            };

            const res = await axios.post('https://portal.ocay.org/api/Auth/getResultsByDate', bodyParameters);

            setRadarSurveys(res.data.userSurveys)
            if (res.data.userSurveys.length > 0) {
                setTicks((res.data.userSurveys.length) * 3);
            } else {
                setTicks(10)
            }


            setLoadingRadar(false);
        } catch (err) {
            console.log(err);
        }
    };

    // pull the monthly averages from [table] into an array of scores
    const scoreArray = (arr) => arr.map(x => x.score);

    // pull the months from [table] that have monthly averages
    const monthArray = (arr) => arr.map(x => x.timestamp.substring(5, 10));

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
    const names = (arr) => arr.map((x) => {
        if (x.substring(0, 3) === '01-') {
            return 'Jan ' + x.substring(3, 5);
        } else if (x.substring(0, 3) === '02-') {
            return 'Feb ' + x.substring(3, 5);
        } else if (x.substring(0, 3) === '03-') {
            return 'Mar ' + x.substring(3, 5);
        } else if (x.substring(0, 3) === '04-') {
            return 'Apr ' + x.substring(3, 5);
        } else if (x.substring(0, 3) === '05-') {
            return 'May ' + x.substring(3, 5);
        } else if (x.substring(0, 3) === '06-') {
            return 'Jun ' + x.substring(3, 5);
        } else if (x.substring(0, 3) === '07-') {
            return 'Jul ' + x.substring(3, 5);
        } else if (x.substring(0, 3) === '08-') {
            return 'Aug ' + x.substring(3, 5);
        } else if (x.substring(0, 3) === '09-') {
            return 'Sep ' + x.substring(3, 5);
        } else if (x.substring(0, 3) === '10-') {
            return 'Oct ' + x.substring(3, 5);
        } else if (x.substring(0, 3) === '11-') {
            return 'Nov ' + x.substring(3, 5);
        } else if (x.substring(0, 3) === '12-') {
            return 'Dec ' + x.substring(3, 5);
        } else {
            return ''; // Handle invalid month values as empty
        }
    });

    const feelingsArray = (arr) => arr.map(x => updateFeelings(feelingsRef.current, x));
    // sets the values of [feelings] equal to the number of times the keys were used in the most recent survey
    const updateFeelings = (arr, survey) => { // arr = current feelings array, survey = current survey
        if (survey != null && survey != undefined) {
            for (let x of Object.keys(arr)) { // for each key in [updatedFeelings], check if the [--Con]'s hold that key
                if ((survey.q1).includes(x)) {
                    arr[x] += 1; // if they do, then increase the value stored in [updatedFeelings]
                }
                if ((survey.q2).includes(x)) {
                    arr[x] += 1;
                }
                if ((survey.q3).includes(x)) {
                    arr[x] += 1;
                }
                if ((survey.q4).includes(x)) {
                    arr[x] += 1;
                }
                if ((survey.q5).includes(x)) {
                    arr[x] += 1;
                }
                if ((survey.q6).includes(x)) {
                    arr[x] += 1;
                }
                if ((survey.q7).includes(x)) {
                    arr[x] += 1;
                }
                if ((survey.q8).includes(x)) {
                    arr[x] += 1;
                }
                if ((survey.q10).includes(x)) {
                    arr[x] += 1;
                }
                if ((survey.q11).includes(x)) {
                    arr[x] += 1;
                }
            }
            if ((survey.q1).includes("Scared")) {
                arr["Fear"] += 1; // if they do, then increase the value stored in [updatedFeelings]
            }
            if ((survey.q2).includes("Scared")) {
                arr["Fear"] += 1;
            }
            if ((survey.q3).includes("Scared")) {
                arr["Fear"] += 1;
            }
            if ((survey.q4).includes("Scared")) {
                arr["Fear"] += 1;
            }
            if ((survey.q5).includes("Scared")) {
                arr["Fear"] += 1;
            }
            if ((survey.q6).includes("Scared")) {
                arr["Fear"] += 1;
            }
            if ((survey.q7).includes("Scared")) {
                arr["Fear"] += 1;
            }
            if ((survey.q8).includes("Scared")) {
                arr["Fear"] += 1;
            }
            if ((survey.q10).includes("Scared")) {
                arr["Fear"] += 1;
            }
            if ((survey.q11).includes("Scared")) {
                arr["Fear"] += 1;
            }
        }
        return arr;
    };


    const dropDown = (obj) => {
        return (
            <Dropdown.Item href="#" onClick={() => onSelect(obj)} >{obj.timestamp}</Dropdown.Item>
        );
    };

    const onSelect = (obj) => {
        setTableDropTitle(obj.timestamp)
        setCurrentSurvey(obj);
    }

    // RENDERING FUNCTIONS
    // render table
    const renderTable = () => {
        return (
            <Container className="d-flex flex-column align-items-center mt-5">
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
        return (
            <RadarChart data={radarData} maxTicks={ticks} />
        );
    }


    // USE_EFFECT LOOPS
    // update the dropDown menu with the last 5 surveys available
    useEffect(() => {
        setDropHolder(
            <Container>
                <Dropdown style={{ color: '#a6a6a6', fontSize: '35px' }}>
                    <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: '#FFFFFF', color: '#79D4AC' }}>
                        {tableDropTitle}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {loadingDrop ? (
                            <Dropdown.Item href="#">
                                Loading...
                            </Dropdown.Item>
                        ) : table.length > 0 ? ( // Check if table has data
                            <>
                                {renderDropCon()}
                            </>
                        ) : (
                            <Dropdown.Item href="#">
                                No surveys available
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu> Survey Score: {totalCon} / 100
                </Dropdown>
                <h1 > </h1>
            </Container>
        );
    }, [totalCon, table.length]);

    // render table's drop down menu
    const renderDropCon = () => {
        if (table !== null && table !== undefined && table.length > 0) {
            console.log(table)
            return table.map((value) => {
                if (value !== null && value !== undefined && value.timestamp) {
                    var currentYear = new Date().getFullYear();
                    var currentMonth = new Date().getMonth() + 1;
                    var mon = parseInt(value.timestamp.substring(5, 7), 10);
                    var year = parseInt(value.timestamp.substring(0, 5), 10);

                    if (((mon <= currentMonth) && (year === currentYear)) || ((mon > currentMonth) && (year === currentYear - 1))) {
                        return dropDown(value);
                    }
                    return false;
                }
                return null; // Or handle the null/undefined case appropriately
            });
        }
    }

    // pull initial data from sql into [table], [chart], and [--Con]'s
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
            setThirteenCon(currentSurvey.q13);
            setTotalCon(currentSurvey.score)
        }
    }, [currentSurvey]);

    // if [chart] has values in it (i.e. the patient has taken at least one survey) then separate [chart] into [months] and [scores]
    useEffect(() => {
        if (table.length !== 0) {
            setLoadingLine(true);
            setMonths((monthArray(table)).reverse()); // set months = [{all months for which the user submitted at least 1 survey in chrono order}]
            setScores((scoreArray(table)).reverse()); // set scores = [{average score per month for all months in the state: months}]
            setLoadingLine(false);
        }
    }, [table]);

    // set [monthNames] to the names of the months in [months]
    useEffect(() => {
        setMonthNames(names(months));
        console.log(monthNames)
    }, [months]);

    useEffect(() => {
        feelingsRef.current = feelings;
    }, [feelings])

    useEffect(() => {
        getRadarData()

    }, [startDate, endDate])

    useEffect(() => {
        setFeelings({
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
        })
        feelingsArray(radarSurveys)
    }, [radarSurveys])

    useEffect(() => {
        setLineDropTitle(val + " months")
        var currentMonth = new Date().getMonth() + 1;
        var currentYear = new Date().getFullYear();

        const filteredMonths = table.filter(date => {
            const mon = parseInt(date.timestamp.substring(5, 7), 10);
            const year = parseInt(date.timestamp.substring(0, 5), 10);
            if (val === 6) {
                if (mon < currentMonth) {
                    return (mon > currentMonth - val) && (currentYear === year);
                } else if (mon > currentMonth) {
                    return (mon >= 13 - val + currentMonth) && (currentYear === year + 1);
                } else if (mon === currentMonth) {
                    return (currentYear === year)
                }
                return false;
            } else if (val === 12) {
                if (mon < currentMonth) {
                    return year === currentYear;
                } else if (mon > currentMonth) {
                    return year === currentYear - 1;
                } else if (mon === currentMonth) {
                    return (year === currentYear)
                }
                return false;
            } else if (val === 18) {
                if (mon < currentMonth) {
                    return (year === currentYear - 1 || year === currentYear) && (mon > currentMonth - 6)
                } else if (mon > currentMonth) {
                    return (year === currentYear - 1) || ((year === currentYear - 2) && (mon >= 13 - 6 + currentMonth))
                } else if (mon === currentMonth) {
                    return (year === currentYear || year === currentYear - 1)
                }
                return false;
            } else if (val === 0) {
                return true;
            }
        });
        setMonths(monthArray(filteredMonths.reverse()));

    }, [val])

    // FINAL LAODING FOR RENDERING
    // if [loadingTable] isn't true, load the table
    if (isEmpty) {
        contentsEmpty = (
            <p>
                <em>Your child has no surveys in our records! They can log in and take their survey at any time.</em>
            </p>
        )
        contentsTable = <p> </p>
        contentsLine = <p> </p>
        contentsRadar = <p> </p>
        return (
            <Container>
                {contentsEmpty}
            </Container>
        )
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
        ) : radarSurveys.length > 0 ? (
            renderRadar()
        ) : (
            <p style={{ color: 'black' }}>
                <em>There are no surveys for this child taken within that time frame.</em>
            </p>
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
            <Row style={{ width: '100%', alignItems: 'center', marginTop: '15px' }} >
                <Card style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#79D4AC',
                    width: '100%',
                    color: '#79D4AC',
                    padding: '25px',
                    paddingBottom: '30px',
                }}>
                    <Card.Body className="text-center">
                        <Card.Title className="text-left">
                            {contentsDrop}
                        </Card.Title>
                        {contentsTable}
                    </Card.Body>
                </Card>
            </Row>

            <Row style={{ marginTop: '30px' }}>
                <Card style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#79D4AC',
                    color: '#79D4AC',
                }}>
                    <Card.Body className="text-center">
                        All Survey Within the Last <Dropdown style={{ color: '#a6a6a6', fontSize: '35px' }}>
                            <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: '#FFFFFF', color: '#79D4AC' }}>
                                {lineDropTitle}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#" onClick={() => setVal(6)} >6 months</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => setVal(12)} >12 months</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => setVal(18)} >18 months</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => setVal(0)} >All time</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        {contentsLine}
                    </Card.Body>
                </Card>
            </Row>
            <br />
            <Row >
                <Card style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: '#79D4AC',
                    color: '#79D4AC'
                }}>
                    <Card.Body className="text-center">
                        <Card.Title className="text-left mt-3 pt-3">
                            <Form>
                                <Row style={{ marginBottom: '8px' }}>
                                    <Col style={{ display: 'flex', justifyContent: 'right', width: '100%' }}>
                                        <Form.Label style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'left',
                                            width: '200px',
                                            fontSize: '20px',
                                            height: '33px',
                                        }}>Start Date: </Form.Label>
                                    </Col>
                                    <Col style={{ width: '100%' }}>
                                        <Form.Control
                                            type="date"
                                            placeholder="2023-06-25"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'left',
                                                width: '200px',
                                            }}
                                            onChange={(e) => setStartDate(e.target.value)} />
                                    </Col>
                                    <Col style={{ display: 'flex', justifyContent: 'right' }}>
                                        <Form.Label style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '200px',
                                            fontSize: '20px',
                                            height: '33px',
                                            marginBottom: '0px',
                                        }}>End Date: </Form.Label>
                                    </Col>
                                    <Col>
                                        <Form.Control type="date"
                                            placeholder="2023-06-25"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                width: '200px',
                                            }} onChange={(o) => setEndDate(o.target.value)} />
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '5px' }}>

                                </Row>
                                <Row style={{ marginBottom: '5px' }}>

                                </Row>
                            </Form>
                        </Card.Title>
                        {contentsRadar}
                    </Card.Body>
                </Card>
            </Row>
            <br />
            <br />
            <br />
            <br />
        </Container>
    );
};

export { PhysicianResults };