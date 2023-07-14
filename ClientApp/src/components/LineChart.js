// ./components/LineChart.js

import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";


const LineChart = ({ data }) => {
    return (
        <div>
            <Line data={data} />
        </div>
    );
};

export default LineChart;