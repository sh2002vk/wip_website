'use client'
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFilters } from 'logic/FiltersContext';
import ToggleSwitch from '../manage/recruiters/cards/toggleSwitch';
import TripleToggle from './recruiters/cards/tripleToggle';
import JobOptionToggle from '../manage/recruiters/cards/jobOptionToggle';

//Half implemented, does not seem like a valid option, may come back to this later
// import RangeSlider from './recruiters/cards/rangeSlider';

import TouchRipple from '@mui/material/ButtonBase/TouchRipple';

type ParametersProps = {
  onSearch: (filters: { availability: number; preference: string; degreeLevel: string; date: Dayjs | null; keyword: string }) => void;
};

export default function Parameters({ onSearch }: ParametersProps) {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());

  const [keyword, setKeyword] = React.useState('');

  const [activeToggle, setActiveToggle] = React.useState('Global'); // Default to 'Global'
  const [preferences, setPreferences] = React.useState([]);
  const [availabilities, setAvailabilities] = React.useState([]);
  const [degreeLevels, setDegreeLevels] = React.useState([]);

  const [minSalary, setMinSalary] = React.useState("");
  const [maxSalary, setMaxSalary] = React.useState("");

  const handleShowResults = () => {
    // Construct an object with the current filter states
    const currentFilters = { availabilities, preferences, degreeLevels, date, keyword, minSalary, maxSalary};
    // console.log("Current Filters: ", currentFilters);
    // Pass the current filter states to the parent component via the onSearch function
    onSearch(currentFilters);
  };

  const handleMinSalaryChange = (event) => {
    setMinSalary(event.target.value);
  }

  const handleMaxSalaryChange = (event) => {
    setMaxSalary(event.target.value);
  }

  const handleKeywordChange = (event) => {
    // Update the searchTerm state variable with the new input value
    console.log("setting", event.target.value);
    setKeyword(event.target.value);
  };

  const handleClearFilters = () => {
    // Reset all states to their initial values
    console.log('clear filters');
    setAvailabilities([]);
    setPreferences([]);
    setDegreeLevels([]);
    setDate(dayjs());
    setKeyword('');
    setMaxSalary("");
    setMinSalary("");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="flex flex-col h-screen w-full mx-auto bg-white py-4 space-y-4 border-r border-black">
        <div className='container mx-auto pr-4'>

          <div className="bg-gray-100 rounded-lg my-7">
            <ToggleSwitch 
              leftToggle="Global" 
              rightToggle="Curated" 
              activeToggle={activeToggle} 
              setActiveToggle={setActiveToggle} 
            />          
          </div>

          {/* Search Bar */}
          <form className="flex justify-center mb-8">   
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input type="search" value={keyword} onChange={handleKeywordChange} id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Keywords"/>
              </div>
          </form>

          {/* Title */}
          <div className="flex justify-left text-xs mt-8">
            <p>AVAILABILITY</p>
          </div>

          {/* Work Styles selection */}
          <div className="bg-gray-100 rounded-lg my-2">
            <TripleToggle
              leftToggle="In-Person" 
              rightToggle="Remote" 
              middleToggle="Hybrid"
              activeToggles={preferences}
              setActiveToggles={setPreferences} 
            />          
          </div>

          {/* Term Length */}
          <div className="bg-gray-100 rounded-lg my-2">
            <TripleToggle
              leftToggle="4 Months" 
              rightToggle="8 Months" 
              middleToggle="12 Months"
              activeToggles={availabilities}
              setActiveToggles={setAvailabilities} 
            />          
          </div>

          {/* Start Date Selection */}
          <div id="start-month" className="flex py-8 justify-center space-x-0">
              <DatePicker
                  label="Start Date"
                  value={date}
                  onChange={(newDate) => setDate(newDate)}
                  className="w-52"
              />
          </div>

          {/* Title */}
          <div className="flex justify-left text-xs">
            <p>DEGREE LEVEL</p>
          </div>

          {/* Degree level selection */}
          <div className="bg-gray-100 rounded-lg my-2">
            <TripleToggle
              leftToggle="3/4 Year" 
              rightToggle="Masters" 
              middleToggle="PHD"
              activeToggles={availabilities}
              setActiveToggles={setAvailabilities} 
            />          
          </div>

          <div className="flex justify-left text-xs mt-8">
            <p>SALARY RANGE</p>
          </div>
          <div className="flex justify-center space-x-2">
            <input
              type="search"
              value={minSalary}
              onChange={handleMinSalaryChange}
              className="w-full max-w-xs p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Min"
            />
            <input
              type="search"
              value={maxSalary}
              onChange={handleMaxSalaryChange}
              className="w-full max-w-xs p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Max"
            />
          </div>

          {/* Results & Clear Filter */}
          <div className="flex justify-center space-x-2 mt-auto py-4">
            <button
              onClick={handleClearFilters}
              className="flex-1 bg-orange-500 text-white text-s font-medium py-1 px-1 border border-orange-700 rounded hover:bg-orange-400">
              Clear Filters
            </button>
            <button
              onClick={handleShowResults}
              className="flex-1 bg-orange-500 text-white text-s font-medium py-1 px-1 border border-orange-700 rounded hover:bg-orange-400">
              Search
            </button>
          </div>



        </div>
      </div>
    </LocalizationProvider>
  );
}
