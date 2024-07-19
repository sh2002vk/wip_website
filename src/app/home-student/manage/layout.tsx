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

  const testJobApplications = [
    {
      id: '1',
      company: "WorkInProgress",
      title: "Software Engineer",
      type: "Full-time",
      location: "Vancouver, BC",
      jobDetail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      jobDetailJobType: "remote, hybrid",
      jobDetailDuration: "4 months, 8 months",
      jobQualification: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      requiredDocuments: {
        coverLetter: true,
        videoApplication: true,
        cognitiveTest: true,
        englishSample: true,
        onlineAssessment: true
      }
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
      requiredDocuments: {
        coverLetter: true,
        videoApplication: false,
        cognitiveTest: true,
        englishSample: false,
        onlineAssessment: true
      }
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
      requiredDocuments: {
        coverLetter: true,
        videoApplication: false,
        cognitiveTest: false,
        englishSample: false,
        onlineAssessment: false
      }
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
      requiredDocuments: {
        coverLetter: false,
        videoApplication: false,
        cognitiveTest: false,
        englishSample: false,
        onlineAssessment: false
      }
    },
  ]

  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState(testJobApplications);
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

  useEffect(() => {
    // console.log("Jobs State:", jobs);
  }, [jobs]);

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-64 flex-none h-screen overflow-auto">
        <Bookmarks
          user={user}
          onSelectJob={handleSelectJob} 
          initialDrafts={jobs} 
        />
      </div>
      <div className="flex-1 p-4 overflow-x-auto overflow-y-auto no-scrollbar">
        {selectedJob && (
          <JobDetails 
            key={selectedJob.id} 
            job={selectedJob}
            onClose={handleCloseJobDetails} 
            onJobDelete={handleJobDelete}
          />
        )}
      </div>
    </div>
  );
};

export default ManageLayout;