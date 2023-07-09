import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [data, setData] = useState("");

    //useEffect(() => {
    //    getData();
    //}, []);

    //const getData = () => {
    //    axios.get('https://localhost:44418/api/Users')
    //        .then(response => {
    //            // Handle the response data
    //            console.log(response.data);
    //            setData(response.data[0].fName)
    //        })
    //        .catch(error => {
    //            // Handle any errors
    //            console.error(error);
    //        });
    //}


    return (
        <div>
            <h1>Welcome back!</h1>
            <p>To get started, select the <strong>Survey</strong> or <strong>Results</strong> menus</p>
        </div>
    )

}
export { Home };