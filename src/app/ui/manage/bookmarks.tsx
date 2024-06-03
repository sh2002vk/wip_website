'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import ToggleSwitch from './toggleSwitch';
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //used for the close button on each job posting
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import JobCard from './jobCard';


export default function Bookmarks({ onSelectJob }) {

  const initialDrafts = [
    {
      company: "WorkInProgress",
      title: "Software Engineer",
      type: "Full-time",
      jobDetail: "Currently seeking an experienced software Developer for development of our next generation security solution impacting multiple products...",
      jobBenefits: "Has listed the base salary ranges it in good faith expects to pay applicants for this role in the locations listed, as of the time of this posting.",
      jobDescription: "You will do full stack development working on both game client and backend services.",
      draft: true,
    },
    {
      company: "WorkInProgress",
      title: "To Delete",
      type: "Full-time",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
    {
      company: "WorkInProgress",
      title: "Test Index 1",
      type: "Full-time",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
    {
      company: "WorkInProgress",
      title: "Test Index 2",
      type: "Full-time",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
    {
      company: "WorkInProgress",
      title: "Test Index 3",
      type: "Full-time",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
    {
      company: "WorkInProgress",
      title: "Software Engineer",
      type: "Full-time",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
    {
      company: "WorkInProgress",
      title: "Software Engineer",
      type: "Full-time",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
    {
      company: "WorkInProgress",
      title: "Software Engineer",
      type: "Full-time",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
    {
      company: "WorkInProgress",
      title: "Software Engineer",
      type: "Full-time",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
  ]

  const initialCompleted = [
    {
      company: "WorkInProgress",
      title: "Software Engineer",
      type: "Full-time",
      jobDetail: "Currently seeking an experienced software Developer for development of our next generation security solution impacting multiple products...",
      jobBenefits: "Has listed the base salary ranges it in good faith expects to pay applicants for this role in the locations listed, as of the time of this posting.",
      jobDescription: "You will do full stack development working on both game client and backend services.",
      draft: false,
    },
  ]

  const [activeToggle, setActiveToggle] = useState('Drafts'); // Default to 'Drafts'
  const [drafts, setDrafts] = useState(initialDrafts);
  const [completed, setCompleted] = useState(initialCompleted);

  const handleRemove = (index) => {
    if (activeToggle === 'Drafts') {
      const newDrafts = drafts.filter((_, i) => i !== index);
      setDrafts(newDrafts);
    } else {
      const newCompleted = completed.filter((_, i) => i !== index);
      setCompleted(newCompleted);
    }
  };

  const handleSelect = (job) => {
    onSelectJob(job);
  };

  return (
    <div className="flex flex-col h-screen w-full mx-auto bg-white py-4 space-y-4 border-r border-black">
      <div className='container mx-auto pr-4'>
        {/* Contains a toggle switch, a list of job postings, and a new post button */}

        <div className="bg-gray-100 rounded-lg my-7">
          <ToggleSwitch 
            leftToggle="Drafts" 
            rightToggle="Completed" 
            activeToggle={activeToggle} 
            setActiveToggle={setActiveToggle} 
          />          
        </div>
        
        <div className="flex flex-col space-y-2 my-2 h-[75vh] overflow-y-auto no-scrollbar">
          {/* Conditionally render drafts or completed based on activeToggle */}
          {activeToggle === 'Drafts' && drafts.map((item, index) => (
            <JobCard
              key={index}
              company={item.company}
              title={item.title}
              type={item.type}
              onRemove={() => handleRemove(index)}
              onClick={() => handleSelect(item)}
            />
          ))}

          {activeToggle === 'Completed' && completed.map((item, index) => (
            <JobCard
              key={index}
              company={item.company}
              title={item.title}
              type={item.type}
              onRemove={() => handleRemove(index)}
              onClick={() => handleSelect(item)}
            />
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded">
            + New Job Posting
          </button>
        </div>
      </div>
    </div>
  );
}