import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import '../css/inicio.css';

const Charts = () => {
  const [lastHourData, setLastHourData] = useState([]);
  const [lastWeekData, setLastWeekData] = useState([]);
  const [lastMonthData, setLastMonthData] = useState([]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          color: '#062268',
        },
      },
      y: {
        ticks: {
          beginAtZero: true,
          color: '#062268',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#062268',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const formatData = (data, label) => ({
    labels: data.map((d) => d._id),
    datasets: [
      {
        label: "Temperatura (°C)",
        data: data.map((d) => d.avgTemperature),
        borderColor: "rgba(255, 99, 132, 0.6)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Humedad (%)",
        data: data.map((d) => d.avgHumidity),
        borderColor: "rgba(54, 162, 235, 0.6)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Nivel de Sonido (Db)",
        data: data.map((d) => d.avgSound),
        borderColor: "rgba(255, 206, 86, 0.6)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Gas",
        data: data.map((d) => d.avgGas),
        borderColor: "rgba(75, 192, 192, 0.6)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  });

  useEffect(() => {
    axios.get('http://localhost:4000/api/sensors/last-hour').then((response) => {
      setLastHourData(response.data);
    });

    axios.get('http://localhost:4000/api/sensors/last-week').then((response) => {
      setLastWeekData(response.data);
    });

    axios.get('http://localhost:4000/api/sensors/last-month').then((response) => {
      setLastMonthData(response.data);
    });
  }, []);

  return (
    <div className='graphic-contain'>
      <h2>Datos Recopilados</h2>
      <h3>Última Hora</h3>
      <div className="chart-container">
        <Line data={formatData(lastHourData, 'Última Hora')} options={options} />
      </div>

      <h3>Última Semana</h3>
      <div className="chart-container">
        <Line data={formatData(lastWeekData, 'Última Semana')} options={options} />
      </div>

      <h3>Último Mes</h3>
      <div className="chart-container">
        <Line data={formatData(lastMonthData, 'Último Mes')} options={options} />
      </div>
    </div>
  );
};

export default Charts;
