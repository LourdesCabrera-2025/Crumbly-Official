import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "../../styles/private/dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export function DashboardChart({ dataType = "bar" }) {
  const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];

  const barData = {
    labels,
    datasets: [
      {
        label: "Ventas",
        data: [1200, 1900, 3000, 5000, 2300, 3400],
        backgroundColor: "rgba(162, 0, 255, 0.7)",
        borderRadius: 10,
        maxBarThickness: 40,
      },
      {
        label: "Pedidos",
        data: [900, 1500, 2800, 1800, 2700, 3200],
        backgroundColor: "rgba(105, 97,111, 0.7)",
        borderRadius: 10,
        maxBarThickness: 40,
      },
    ],
  };

  const pieData = {
    labels: ["Clientes", "Pedidos", "Productos", "Entregas"],
    datasets: [
      {
        label: "Proporción",
        data: [3782, 4120, 2890, 3150],
        backgroundColor: ["#1d4ed8", "#9333ea", "#f59e0b", "#3d4451"],
        borderWidth: 2,
      },
    ],
  };

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: { size: 14, weight: 500 },
          color: "rgb(191, 191, 191)",
        },
      },
      tooltip: {
        backgroundColor: "rgb(89, 86, 105)",
        titleColor: "#EEEEEE",
        bodyColor: "#EEEEEE",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        cornerRadius: 6,
      },
      title: {
        display: true,
        text: dataType === "bar" ? "Resumen Mensual" : "Distribución General",
        color: "rgba(89,86,105, 0.7)",
        padding: { top: 10, bottom: 30 },
        font: { size: 16, weight: 600 },
      },
    },
    scales: dataType === "bar" ? {
      x: {
        grid: { display: false },
        ticks: { font: { size: 13, weight: 500 }, color: "#4B5563" },
      },
      y: {
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: { font: { size: 13, weight: 500 }, color: "#4B5563" },
      },
    } : {},
  };

  return (
    <div className="flex flex-wrap gap-4 w-min-full">
      <div className="card flex-1 bg-white shadow-sm rounded-xl p-4 h-[400px] md:h-[300px]">
        <h2 className="card-title mb-4 text-lg font-semibold">Resumen Mensual</h2>
        <div className="w-full h-full">
          <Bar data={barData} options={defaultOptions} />
        </div>
      </div>

      <div className="card flex-1 bg-white shadow-sm rounded-xl p-4 h-[400px] md:h-[300px]">
        <h2 className="card-title mb-4 text-lg font-semibold">Distribución General</h2>
        <div className="w-full h-full">
          <Pie data={pieData} options={defaultOptions} />
        </div>
      </div>
    </div>
  );
}

export default DashboardChart;
