import Link from 'next/link';
// import Image from 'next/image'; // if you are using images for logos or icons
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHouse, faSearch, faCog } from '@fortawesome/free-solid-svg-icons';
'use client'
import React, { useState } from 'react';
import ToggleSwitch from './toggleSwitch';

export default function Bookmarks() {

  const drafts = [
    {
      title: "Software Engineer",
      type: "Full-time",
      jobDetail: "Currently seeking an experienced software Developer for development of our next generation security solution impacting multiple products...",
      jobBenefits: "Has listed the base salary ranges it in good faith expects to pay applicants for this role in the locations listed, as of the time of this posting.",
      jobDescription: "You will do full stack development working on both game client and backend services.",
      draft: true,
    },
    {
      title: "Software Engineer",
      type: "Full-time",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
    {
      title: "Software Engineer",
      type: "Full-time",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
    {
      title: "Software Engineer",
      type: "Full-time",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
    {
      title: "Software Engineer",
      type: "Full-time",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
  ]
  const completed = [
    {
      title: "Software Engineer",
      type: "Full-time",
      jobDetail: "Currently seeking an experienced software Developer for development of our next generation security solution impacting multiple products...",
      jobBenefits: "Has listed the base salary ranges it in good faith expects to pay applicants for this role in the locations listed, as of the time of this posting.",
      jobDescription: "You will do full stack development working on both game client and backend services.",
      draft: false,
    },
  ]


  const [activeToggle, setActiveToggle] = useState('Drafts'); // Default to 'Drafts'

  return (
      <div className="flex flex-col h-screen w-full mx-auto bg-white py-4 space-y-4 border-r border-black">
        <div className='container mx-auto pr-4'>
          {/*Contains a toggle switch, a list of job postings, and a new post button*/}

          <div className="bg-gray-100 rounded-lg my-7">
            <ToggleSwitch 
              leftToggle="Drafts" 
              rightToggle="Completed" 
              activeToggle={activeToggle} 
              setActiveToggle={setActiveToggle} 
            />          
          </div>
          
          <div className="flex flex-col space-y-2 my-2">
            {/* Conditionally render drafts or completed based on activeToggle */}
            {activeToggle === 'Drafts' && drafts.map((item, index) => (
              <div key={index} className="bg-red-100 p-4 rounded-lg shadow-md">
                <p className="text-xs font-semibold text-red-600">{item.title}</p>
                <p className="text-sm">{item.type}</p>
              </div>
            ))}

            {activeToggle === 'Completed' && completed.map((item, index) => (
              <div key={index} className="bg-green-100 p-4 rounded-lg shadow-md">
                <p className="text-xs font-semibold text-green-600">{item.title}</p>
                <p className="text-sm">{item.type}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            {/* New post button */}
            <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
              + New Job Posting
            </button>
          </div>
        </div>
      </div>
  );
}
