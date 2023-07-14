import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import { Container } from 'react-bootstrap';
import LineChart from "./LineChart";

const Results = () => {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // componentDidMount logic
        // Fetch data and update state accordingly
    }, []);

    const renderTable = () => { // pass answers to this table
        return (
            <Container className="d-flex flex-column align-items-center">
                <ol className="list-group list-group-numbered " style={{ height: '90%', width: '600px' }} >
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">I feel ____ about the appointment today</div>
                        </div>
                        <span className="badge badge-primary rounded-pill">fear</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">I sometimes feel ____</div>
                        </div>
                        <span className="badge badge-primary rounded-pill">nauseous</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">My treatments make me feel ____</div>
                        </div>
                        <span className="badge badge-primary rounded-pill">anxious</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">I eat ____ everday</div>
                        </div>
                        <span className="badge badge-primary rounded-pill">3 times a day</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">At night, I wake up ___</div>
                        </div>
                        <span className="badge badge-primary rounded-pill">Many times</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">In school, I feel ____ about what is being taught</div>
                        </div>
                        <span className="badge badge-primary rounded-pill">Bored</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">I feel safe during my daily activities</div>
                        </div>
                        <span className="badge badge-primary rounded-pill">Maybe</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">I have friends or classmates in school who I can spend time with</div>
                        </div>
                        <span className="badge badge-primary rounded-pill">yes</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">I feel ____ throughout the day</div>
                        </div>
                        <span className="badge badge-primary rounded-pill">joy</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">Taking home medicines make me feel ____</div>
                        </div>
                        <span className="badge badge-primary rounded-pill">sad</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">During the week, I am active ____</div>
                        </div>
                        <span className="badge badge-primary rounded-pill">2-3 days</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-start">
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">On levels 1-10, I normally feel ____ levels of pain</div>
                        </div>
                        <span className="badge badge-primary rounded-pill">3</span>
                    </li>
                </ol>
            </Container>
        );
    };

    const labels = ["January", "February", "March", "April", "May", "June"];

    const data = {
        labels: labels,
        datasets: [
            {
                label: "My First dataset",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [0, 10, 5, 2, 20, 30, 45],
            },
        ],
    };

    let contents = loading ? (
        <p>
            <em>Loading...</em>
        </p>
    ) : (
        renderTable()
    );

    return (
        <div>
            <h1 id="tableLabel" className="d-flex flex-column align-items-center">
                Your Most Recent Survey
            </h1>
            <br />
            {contents}
            <br />
            <br />
            <LineChart data={data} />
            <br />
            <br />
        </div>
    );
}

export { Results }