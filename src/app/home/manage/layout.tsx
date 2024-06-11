'use client';
import React, { useState } from 'react';
import Bookmarks from '@/app/ui/manage/recruiters/bookmarks';
import JobDetails from '@/app/ui/manage/recruiters/jobDetails';
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

  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-64 flex-none h-screen overflow-auto">
        <Bookmarks onSelectJob={handleSelectJob} />
      </div>
      <div className="flex-1 p-4 overflow-x-auto overflow-y-auto no-scrollbar">
        {selectedJob && (
          <JobDetails job={selectedJob} onClose={handleCloseJobDetails} />
        )}
      </div>
    </div>
  );
};

export default ManageLayout;
