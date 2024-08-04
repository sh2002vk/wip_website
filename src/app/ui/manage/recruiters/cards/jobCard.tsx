'use client';
import React from 'react';

interface JobCardProps {
  company: string;
  title: string;
  type: string;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ company, title, type, onClick }) => {
  return (
    <div className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg h-auto" onClick={onClick}>
      <div className="flex justify-between">
        <p className="text-sm font-bold italic text-black">{company}</p>
      </div>
      <div className="mt-1 flex flex-wrap items-center">
        <p className="text-sm flex-1">{title || "New Role"}</p>
        <p className="text-xxs p-1 rounded-md bg-gray-300 mt-2 sm:mt-1">{type}</p>
      </div>
    </div>
  );
};

export default JobCard;
