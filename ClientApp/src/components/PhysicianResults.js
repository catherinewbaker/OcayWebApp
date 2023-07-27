import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import { Container } from 'react-bootstrap';
import LineChart from "./LineChart";
import RadarChart from "./RadarChart";
import axios from 'axios';

const PhysicianResults = () => {
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
        "Scared": 0,
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

    // loading variables
    const [loadingLine, setLoadingLine] = useState(true);
    const [loadingRadar, setLoadingRadar] = useState(true);
    const [loadingTable, setLoadingTable] = useState(true);

    // misc function variables
    var debugIndex = 0;


    // FUNCTIONS
    // pull data from axios of most recent survey, survey monthly averages, and set individual question responses
    const getData = () => {
        const bodyParameters = {
            UserNumber: "36587325", // change to pull actual UserNumber
        };
        axios.post('https://localhost:44408/api/Auth/getAllResults', bodyParameters)
            .then((res) => {
                console.log(res);
                setChart(res.data.averageMonthlyScores); // set chart = 2D array of [{months}, {average score per month}]
                setTable(res.data.userSurveys[0]); // set table = most recent survey
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
            })
            .catch((err) => console.log(err));
    };

    // pull the monthly averages from [table] into an array of scores
    const scoreArray = (arr) => arr.map(x => x.averageScore);

    // pull the months from [table] that have monthly averages
    const monthArray = (arr) => arr.map(x => x.month);

    // determine if words in each [--Con] variable get a red or green badge
    const badgeSet = (arr, n) => arr.map((x, index) => {
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
            "Scared": 0,
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
        return updatedFeelings;
    };

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
        setLoadingLine(true); // while we pull data, don't load the line chart
        setLoadingTable(true); // while we pull data, don't load the table
        setLoadingRadar(true); // while we pull data, don't load the radar chart
        getData();
        setLoadingRadar(false);
        setLoadingLine(false);
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
        if (twelveCon >= 5) { // [twelveCon] is stored as an int (not an array), so it gets special treatment
            setTwelveCon(o => <span className="badge badge-alert badge-pill mx-1">{o}</span>);
        } else {
            setTwelveCon(o => <span className="badge badge-primary badge-pill mx-1">{o}</span>);
        }
    }, [table]);

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
    useEffect(() => {
        setFeelings(updateFeelings(feelings));
        feelingsRef.current = feelings;
    }, [oneCon, twoCon, threeCon, fourCon, fiveCon, sixCon, sevenCon, eightCon, nineCon, tenCon, elevenCon]);


    // FINAL LAODING FOR RENDERING
    // if [loadingTable] isn't true, load the table
    let contentsTable = loadingTable ? (
        <p>
            <em>Your recent survey results are loading...</em>
        </p>
    ) : (
        renderTable()
    );

    // if [loadingLine] isn't true, load the line chart
    let contentsLine = loadingLine ? (
        <p>
            <em>Your line chart is loading...</em>
        </p>
    ) : (
        renderLine()
    );

    // if [loadingRadar] isn't true, load the radar chart
    let contentsRadar = loadingRadar ? (
        <p>
            <em>Your radar chart is loading...</em>
        </p>
    ) : (
        renderRadar()
    );

    // FINAL RETURN
    return (

        <div  >
            <br />
            {contentsTable}
            <br />
            <br />
            <br />
            <br />
            <Container style={{ width: '80%', height: '40%' }}>
                {contentsLine}
            </Container>
            <br />
            <br />
            <Container >
                {contentsRadar}
            </Container>
            <br />
            <br />
        </div>
    );
};

export { PhysicianResults };