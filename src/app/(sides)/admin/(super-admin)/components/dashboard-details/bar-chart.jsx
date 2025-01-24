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
import { useFetchDetails } from "@/hooks/dashboardHooks";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SalesBarChart = () => {
  
  const { data, isLoading, isError, error } = useFetchDetails();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  
  const { salesReports } = data.data;

  
  const labels = salesReports.map((report) =>
    new Date(report.date).toLocaleDateString()
  );
  const totalSalesData = salesReports.map((report) => report.totalSales);
  const targetSalesData = salesReports.map((report) => report.targetSales);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Real Sales",
        data: totalSalesData,
        backgroundColor: "rgba(102, 178, 255, 0.7)",
        borderColor: "rgba(102, 178, 255, 1)",
        borderWidth: 1,
        barPercentage: 0.9,
        categoryPercentage: 0.5,
      },
      {
        label: "Target Sales",
        data: targetSalesData,
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
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SalesBarChart;
