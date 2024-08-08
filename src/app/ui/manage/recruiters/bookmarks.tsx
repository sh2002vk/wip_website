'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ToggleSwitch from './cards/toggleSwitch';
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import JobCard from './cards/jobCard';

const API_URL = process.env.API_URL


export default function Bookmarks({ user, companyName, companyID, onSelectJob, onGetJobPostings, drafts, completed }) {

  useEffect(() => {
    onGetJobPostings();
  }, );

  const fetchNewPosting = async() => {
    try {
      const response = await fetch(`${API_URL}/action/recruiter/createJobPosting`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          RecruiterID: user.uid,
          CompanyID: companyID,
          DatePosted: new Date(),
          Status: 'DRAFT'
        }),

      })
      const data = await response.json();

      if (response.ok) {
        await onGetJobPostings();
        const newJob = data;
        onSelectJob(newJob);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("error");
    } finally {
      console.log("Done loading");
    }
  }

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
              key={job.JobID}
              company={companyName}
              title={job.Role}
              type={job.Environment}
              onClick={() => onSelectJob(job)}
            />
          ))}

          {activeToggle === 'Completed' && completed.map((job) => (
            <JobCard 
              key={job.JobID}
              company={companyName}
              title={job.Role}
              type={job.Environment}
              onClick={() => onSelectJob(job)}
            />
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <button
              className="bg-[#ff6f00] hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
              onClick={fetchNewPosting}>
                  + New Job Posting
          </button>
        </div>
      </div>
    </div>
  );
}
