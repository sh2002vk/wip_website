'use client'
import React, { useState, useEffect } from 'react';
import Bookmarks from '@/app/ui/manage/recruiters/bookmarks';
import JobDetails from '@/app/ui/manage/recruiters/jobDetails';
import SideBar from "@/app/ui/home/sidebar"; 

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const ManageLayout = ({ children, title }: LayoutProps) => {

  const initialDrafts = [
    {
      id: '1',
      company: "WorkInProgress",
      title: "Software Engineer",
      type: "Full-time",
      location: "Vancouver, BC",
      jobDetail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      jobQualification: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      draft: true,
    },
    {
      id: '2',
      company: "WorkInProgress",
      title: "To Delete",
      type: "Full-time",
      location: "",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
    {
      id: '3',
      company: "WorkInProgress",
      title: "Test Index 1",
      type: "Full-time",
      location: "",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
    {
      id: '4',
      company: "WorkInProgress",
      title: "Test Index 2",
      type: "Full-time",
      location: "",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
    {
      id: '5',
      company: "WorkInProgress",
      title: "Test Index 3",
      type: "Full-time",
      location: "",
      jobDetail: "",
      jobBenefits: "",
      jobDescription: "",
      draft: true,
    },
  ]

  const initialCompleted = [
    {
      id: '6',
      company: "WorkInProgress",
      title: "Software Engineer",
      type: "Full-time",
      location: "Completed, BC",
      jobDetail: "Currently seeking an experienced software Developer for development of our next generation security solution impacting multiple products...",
      jobBenefits: "Has listed the base salary ranges it in good faith expects to pay applicants for this role in the locations listed, as of the time of this posting.",
      jobDescription: "You will do full stack development working on both game client and backend services.",
      draft: false,
    },
  ]

  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState(initialDrafts);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  const handleJobUpdate = (updatedJob) => {
    // console.log("Updated Job:", updatedJob);
    setJobs((currentJobs) => {
      const updatedJobs = currentJobs.map((job) => 
        job.id === updatedJob.id ? updatedJob : job
      );
      // console.log("Updated Jobs List:", updatedJobs);
      return updatedJobs;
    });
  };

  useEffect(() => {
    // console.log("Jobs State:", jobs);
  }, [jobs]);

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-64 flex-none h-screen overflow-auto">
        <Bookmarks 
          onSelectJob={handleSelectJob} 
          initialDrafts={jobs} 
          initialCompleted={initialCompleted}
        />
      </div>
      <div className="flex-1 p-4 overflow-x-auto overflow-y-auto no-scrollbar">
        {selectedJob && (
          <JobDetails 
            key={selectedJob.id} 
            job={selectedJob}
            onClose={handleCloseJobDetails} 
            onJobUpdate={handleJobUpdate} // Pass the update handler
          />
        )}
      </div>
    </div>
  );
};

export default ManageLayout;