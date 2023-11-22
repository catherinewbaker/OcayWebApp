import React, { useState, useEffect } from 'react';
import axios from 'axios';
import temp from '../image/temp.png';

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
            <h1 className="d-flex justify-content-center mt-5" style={{ color: 'black', fontSize: '35px' , fontWeight: 'bold' }} >Welcome back {name}!</h1>
            <p className="d-flex justify-content-center" style={{ color: 'black' }}>To get started, select the <strong>&nbsp;Results</strong>&nbsp;menu</p>

            <div className="d-flex justify-content-center">
                <img style={{width: "80%"}} src={temp} alt="Responsive image" />
            </div>
        </div>
    )

}
export { HomeGuardian };