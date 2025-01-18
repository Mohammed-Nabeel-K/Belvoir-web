"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesBarChart = () => {
  
  const data = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [
      {
        label: "Real Sales",
        data: [12000, 15000, 13000, 18000, 20000, 17000],
        backgroundColor: "rgba(102, 178, 255, 0.7)", 
        borderColor: "rgba(102, 178, 255, 1)",
        borderWidth: 1,
        barPercentage: 0.9, 
        categoryPercentage: 0.5, 
      },
      {
        label: "Target Sales",
        data: [15000, 17000, 14000, 20000, 22000, 19000],
        backgroundColor: "rgba(144, 238, 144, 0.7)", 
        borderColor: "rgba(144, 238, 144, 1)",
        borderWidth: 1,
        barPercentage: 0.9,
        categoryPercentage: 0.5,
      },
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#4B5563", 
        },
      },
      title: {
        display: true,
        text: "Reality vs Target Sales",
        font: {
          size: 18,
        },
        color: "#1F2937", 
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#6B7280", 
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: "#6B7280",
        },
        grid: {
          color: "rgba(209, 213, 219, 0.2)",
        },
      },
    },
  };

  return (
    // <div className="bg-white p-3 rounded-lg shadow-md w-[600px] h-[200px] ml-2">
      <div>
        <Bar data={data} options={options} />
      </div>
    // </div>
  );
};

export default SalesBarChart;
