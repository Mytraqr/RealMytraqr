import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  title: string;
  data: {
    labels: string[];
    values: number[];
  };
}

export default function LineChart({ title, data }: LineChartProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title,
        data: data.values,
        borderColor: 'rgb(234, 88, 12)',
        backgroundColor: 'rgba(234, 88, 12, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <Line data={chartData} options={options} />
    </div>
  );
}