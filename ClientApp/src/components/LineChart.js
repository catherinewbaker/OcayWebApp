import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";


const LineChart = ({ data }) => {
    return (
        <div>
            <Line data={data} options={{ scales: { y: { min: 0, max: 100 } } }} />
        </div>
    );
};
export default LineChart;
