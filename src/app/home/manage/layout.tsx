'use client';
import React, { useState } from 'react';
import Bookmarks from '@/app/ui/manage/bookmarks';
import JobDetails from '@/app/ui/manage/jobDetails';
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
    <div className="flex h-screen">
      <div className="w-full md:w-64 flex-none h-screen overflow-auto">
        {/* List to display drafts or completed job postings */}
        <Bookmarks onSelectJob={handleSelectJob} />
      </div>
      <div className="flex-1 p-4 overflow-x-auto  overflow-y-auto no-scrollbar">
        {/* Section used to modify or view the draft and completed job posting contents */}
        {selectedJob && <JobDetails job={selectedJob} />}
      </div>
    </div>
  );
};

export default ManageLayout;
