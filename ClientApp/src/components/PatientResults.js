import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import { Container } from 'react-bootstrap';
import LineChart from "./LineChart";
import axios from 'axios';

const PatientResults = () => {
    const [table, setTable] = useState();

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

    const [loadingTable, setLoadingTable] = useState(true);


    useEffect(() => {
        setLoadingTable(true);
        getData();
        setLoadingTable(false);
    }, []);

    const getData = () => {
        const bodyParameters = {
            UserNumber: "36587325", // change to pull actual UserNumber
        };
        axios.post('https://localhost:44408/api/Auth/getAllResults', bodyParameters)
            .then((res) => {
                console.log(res);
                setTable(res.data.userSurveys[res.data.userSurveys.length - 1]); // set table = most recent survey
                setOneCon(res.data.userSurveys[res.data.userSurveys.length - 1].q1);
                setTwoCon(res.data.userSurveys[res.data.userSurveys.length - 1].q2);
                setThreeCon(res.data.userSurveys[res.data.userSurveys.length - 1].q3);
                setFourCon(res.data.userSurveys[res.data.userSurveys.length - 1].q4);
                setFiveCon(res.data.userSurveys[res.data.userSurveys.length - 1].q5);
                setSixCon(res.data.userSurveys[res.data.userSurveys.length - 1].q6);
                setSevenCon(res.data.userSurveys[res.data.userSurveys.length - 1].q7);
                setEightCon(res.data.userSurveys[res.data.userSurveys.length - 1].q8);
                setNineCon(res.data.userSurveys[res.data.userSurveys.length - 1].q9);
                setTenCon(res.data.userSurveys[res.data.userSurveys.length - 1].q10);
                setElevenCon(res.data.userSurveys[res.data.userSurveys.length - 1].q11);
                setTwelveCon(res.data.userSurveys[res.data.userSurveys.length - 1].q12);
                setThirteenCon(res.data.userSurveys[res.data.userSurveys.length - 1].q13);
                setTotalCon(res.data.userSurveys[res.data.userSurveys.length - 1].score)
            })
            .catch((err) => console.log(err));
    };

    const badgeSet = (arr, n) => arr.map(x => {
        if (x !== null && x !== " ") {
            return <span className="badge badge-primary badge-pill mx-1">{x}</span>;
                
        }
    });

    useEffect(() => {
        console.log(table)
        console.log(twelveCon)
        setOneCon(badgeSet(oneCon, " "));
        setTwoCon(badgeSet(twoCon, " "));
        setThreeCon(badgeSet(threeCon, " "));
        setFourCon(badgeSet(fourCon, " "));
        setFiveCon(badgeSet(fiveCon, "Yes"));
        setSixCon(badgeSet(sixCon, " "));
        setSevenCon(badgeSet(sevenCon, "No"));
        setEightCon(badgeSet(eightCon, "No"));
        setNineCon(badgeSet(nineCon, " "));
        setTenCon(badgeSet(tenCon, " "));
        setElevenCon(badgeSet(elevenCon, " "));
        setTwelveCon(<span className="badge badge-primary badge-pill mx-1">{twelveCon}</span>);
    }, [table, totalCon]);

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

    let contentsTable = loadingTable ? (
        <p>
            <em>Your recent survey results are loading...</em>
        </p>
    ) : (
        renderTable()
    );

    return (
        <div classname="d-flex flex-column align-items-center vh-100" >
            <br />
            {contentsTable}
            <br />
            <br />
            <br />
        </div>
    );
};

export { PatientResults };
