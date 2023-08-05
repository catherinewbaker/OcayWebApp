import React, { useState, useEffect } from 'react';
import axios from 'axios';
import temp from '../image/temp.png';

const HomePhysician = () => {
    const [name, setName] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const storedDataString = localStorage.getItem('userInfo');

        try {
            const storedDataObject = JSON.parse(storedDataString);
            console.log(storedDataObject)
            if (storedDataObject && storedDataObject.lName) {
                setName(storedDataObject.lName); // to pull userNumber do storedDataObject.UserNumber -> store as int!
            } else {
                console.log("Invalid or missing 'userInfo' data in localStorage.");
            }
        } catch (error) {
            console.error("Error parsing 'userInfo' data from localStorage:", error);
        }
    }


    return (
        <div>
            <h1 style={{ color: '#a6a6a6', fontSize: '35px' }} >Welcome back Dr. {name}!</h1>
            <p style={{ color: '#a6a6a6' }}>To get started, select the <strong>Results</strong> menu</p>

            <div className="d-flex justify-content-center">
                <img src={temp} alt="Responsive image" />
            </div>
        </div>
    )

}
export { HomePhysician };