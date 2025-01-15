import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

// Component to render a line chart from chart.js
const LineChart = ({ data }) => {
    return (
        <div>
            <Line data={data} options={{
                maintainAspectRatio: true,
                aspectRatio: 2,
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