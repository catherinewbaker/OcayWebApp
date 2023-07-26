import React from "react";
import Chart from "chart.js/auto";
import { Radar } from "react-chartjs-2";


const RadarChart = ({ data }) => {
    return (
        <div style={{ height: '600px' }}>
            <Radar data={data} options={{
                maintainAspectRatio: false,
                responsive: true,
                //aspectRatio: 1.3,
                scale: {
                    beginAtZero: true,
                    max: 10 // change to dynamic value (max 3 times clicked per survey)
                },
                /*onHover: ({ x, y }, activeHover, chart) => {
                    console.log(chart.scales.r)
                }*/ // uncheck to see chart scale property info
            }} />
        </div>
    );
};
export default RadarChart;
