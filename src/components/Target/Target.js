import React, { useState, useEffect } from 'react';
import bg from './Images/bg.png';

export default function Target() {
  const [weeklyWeightLoss, setWeeklyWeightLoss] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [calorieSource, setCalorieSource] = useState('');
  const [caloriesToBurn, setCaloriesToBurn] = useState(0);
  const [targets, setTargets] = useState(() => {
    try {
      const storedTargets = localStorage.getItem('targets');
      return storedTargets ? JSON.parse(storedTargets) : [];
    } catch (error) {
      console.error('Error loading targets from local storage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('targets', JSON.stringify(targets));
      console.log('Targets saved to local storage:', targets);
    } catch (error) {
      console.error('Error saving targets to local storage:', error);
    }
  }, [targets]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newTarget = {
      weeklyWeightLoss,
      targetDate,
      calorieSource,
      completed: false,
    };
    const newTargets = [...targets, newTarget];
    setTargets(newTargets);
    setWeeklyWeightLoss('');
    setTargetDate('');
    setCalorieSource('');
  };

  const handleMarkCompleted = (index) => {
    const newTargets = [...targets];
    newTargets[index].completed = !newTargets[index].completed;
    setTargets(newTargets);
  };

  const handleDelete = (index) => {
    const newTargets = targets.filter((_, i) => i !== index);
    setTargets(newTargets);
  };

  const handleWeightLossChange = (e) => {
    const weightLoss = e.target.value;
    setWeeklyWeightLoss(weightLoss);
    setCaloriesToBurn(weightLoss * 7700);
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen" style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <h1 className="text-5xl font-extrabold mb-8 animate-bounce">Set Your Targets</h1>
      <form onSubmit={handleFormSubmit} className="relative bg-white text-gray-800 p-8 rounded-lg shadow-2xl max-w-md w-full mb-10 transform transition-all duration-300 hover:scale-105">
        <img 
          src="https://via.placeholder.com/150" 
          alt="Fitness" 
          className="absolute top-0 right-0 h-24 w-24 m-4 rounded-full shadow-lg transform -translate-y-1/2" 
        />
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-blue-600" htmlFor="weeklyWeightLoss">
            Desired Weight Loss Rate
          </label>
          <input
            type="number"
            id="weeklyWeightLoss"
            value={weeklyWeightLoss}
            onChange={handleWeightLossChange}
            className="w-full p-3 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter weight loss rate (kg)"
            required
          />
          {weeklyWeightLoss && (
            <p className="mt-2 text-gray-800">
              To lose {weeklyWeightLoss} kg, you need to burn approximately {caloriesToBurn} calories.
            </p>
          )}
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-green-600" htmlFor="targetDate">
            Target Date
          </label>
          <input
            type="date"
            id="targetDate"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="w-full p-3 border border-green-400 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2 text-purple-600" htmlFor="calorieSource">
            Source of Calories
          </label>
          <select
            id="calorieSource"
            value={calorieSource}
            onChange={(e) => setCalorieSource(e.target.value)}
            className="w-full p-3 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            required
          >
            <option value="" disabled>
              Select source of calories
            </option>
            <option value="fat">Fat</option>
            <option value="carbs">Carbs</option>
            <option value="proteins">Proteins</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-3 rounded-lg hover:from-green-500 hover:to-blue-600 transition duration-300 transform hover:scale-105"
        >
          Set Targets
        </button>
      </form>
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-2xl max-w-full">
        <h2 className="text-3xl font-bold mb-6">My Targets</h2>
        <ul className="flex flex-wrap gap-4">
          {targets.map((target, index) => (
            <li key={index} className={`p-6 border rounded-lg ${target.completed ? 'bg-green-200' : 'bg-white'} shadow-md flex-1 min-w-[300px] transform transition-all duration-300 hover:scale-105`}>
              <div>
                <p className="font-bold">Weight Loss Rate: {target.weeklyWeightLoss} kg</p>
                <p>Target Date: {target.targetDate}</p>
                <p>Source of Calories: {target.calorieSource}</p>
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleMarkCompleted(index)}
                  className={`px-4 py-2 rounded-lg ${target.completed ? 'bg-yellow-500' : 'bg-green-500'} text-white transform transition duration-300 hover:scale-110`}
                >
                  {target.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white transform transition duration-300 hover:scale-110"
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
