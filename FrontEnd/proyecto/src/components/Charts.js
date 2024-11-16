import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';

const Charts = () => {
  const [lastHourData, setLastHourData] = useState([]);
  const [lastWeekData, setLastWeekData] = useState([]);
  const [lastMonthData, setLastMonthData] = useState([]);

  // Función para formatear los datos para Chart.js
  const formatData = (data, label) => {
    return {
      labels: data.map((d) => new Date(d.timestamp).toLocaleTimeString()), // Etiquetas (tiempo)
      datasets: [
        {
          label: `${label} - Temperatura (°C)`,
          data: data.map((d) => d.temperature),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
        {
          label: `${label} - Humedad (%)`,
          data: data.map((d) => d.humidity),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
        },
        {
          label: `${label} - Nivel de Sonido`,
          data: data.map((d) => d.sound),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
        {
          label: `${label} - Gas`,
          data: data.map((d) => d.gas),
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          fill: true,
        },
      ],
    };
  };

  useEffect(() => {
    // Cargar datos de la última hora
    axios.get('http://localhost:4000/api/sensors/last-hour').then((response) => {
      setLastHourData(response.data);
    });

    // Cargar datos de la última semana
    axios.get('http://localhost:4000/api/sensors/last-week').then((response) => {
      setLastWeekData(response.data);
    });

    // Cargar datos del último mes
    axios.get('http://localhost:4000/api/sensors/last-month').then((response) => {
      setLastMonthData(response.data);
    });
  }, []);

  return (
    <div>
      <h3>Datos Recopilados - Última Hora</h3>
      <Line data={formatData(lastHourData, 'Última Hora')} />

      <h3>Datos Recopilados - Última Semana</h3>
      <Line data={formatData(lastWeekData, 'Última Semana')} />

      <h3>Datos Recopilados - Último Mes</h3>
      <Line data={formatData(lastMonthData, 'Último Mes')} />
    </div>
  );
};

export default Charts;
