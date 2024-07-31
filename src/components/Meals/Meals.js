import React, { useState, useEffect } from 'react';

export default function Meals() {
  const [meal, setMeal] = useState('');
  const [exercise, setExercise] = useState('');
  const [caloriesBurnt, setCaloriesBurnt] = useState('');
  const [logDate, setLogDate] = useState('');
  const [logs, setLogs] = useState(() => {
    try {
      const storedLogs = localStorage.getItem('logs');
      return storedLogs ? JSON.parse(storedLogs) : [];
    } catch (error) {
      console.error('Error loading logs from local storage:', error);
      return [];
    }
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('logs', JSON.stringify(logs));
      console.log('Logs saved to local storage:', logs);
    } catch (error) {
      console.error('Error saving logs to local storage:', error);
    }
  }, [logs]);

  const handleAddLog = () => {
    if (!meal || !exercise || !caloriesBurnt || !logDate) return;
    const logDateObject = new Date(logDate);
    const newLog = {
      meal,
      exercise,
      caloriesBurnt,
      logDate: logDateObject.toLocaleDateString('en-US'), // Format date
      logTime: logDateObject.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }), // Format time
    };
    if (editIndex !== null) {
      const updatedLogs = logs.map((log, index) =>
        index === editIndex ? newLog : log
      );
      setLogs(updatedLogs);
      setEditIndex(null);
    } else {
      const newLogs = [...logs, newLog];
      setLogs(newLogs);
    }
    setMeal('');
    setExercise('');
    setCaloriesBurnt('');
    setLogDate('');
  };

  const handleDeleteLog = (index) => {
    const newLogs = logs.filter((_, i) => i !== index);
    setLogs(newLogs);
  };

  const handleEditLog = (index) => {
    const log = logs[index];
    setMeal(log.meal);
    setExercise(log.exercise);
    setCaloriesBurnt(log.caloriesBurnt);
    setLogDate(new Date(`${log.logDate} ${log.logTime}`).toISOString().slice(0, 16)); // Combine date and time
    setEditIndex(index);
  };

  const isFormValid = meal && exercise && caloriesBurnt && logDate;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Log Your Meals & Exercise</h1>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="meal">
            Meal
          </label>
          <input
            type="text"
            id="meal"
            value={meal}
            onChange={(e) => setMeal(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your meal"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="exercise">
            Exercise
          </label>
          <input
            type="text"
            id="exercise"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter your exercise"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="caloriesBurnt">
            Calories Burnt
          </label>
          <input
            type="number"
            id="caloriesBurnt"
            value={caloriesBurnt}
            onChange={(e) => setCaloriesBurnt(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter calories burnt"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="logDate">
            Log Date
          </label>
          <input
            type="datetime-local"
            id="logDate"
            value={logDate}
            onChange={(e) => setLogDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          onClick={handleAddLog}
          disabled={!isFormValid}
          className={`w-full py-2 px-4 rounded-lg transition duration-300 ${isFormValid ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-700 cursor-not-allowed'}`}
        >
          {editIndex !== null ? 'Update Log' : 'Add Log'}
        </button>
      </div>
      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Logs</h2>
        <ul className="bg-white p-4 rounded-lg shadow-md">
          {logs.map((log, index) => (
            <li key={index} className="border-b border-gray-300 py-2 flex justify-between items-center">
              <div>
                <p className="text-gray-700"><strong>Date:</strong> {log.logDate}</p>
                <p className="text-gray-700"><strong>Time:</strong> {log.logTime}</p>
                <p className="text-gray-700"><strong>Meal:</strong> {log.meal}</p>
                <p className="text-gray-700"><strong>Exercise:</strong> {log.exercise}</p>
                <p className="text-gray-700"><strong>Calories Burnt:</strong> {log.caloriesBurnt}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditLog(index)}
                  className="text-blue-500 hover:text-blue-700 transition duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteLog(index)}
                  className="text-red-500 hover:text-red-700 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
