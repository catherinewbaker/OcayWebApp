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

    const [months, setMonths] = useState([]);
    const [scores, setScores] = useState([]);
    const [monthNames, setMonthNames] = useState([""]);
    const [feelings, setFeelings] = useState({
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
            setMonths((monthArray(chart)).reverse()); // set months = [{all months for which the user submitted at least 1 survey in chrono order}]
            setScores((scoreArray(chart)).reverse()); // set scores = [{average score per month for all months in the state: months}]
            setLoadingChart(false);
        }
    }, [chart]);

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
            return ''; // Handle invalid month values gracefully, or you can return the month number itself.
        }
    });

    useEffect(() => {
        setMonthNames(names(months));

    }, [months]);

    const lineData = {
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

    const renderLine = () => {
        return (
            <LineChart data={lineData} />
        );
    }

    const updateFeelings = () => {
        const updatedFeelings = {
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
        for (let x of Object.keys(updatedFeelings)) {
            if (oneCon.includes(x)) {
                updatedFeelings[x] += 1;
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

        console.log("update: " + updatedFeelings)
        return updatedFeelings;
    };

    useEffect(() => {
        // Function to update the feelings dictionary
        setFeelings(updateFeelings(feelings));

        // Use the feelingsRef to keep the feelings up to date without triggering this useEffect again
        feelingsRef.current = feelings;

    }, [oneCon, twoCon, threeCon, fourCon, fiveCon, sixCon, sevenCon, eightCon, nineCon, tenCon, elevenCon]);

    

    /*useEffect(() => {
        
        feelingsRef.current = feelings
    }, [oneCon, twoCon, threeCon, fourCon, fiveCon, sixCon, sevenCon, eightCon, nineCon, tenCon, elevenCon]); */

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
       // console.log(Object.values(feelingsRef.current))

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