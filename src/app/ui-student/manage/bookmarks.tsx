'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ToggleSwitch from './cards/toggleSwitch';
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import JobCard from './cards/jobCard';

export default function Bookmarks({ onSelectJob, initialDrafts}) {
  
  const [drafts, setDrafts] = useState(initialDrafts);

  useEffect(() => {
    setDrafts(initialDrafts);
  }, [initialDrafts]);

  const handleRemoveBookmark = (id) => {
      setDrafts(drafts.filter(draft => draft.id !== id));
  };

  const applicationsLeft = drafts.length;

  return (
    <div className="flex flex-col h-screen w-full mx-auto bg-white pl-4 py-4 space-y-4 border-r border-black">
      <div className='container mx-auto pr-4'>
        {/* Contains a toggle switch, a list of job postings, and a new post button */}

        <div className="text-xl text-center font-bold my-7">
          Applications   
        </div>
        
        <div className="flex flex-col space-y-2 my-2 h-[75vh] overflow-y-auto no-scrollbar pt-7">
          {drafts.map((job) => (
            <JobCard 
              key={job.id}
              company={job.company}
              title={job.title}
              onClick={() => onSelectJob(job)} 
              onRemove={() => handleRemoveBookmark(job.id)} 
            />
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <p className="text-center text-md font-semibold">
            You have <span className="text-orange-500">{drafts.length}</span> applications left
            {/*Add logic here to display how many applications are not completed */}
          </p>
        </div>
      </div>
    </div>
  );
}