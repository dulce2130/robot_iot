import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import '../css/inicio.css';

const Charts = () => {
  const [lastHourData, setLastHourData] = useState([]);
  const [lastWeekData, setLastWeekData] = useState([]);
  const [lastMonthData, setLastMonthData] = useState([]);

  // Función para formatear los datos para Chart.js
  const formatData = (data, label) => {
    const colors = [
      'rgba(255, 99, 132, 0.6)', // Temperatura
      'rgba(54, 162, 235, 0.6)', // Humedad
      'rgba(255, 206, 86, 0.6)', // Sonido
      'rgba(75, 192, 192, 0.6)', // Gas
    ];

    return {
      labels: data.map((d) =>
        new Date(d.timestamp).toLocaleTimeString('es-MX', {
          hour: '2-digit',
          minute: '2-digit',
        })
      ),
      datasets: [
        {
          label: `Temperatura (°C)`,
          data: data.map((d) => d.temperature),
          borderColor: colors[0],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: `Humedad (%)`,
          data: data.map((d) => d.humidity),
          borderColor: colors[1],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: `Nivel de Sonido (Db)`,
          data: data.map((d) => d.sound),
          borderColor: colors[2],
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
        {
          label: `Gas`,
          data: data.map((d) => d.gas),
          borderColor: colors[3],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };
  };

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
    <div>
      <h3>Datos Recopilados - Última Hora</h3>
      <div className="chart-container">
        <Line data={formatData(lastHourData, 'Última Hora')} />
      </div>

      <h3>Datos Recopilados - Última Semana</h3>
      <div className="chart-container">
        <Line data={formatData(lastWeekData, 'Última Semana')} />
      </div>

      <h3>Datos Recopilados - Último Mes</h3>
      <div className="chart-container">
        <Line data={formatData(lastMonthData, 'Último Mes')} />
      </div>
    </div>
  );
};

export default Charts;
