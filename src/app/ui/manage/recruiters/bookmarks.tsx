'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ToggleSwitch from './cards/toggleSwitch';
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import JobCard from './cards/jobCard';

export default function Bookmarks({ onSelectJob, initialDrafts, initialCompleted }) {
  
  const [drafts, setDrafts] = useState(initialDrafts);
  const [completed, setCompleted] = useState(initialCompleted);

  useEffect(() => {
    setDrafts(initialDrafts);
  }, [initialDrafts]);

  useEffect(() => {
    setCompleted(initialCompleted);
  }, [initialCompleted]);

  const handleRemoveBookmark = (id, isDraft) => {
    if (isDraft === true) {
      setDrafts(drafts.filter(draft => draft.id !== id));
    } else {
      setCompleted(completed.filter(comp => comp.id !== id));
    }
  };

  const [activeToggle, setActiveToggle] = useState('Drafts');

  return (
    <div className="flex flex-col h-screen w-full mx-auto bg-white pl-4 py-4 space-y-4 border-r border-black">
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
          {activeToggle === 'Drafts' && drafts.map((job) => (
            <JobCard 
              key={job.id}
              company={job.company}
              title={job.title}
              type={job.type}
              onClick={() => onSelectJob(job)} 
              onRemove={() => handleRemoveBookmark(job.id, job.draft)} 
            />
          ))}

          {activeToggle === 'Completed' && completed.map((job) => (
            <JobCard 
              key={job.id}
              company={job.company}
              title={job.title}
              type={job.type}
              onClick={() => onSelectJob(job)} 
              onRemove={() => handleRemoveBookmark(job.id, job.draft)} 
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
