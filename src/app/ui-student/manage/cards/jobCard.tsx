'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface JobCardProps {
  company: string;
  title: string;
  onRemove: () => void;
  onClick: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ company, title, type, onRemove, onClick }) => {
  return (
    <div className="bg-gray-100 hover:bg-gray-200 p-4 rounded-lg h-[9vh]" onClick={onClick}>
      <div className="flex justify-between">
        <p className="text-sm font-bold italic text-black">{company}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm">{title}</p>
      </div>
    </div>
  );
};

export default JobCard;