'use client'
import React, { useState, useEffect } from 'react';
import Bookmarks from '@/app/ui-student/manage/bookmarks';
import JobDetails from '@/app/ui-student/manage/jobDetails';
import SideBar from "@/app/ui/home/sidebar";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/firebase";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const ManageLayout = ({ children, title }: LayoutProps) => {
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  const handleJobDelete = () => {
    setJobs(jobs.filter(job => job.id !== selectedJob.id));
    setSelectedJob(null);
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-64 flex-none h-screen overflow-auto">
        <Bookmarks
          user={user}
          onSelectJob={handleSelectJob} 
        />
      </div>
      <div className="flex-1 p-4 overflow-x-auto overflow-y-auto no-scrollbar">
        {selectedJob && (
          <JobDetails
            user={user}
            applicationData={selectedJob}
            onClose={handleCloseJobDetails} 
            onJobDelete={handleJobDelete}
          />
        )}
      </div>
    </div>
  );
};

export default ManageLayout;