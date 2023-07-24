import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HomePatient = () => {
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
                setName(storedDataObject.fName);
            } else {
                console.log("Invalid or missing 'userInfo' data in localStorage.");
            }
        } catch (error) {
            console.error("Error parsing 'userInfo' data from localStorage:", error);
        }
    }


    return (
        <div>
            <h1>Welcome back {name}!</h1>
            <p>To get started, select the <strong>Survey</strong> or <strong>Results</strong> menus</p>
        </div>
    )

}
export { HomePatient };