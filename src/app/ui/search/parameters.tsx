'use client'
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFilters } from 'logic/FiltersContext';

type ParametersProps = {
  onSearch: (filters: { availability: number; preference: string; degreeLevel: string; date: Dayjs | null; keyword: string }) => void;
};

export default function Parameters({ onSearch }: ParametersProps) {
  const [availability, setAvailability] = React.useState(0);
  const [preference, setPreference] = React.useState("UNAVAILABLE");
  const [degreeLevel, setDegreeLevel] = React.useState("UNAVAILABLE");
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [keyword, setKeyword] = React.useState('');

  const handleShowResults = () => {
    // Construct an object with the current filter states
    const currentFilters = { availability, preference, degreeLevel, date, keyword };
    // console.log("Current Filters: ", currentFilters);
    // Pass the current filter states to the parent component via the onSearch function
    onSearch(currentFilters);
  };

  const handleKeywordChange = (event) => {
    // Update the searchTerm state variable with the new input value
    console.log("setting", event.target.value);
    setKeyword(event.target.value);
  };

  const handleClearFilters = () => {
    // Reset all states to their initial values
    console.log('clear filters');
    setAvailability(0);
    setPreference("UNAVAILABLE");
    setDegreeLevel("UNAVAILABLE");
    setDate(dayjs());
    setKeyword('');
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="flex flex-col h-screen w-full mx-auto bg-white py-4 space-y-4 border-r border-black">
        <div className='container mx-auto pr-4'>

          {/* Search Bar */}
          <form className="flex justify-center">   
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
          <div className="flex justify-center text-xs">
            <p>AVAILABILITY</p>
          </div>

          {/* Work Styles selection */}
          <div id="work-style-preference" className="flex justify-center space-x-0 py-1">
            <button onClick={() => setPreference("REMOTE")} className={`bg-gray-200 hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2.5 border border-black-500 hover:border-transparent rounded text-xs ${preference === "REMOTE" ? "bg-orange-200 text-black" : ""}`}>
              REMOTE
            </button>
            <button onClick={() => setPreference("HYBRID")} className={`bg-gray-200 hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2.5 border border-black-500 hover:border-transparent rounded text-xs ${preference === "HYBRID" ? "bg-orange-200 text-black" : ""}`}>
              HYBRID
            </button>
            <button onClick={() => setPreference("INPERSON")} className={`bg-gray-200 hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2.5 border border-black-500 hover:border-transparent rounded text-xs ${preference === "INPERSON" ? "bg-orange-200 text-black" : ""}`}>
              IN PERSON
            </button>
          </div>

          {/* Term Length */}
          <div id="time-in-months" className="flex justify-center space-x-0">
            <button onClick={() => setAvailability(4)} className={`bg-gray-200 hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2 border border-black-500 hover:border-transparent rounded text-xs ${availability === 4 ? "bg-orange-200 text-black" : ""}`}>
              4 months
            </button>
            <button onClick={() => setAvailability(8)} className={`bg-gray-200 hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2 border border-black-500 hover:border-transparent rounded text-xs ${availability === 8 ? "bg-orange-200 text-black" : ""}`}>
              8 months
            </button>
            <button onClick={() => setAvailability(12)} className={`bg-gray-200 hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2 border border-black-500 hover:border-transparent rounded text-xs ${availability === 12 ? "bg-orange-200 text-black" : ""}`}>
              12 months
            </button>
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
          <div className="flex justify-center text-xs">
            <p>DEGREE LEVEL</p>
          </div>

          {/* Degree level selection */}
          <div id="degree-level-preference" className="flex justify-center space-x-0 py-1">
            <button onClick={() => setDegreeLevel("UGRADSENIOR")} className={`bg-gray-200 hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2.5 border border-black-500 hover:border-transparent rounded text-xs ${degreeLevel === "UGRADSENIOR" ? "bg-orange-200 text-black" : ""}`}>
              3/4 YEAR
            </button>
            <button onClick={() => setDegreeLevel("MASTERS")} className={`bg-gray-200 hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2.5 border border-black-500 hover:border-transparent rounded text-xs ${degreeLevel === "MASTERS" ? "bg-orange-200 text-black" : ""}`}>
              MASTERS
            </button>
            <button onClick={() => setDegreeLevel("PHD")} className={`bg-gray-200 hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2.5 border border-black-500 hover:border-transparent rounded text-xs ${degreeLevel === "PHD" ? "bg-orange-200 text-black" : ""}`}>
              PHD
            </button>
          </div>

          {/* Results & Clear Filter */}
          <div className="flex justify-center space-x-2 mt-auto py-4">
            <button
              onClick={handleClearFilters}
              className="bg-orange-500 text-white text-s font-medium py-1 px-3 border border-orange-700 rounded hover:bg-orange-400">
              Clear Filters
            </button>
            <button
              onClick={handleShowResults}
              className="bg-orange-500 text-white text-s font-medium py-1 px-3 border border-orange-700 rounded hover:bg-orange-400">
              Search
            </button>
          </div>

        </div>
      </div>
    </LocalizationProvider>
  );
}
