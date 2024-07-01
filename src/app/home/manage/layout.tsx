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
      id: '5',
      company: "WorkInProgress",
      title: "Test Index 3",
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
      requiredDocuments: {
        coverLetter: true,
        videoApplication: false,
        cognitiveTest: false,
        englishSample: false,
        onlineAssessment: false
      }
    },
  ]

  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState(initialDrafts);
  const [drafts, setDrafts] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSelectJob = (job) => {
    setSelectedJob(job);
  };

  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  // const handleJobUpdate = (updatedJob) => {
  //   // console.log("Updated Job:", updatedJob);
  //   setJobs((currentJobs) => {
  //     const updatedJobs = currentJobs.map((job) =>
  //       job.id === updatedJob.id ? updatedJob : job
  //     );
  //     // console.log("Updated Jobs List:", updatedJobs);
  //     return updatedJobs;
  //   });
  // };

  const fetchJobPostings = async () => {
    try {
      const recruiterID = 1;
      const response = await fetch(`http://localhost:4000/action/recruiter/getJobPostings?recruiterID=${recruiterID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        const drafts = data.data.filter((job) => job.Status === "DRAFT");
        const completed = data.data.filter((job) => job.Status === "COMPLETED");
        setDrafts(drafts);
        setCompleted(completed);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error");
    }
  };

  useEffect(() => {
    // console.log("Jobs State:", jobs);
  }, [jobs]);

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-64 flex-none h-screen overflow-auto">
        <Bookmarks 
          onSelectJob={handleSelectJob}
          onGetJobPostings={fetchJobPostings}
          drafts={drafts}
          completed={completed}
        />
      </div>
      <div className="flex-1 p-4 overflow-x-auto overflow-y-auto no-scrollbar">

        {selectedJob && (
          <JobDetails 
            key={selectedJob.JobID}
            job={selectedJob}
            onClose={handleCloseJobDetails}
            onGetJobPostings={fetchJobPostings}
            // onJobUpdate={handleJobUpdate} // Pass the update handler
          />
        )}
      </div>
    </div>
  );
};

export default ManageLayout;