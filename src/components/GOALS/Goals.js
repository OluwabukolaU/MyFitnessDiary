import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import bg from './images/bg.png';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Goals() {
  const [progress, setProgress] = useState('');
  const [forecast, setForecast] = useState('');
  const [advice, setAdvice] = useState('');
  const [logs, setLogs] = useState(() => {
    try {
      const storedLogs = localStorage.getItem('logs');
      return storedLogs ? JSON.parse(storedLogs) : [];
    } catch (error) {
      console.error('Error loading logs from local storage:', error);
      return [];
    }
  });

  const [targets, setTargets] = useState(() => {
    try {
      const storedTargets = localStorage.getItem('targets');
      return storedTargets ? JSON.parse(storedTargets) : [];
    } catch (error) {
      console.error('Error loading targets from local storage:', error);
      return [];
    }
  });

  const [targetReached, setTargetReached] = useState(false);

  useEffect(() => {
    const totalCaloriesBurnt = logs.reduce((acc, log) => acc + Number(log.caloriesBurnt), 0);
    setProgress(`Total Calories Burnt: ${totalCaloriesBurnt}`);

    const averageCaloriesBurnt = logs.length ? totalCaloriesBurnt / logs.length : 0;
    const weightLossForecast = (averageCaloriesBurnt / 7700).toFixed(2);
    setForecast(`Weight Loss Forecast: ${weightLossForecast} kg`);

    const advice = totalCaloriesBurnt > 2000 ? "Great job! Keep it up!" : "You're doing well, but you might want to increase your activity.";
    setAdvice(advice);

    if (targets.length > 0) {
      const targetCalories = targets.reduce((acc, target) => acc + (target.weeklyWeightLoss * 7700), 0); // Total target calories for all targets
      if (totalCaloriesBurnt >= targetCalories) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }
  }, [logs, targets]);

  // Prepare data for the chart
  const labels = logs.map(log => log.logDate);
  const data = {
    labels,
    datasets: [
      {
        label: 'Calories Burnt',
        data: logs.map(log => log.caloriesBurnt),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
      {
        label: 'Target Calories Burnt',
        data: labels.map(date => {
          const target = targets.find(target => new Date(target.targetDate) >= new Date(date));
          return target ? (target.weeklyWeightLoss * 7700) : null; // Total target calories for the period
        }),
        fill: false,
        borderColor: 'rgba(255,99,132,1)',
        borderDash: [10, 5],
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Calories Burnt vs. Target Calories Burnt Over Time',
      },
    },
  };

  return (
    <div
      className="min-h-screen  flex flex-col items-center bg-cover bg-center bg-no-repeat py-8 px-4 text-white "
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className="text-6xl font-extrabold mb-8 animate-pulse bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Reach Your Goals</h1>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center text-black transform transition-transform duration-500 hover:scale-105 mb-8 overflow-visible">
        <div className="mb-4 overflow-visible">
          <h2 className="text-4xl font-extrabold mb-2 text-gradient bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text">Daily Progress</h2>
          <p className="text-gray-800 text-xl">{progress}</p>
        </div>
        <div className="mb-4 overflow-visible">
          <h2 className="text-4xl font-extrabold mb-2 text-gradient bg-gradient-to-r from-green-500 to-blue-500 text-transparent bg-clip-text">Weight Loss Forecast</h2>
          <p className="text-gray-800 text-xl">{forecast}</p>
        </div>
        <div className="mb-4 overflow-visible">
          <h2 className="text-4xl font-extrabold mb-2 text-gradient bg-gradient-to-r from-yellow-500 to-red-500 text-transparent bg-clip-text">Advice & Feedback</h2>
          <p className="text-gray-800 text-xl">{advice}</p>
        </div>
        {targetReached && (
          <div className="bg-green-200 p-4 rounded-lg shadow-md overflow-visible">
            <h2 className="text-3xl font-bold text-green-800">Congratulations!</h2>
            <p className="text-xl text-green-600">You have reached your target!</p>
          </div>
        )}
      </div>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl text-center text-black transform transition-transform duration-500 hover:scale-105 overflow-visible">
        <h2 className="text-4xl font-extrabold mb-4 text-gradient bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">Calories Burnt vs. Target Calories</h2>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
