import React from 'react';
import bgImage from './images/bg.png';
import dietData from './diet.json';

export default function Timetable() {
  return (
    <div
      className="flex flex-col items-center p-6 min-h-screen mt-20 bg-black bg-opacity-50"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-2xl mt-2 sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white bg-gradient-to-r from-purple-600 to-blue-500 p-4 rounded-lg shadow-lg">
        Food Timetable
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {dietData.diet.map((dayData, index) => (
          <div key={index} className="bg-white bg-opacity-90 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-purple-800 mb-2">{dayData.day}</h2>
            <div className="mb-2">
              <h3 className="text-md font-semibold text-blue-800">Breakfast</h3>
              <p className="text-gray-800">{dayData.meals.Breakfast}</p>
            </div>
            <div className="mb-2">
              <h3 className="text-md font-semibold text-blue-800">Lunch</h3>
              <p className="text-gray-800">{dayData.meals.Lunch}</p>
            </div>
            <div className="mb-2">
              <h3 className="text-md font-semibold text-blue-800">Dinner</h3>
              <p className="text-gray-800">{dayData.meals.Dinner}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
