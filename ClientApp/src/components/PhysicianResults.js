import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import { Container } from 'react-bootstrap';
import LineChart from "./LineChart";
import RadarChart from "./RadarChart";
import axios from 'axios';

const PhysicianResults = () => {
    const [table, setTable] = useState();
    const [chart, setChart] = useState([]);

    const [months, setMonths] = useState([""]);
    const [scores, setScores] = useState([]);

    const [oneCon, setOneCon] = useState(["loading..."]);
    const [twoCon, setTwoCon] = useState(["loading..."]);
    const [threeCon, setThreeCon] = useState(["loading..."]);
    const [fourCon, setFourCon] = useState(["loading..."]);
    const [fiveCon, setFiveCon] = useState(["loading..."]);
    const [sixCon, setSixCon] = useState(["loading..."]);
    const [sevenCon, setSevenCon] = useState(["loading..."]);
    const [eightCon, setEightCon] = useState(["loading..."]);
    const [nineCon, setNineCon] = useState(["loading..."]);
    const [tenCon, setTenCon] = useState(["loading..."]);
    const [elevenCon, setElevenCon] = useState(["loading..."]);
    const [twelveCon, setTwelveCon] = useState("loading...");
    const [thirteenCon, setThirteenCon] = useState("loading...");
    const [totalCon, setTotalCon] = useState(["Survey score loading..."]);

    const [loadingChart, setLoadingChart] = useState(true);
    const [loadingTable, setLoadingTable] = useState(true);

    var feelings = {
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
    };
    const feelingsRef = useRef(feelings);

    useEffect(() => {
        setLoadingChart(true);
        setLoadingTable(true);
        getData();
        setLoadingChart(false);
        setLoadingTable(false);
    }, []);

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

    var debugIndex = 0;
    const scoreArray = (arr) => arr.map(x => x.averageScore);
    const monthArray = (arr) => arr.map(x => x.month);
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
        if (twelveCon >= 5) {
            setTwelveCon(o => <span className="badge badge-alert badge-pill mx-1">{o}</span>);
        } else {
            setTwelveCon(o => <span className="badge badge-primary badge-pill mx-1">{o}</span>);
        }

        for (var x in feelings) {
            if (oneCon.includes(x)) {
                feelings[x] += 1;
            } else if (twoCon.includes(x)) {
                feelings[x] += 1;
            } else if (threeCon.includes(x)) {
                feelings[x] += 1;
            } else if (fourCon.includes(x)) {
                feelings[x] += 1;
            } else if (fiveCon.includes(x)) {
                feelings[x] += 1;
            } else if (sixCon.includes(x)) {
                feelings[x] += 1;
            } else if (sevenCon.includes(x)) {
                feelings[x] += 1;
            } else if (eightCon.includes(x)) {
                feelings[x] += 1;
            } else if (nineCon.includes(x)) {
                feelings[x] += 1;
            } else if (tenCon.includes(x)) {
                feelings[x] += 1;
            } else if (elevenCon.includes(x)) {
                feelings[x] += 1;
            }
        }

        feelingsRef.current = feelings

    }, [table]);

    const renderTable = () => { // pass answers to this table
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

    useEffect(() => {
        if (chart.length !== 0) {
            setLoadingChart(true);
            setMonths(monthArray(chart)); // set months = [{all months for which the user submitted at least 1 survey in chrono order}]
            setScores(scoreArray(chart)); // set scores = [{average score per month for all months in the state: months}]
            setLoadingChart(false);
        }
    }, [chart]);

    useEffect(() => {
        for (var i = 0; i < 12; i++) {
            if (months[i] === 1) {
                months[i] = 'January';
            } else if (months[i] === 2) {
                months[i] = 'February';
            } else if (months[i] === 3) {
                months[i] = 'March';
            } else if (months[i] === 4) {
                months[i] = 'April';
            } else if (months[i] === 5) {
                months[i] = 'May';
            } else if (months[i] === 6) {
                months[i] = 'June';
            } else if (months[i] === 7) {
                months[i] = 'July';
            } else if (months[i] === 8) {
                months[i] = 'August';
            } else if (months[i] === 9) {
                months[i] = 'September';
            } else if (months[i] === 10) {
                months[i] = 'October';
            } else if (months[i] === 11) {
                months[i] = 'November';
            } else if (months[i] === 12) {
                months[i] = 'December';
            }
        }
    }, [months, scores]);

    const lineData = {
        labels: months,
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

    const renderLine = () => {
        return (
            <LineChart data={lineData} />
        );
    }

    const radarData = {
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

    const renderRadar = () => {
        console.log(Object.values(feelingsRef.current))

        return (
            <RadarChart data={radarData} />
        );
    }


    let contentsTable = loadingTable ? (
        <p>
            <em>Your recent survey results are loading...</em>
        </p>
    ) : (
        renderTable()
    );

    let contentsLine = loadingChart ? (
        <p>
            <em>Your line chart is loading...</em>
        </p>
    ) : (
            renderLine()
    );

    let contentsRadar = loadingChart ? (
        <p>
            <em>Your line chart is loading...</em>
        </p>
    ) : (
        renderRadar()
    );


    return (

        <div  >
            <br />
            {contentsTable}
            <br />
            <br />
            <br />
            <br />
            <Container style={{ width: '80%', height: '40%'} }>
                {contentsLine}
                {contentsRadar}
            </Container>
            <Container >
                
            </Container>
            <br />
            <br />
        </div>
    );
};

export { PhysicianResults };