'use client';
import React, { useState } from 'react';
import Bookmarks from '@/app/ui/manage/bookmarks';
import SideBar from "@/app/ui/home/sidebar"; 

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const ManageLayout = ({ children, title }: LayoutProps) => {
  const [selectedJob, setSelectedJob] = useState(null);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  return (
    <div className="flex-container flex flex-wrap">
      <div className="w-full h-screen flex-none md:w-64">
        {/* List to display drafts or completed job postings */}
        <Bookmarks onSelectJob={handleSelectJob} />
      </div>
      <div className="w-full md:w-3/4 p-4 flex flex-no-wrap overflow-x-auto grid grid-rows-2 grid-flow-col" style={{ height: 'calc(100% - 1rem)' }}>
        {/* Section used to modify or view the draft and completed job posting contents */}
        {selectedJob && (
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
            <p className="italic">{selectedJob.company}</p>
            <p className="mt-4">{selectedJob.jobDescription}</p>
            <p className="mt-2">{selectedJob.jobDetail}</p>
            <p className="mt-2">{selectedJob.jobBenefits}</p>
            <p className="mt-2">{selectedJob.type}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageLayout;
