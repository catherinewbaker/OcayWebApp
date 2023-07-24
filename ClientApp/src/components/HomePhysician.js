import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
                setName(storedDataObject.lName);
            } else {
                console.log("Invalid or missing 'userInfo' data in localStorage.");
            }
        } catch (error) {
            console.error("Error parsing 'userInfo' data from localStorage:", error);
        }
    }


    return (
        <div>
            <h1>Welcome back Dr. {name}!</h1>
            <p>To get started, select the <strong>Survey</strong> or <strong>Results</strong> menus</p>
        </div>
    )

}
export { HomePhysician };