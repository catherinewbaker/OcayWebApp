import React, { useState, useEffect } from 'react';
import axios from 'axios';
import temp from '../image/dogWave.gif';

const HomeGuardian = () => {
    const [name, setName] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const storedDataString = localStorage.getItem('userInfo');

        try {
            const storedDataObject = JSON.parse(storedDataString);
            console.log(storedDataObject)
            if (storedDataObject && storedDataObject.fName) {
                setName(storedDataObject.fName); // to pull userNumber do storedDataObject.UserNumber -> store as int!
            } else {
                console.log("Invalid or missing 'userInfo' data in localStorage.");
            }
        } catch (error) {
            console.error("Error parsing 'userInfo' data from localStorage:", error);
        }
    }


    return (
        <div style={{ height: "100vh" }}>
            <h1 style={{ color: '#7CBBA6', fontSize: '35px' }} >Welcome back {name}!</h1>
            <p style={{ color: '#7CBBA6' }}>To get started, select the <strong>Results</strong> menu</p>
            <br />
            <br />
            <br />
            <br />
            <div className="d-flex justify-content-center">
                <img src={temp} alt="Responsive image" />
            </div>
        </div>
    )

}
export { HomeGuardian };