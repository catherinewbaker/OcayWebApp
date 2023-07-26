import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";


const LineChart = ({ data }) => {
    return (
        <div style={{ height: '450px' }}>
            <Line data={data} options={{
                maintainAspectRatio: false,
                responsive: true,
                //aspectRatio: 2,
                scales: {
                    y: {
                        min: 0,
                        max: 100
                    }
                }
            }} />
        </div>
    );
};
export default LineChart;
