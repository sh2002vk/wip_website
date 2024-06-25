'use client'
import React, { useState } from 'react';
import './rangeSlider.css';

function RangeSlider() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(25000);

  const handleMinChange = (event) => {
    const value = Math.min(Number(event.target.value), maxValue - 1);
    setMinValue(value);
  };

  const handleMaxChange = (event) => {
    const value = Math.max(Number(event.target.value), minValue + 1);
    setMaxValue(value);
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="relative w-full max-w-lg">
        <input
          type="range"
          min="0"
          max="25000"
          value={minValue}
          onChange={handleMinChange}
          className="absolute w-full h-2 bg-transparent pointer-events-none appearance-none z-20"
          style={{
            WebkitAppearance: 'none',
            appearance: 'none',
          }}
        />
        <input
          type="range"
          min="0"
          max="25000"
          value={maxValue}
          onChange={handleMaxChange}
          className="absolute w-full h-2 bg-transparent pointer-events-none appearance-none z-20"
          style={{
            WebkitAppearance: 'none',
            appearance: 'none',
          }}
        />
        <div className="relative w-full h-2 bg-gray-300 rounded-lg z-10">
          <div
            className="absolute h-2 bg-gray-500 rounded-lg"
            style={{
              left: `${(minValue / 25000) * 100}%`,
              right: `${100 - (maxValue / 25000) * 100}%`,
            }}
          ></div>
        </div>
        <div className="flex justify-between mt-2">
          <span className="px-2 py-1 bg-gray-200 rounded-md">${minValue.toLocaleString()}</span>
          <span className="px-2 py-1 bg-gray-200 rounded-md">${maxValue.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default RangeSlider;
