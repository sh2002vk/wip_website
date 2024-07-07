'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface JobCardProps {
  company: string;
  title: string;
  type: string;
  // onRemove: () => void;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ company, title, type, onClick }) => {
  return (
    <div className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg h-[9vh]" onClick={onClick}>
      <div className="flex justify-between">
        <p className="text-sm font-bold italic text-black">{company}</p>
        {/*<button onClick={(e) => { e.stopPropagation(); onRemove(); }} className="bg-transparent font-bold text-gray-400 hover:text-gray-600">*/}
        {/*  <FontAwesomeIcon icon={faTimes} />*/}
        {/*</button>*/}
      </div>
      <div className="flex justify-between">
        <p className="text-sm truncate ">{title}</p>
        <p>|</p>
        <p className="text-sm">{type}</p>
      </div>
    </div>
  );
};

export default JobCard;
