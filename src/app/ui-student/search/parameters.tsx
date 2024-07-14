"use client";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import ToggleSwitch from "@/app/ui/manage/recruiters/cards/toggleSwitch";
import TripleToggle from "./recruiters/cards/tripleToggle";
import { styled } from "@mui/material/styles";

type ParametersProps = {
  onSearch: (filters: {
    availability: number;
    startDate: Dayjs | null;
    endDate: Dayjs | null;
    keyword: string;
    location: string;
  }) => void;
  user: any;
};

const StyledDatePicker = styled(DatePicker)({
  "& .MuiInputBase-input": {
    fontSize: "0.75rem",
    paddingRight: "0rem",
    width: "10rem",
    height: "1rem",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "1rem",
    marginRight: "10px",
  },
  "& .MuiOutlinedInput-root": {
    border: "none",
    padding: "0",
  },
  "& .MuiFormLabel-root": {
    fontSize: "0.75rem",
  },
});

export default function Parameters({ onSearch, user }: ParametersProps) {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const [activeToggle, setActiveToggle] = useState("Curated");
  const [availabilities, setAvailabilities] = useState([]);
  const [workingTypes, setWorkingTypes] = useState([]);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");

  const [showMorePrograms, setShowMorePrograms] = useState(false);
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  // Sample location history data
  const locationHistory = ["Vancouver", "Toronto"];

  const handleShowResults = () => {
    const currentFilters = {
      availabilities,
      workingTypes,
      startDate,
      endDate,
      keyword,
      location,
      minSalary,
      maxSalary,
    };
    onSearch(currentFilters);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleClearFilters = () => {
    setAvailabilities([]);
    setStartDate(dayjs());
    setEndDate(dayjs());
    setKeyword("");
    setLocation("");
    setMaxSalary("");
    setMinSalary("");
    setSelectedPrograms([]);
  };

  const handleProgramChange = (program) => {
    if (selectedPrograms.includes(program)) {
      setSelectedPrograms(selectedPrograms.filter((p) => p !== program));
    } else {
      setSelectedPrograms([...selectedPrograms, program]);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-col h-screen w-full mx-auto bg-white pl-4 py-4 space-y-4 border-r border-black">
        <div className="container mx-auto pr-4 h-full flex flex-col">
          <div className="my-5">
            <ToggleSwitch
              leftToggle="Curated"
              rightToggle="Interested"
              activeToggle={activeToggle}
              setActiveToggle={setActiveToggle}
            />
          </div>

          {/* Keyword Search */}
          <form className="flex justify-center mb-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-3 h-3 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                value={keyword}
                onChange={handleKeywordChange}
                id="keyword-search"
                className="block w-full p-1 pl-10 text-sm text-gray-900 border border-gray-200 rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="Keyword"
              />
            </div>
          </form>

          {/* Location Search */}
          <div className="flex justify-left text-xs font-bold mb-2">
            <p>Location</p>
          </div>
          <form className="flex justify-center mb-3">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-3 h-3 text-gray-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                value={location}
                onChange={handleLocationChange}
                id="location-search"
                className="block w-full p-1 pl-10 text-sm text-gray-900 border border-gray-200 rounded focus:ring-blue-500 focus:border-blue-500"
                placeholder="Location"
              />
            </div>
          </form>

          {/* Location History */}
          <div className="flex space-x-2 mb-4">
            {locationHistory.map((loc, index) => (
              <button
                key={index}
                className="bg-white border border-gray-300 px-3 py-1 rounded-full text-xs"
                onClick={() => setLocation(loc)}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Job Type */}
          <div className="flex justify-left font-bold text-xs mb-2">
            <p>Job type</p>
          </div>
          <div className="bg-gray-200 rounded-xs mb-2">
            <TripleToggle
              leftToggle="In-Person"
              rightToggle="Hybrid"
              middleToggle="Remote"
              activeToggles={workingTypes}
              setActiveToggles={setWorkingTypes}
            />
          </div>

          {/* Term Availability */}
          <div className="bg-gray-200 rounded-xs mb-4">
            <TripleToggle
              leftToggle="4 Months"
              rightToggle="1+ Year"
              middleToggle="8 Months"
              activeToggles={availabilities}
              setActiveToggles={setAvailabilities}
            />
          </div>
          
          {/* Month Picker */}
          <div id="start-end-dates" className="flex justify-between space-x-2">
            <StyledDatePicker
              label="Start Month"
              value={startDate}
              onChange={(newDate) => setStartDate(newDate)}
              className="w-52"
              views={["year", "month"]}
              format="MMMM YYYY"
            />
          </div>

          {/* Industry Checkboxes */}
          <div className="flex justify-left text-xs font-bold mt-5 mb-3">
            <p>Industry</p>
          </div>
          <div className="rounded-lg text-xs font-light">
            <div className="flex flex-col space-y-2">
              {["IT", "Software Engineering", "Finance"].map((industry) => (
                <label key={industry} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedPrograms.includes(industry)}
                    onChange={() => handleProgramChange(industry)}
                  />
                  <span>{industry}</span>
                </label>
              ))}
              {showMorePrograms &&
                [
                  "Analytics",
                  "Consulting",
                  "UI/UX",
                  "Testing",
                  "Engineering",
                ].map((program) => (
                  <label key={program} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedPrograms.includes(program)}
                      onChange={() => handleProgramChange(program)}
                    />
                    <span>{program}</span>
                  </label>
                ))}
              <button
                onClick={() => setShowMorePrograms(!showMorePrograms)}
                className="text-blue-500 text-xs"
              >
                {showMorePrograms ? "Show less" : "Show more"}
              </button>
            </div>
          </div>

          {/* Clear Filter and Search */}
          <div className="flex justify-center space-x-1 mt-auto py-8">
            <button
              onClick={handleClearFilters}
              className="flex items-center justify-center h-9 w-28 rounded-md bg-[#ff6f00] text-white py-1 px-1 transition-colors hover:bg-blue-400"
            >
              Clear Filters
            </button>
            <button
              onClick={handleShowResults}
              className="flex items-center justify-center h-9 w-28 rounded-md bg-[#ff6f00] text-white transition-colors hover:bg-blue-400"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </LocalizationProvider>
  );
}