import React from "react";
import Chart from "chart.js/auto";
import { Radar } from "react-chartjs-2";


const RadarChart = ({ data }) => {
    return (
        <div>
            <Radar data={data} options={{ maintainAspectRatio: false }} />
        </div>
    );
};
export default RadarChart;
