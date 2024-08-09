'use client'
import React, { useState, useEffect } from 'react';
import Bookmarks from '@/app/ui/manage/recruiters/bookmarks';
import JobDetails from '@/app/ui/manage/recruiters/jobDetails';
import SideBar from "@/app/ui/home/sidebar";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../firebase'; // Ensure the correct import path

import { useRouter } from 'next/navigation';
const API_URL = process.env.API_URL

type LayoutProps = {
  children: React.ReactNode;
  // title?: string;
};

const ManageLayout = ({ children }: LayoutProps) => {

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

  const [user, setUser] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [drafts, setDrafts] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [companyID, setCompanyID] = useState('');
  const [refreshBookmark, setRefreshBookmark] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push('./'); // Redirect to student home
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

  const handleJobUpdate = (updatedJob: any) => {
    setSelectedJob(updatedJob);
    setDrafts((prevDrafts) =>
        prevDrafts.map((job) => job.JobID === updatedJob.JobID ? updatedJob : job)
    );
    setCompleted((prevCompleted) =>
        prevCompleted.map((job) => job.JobID === updatedJob.JobID ? updatedJob : job)
    );
  };

  useEffect(() => {
    const fetchRecruiterProfile = async () => {
      setLoading(true);
      try {
        if (user) {
          const response = await fetch(`${API_URL}/profile/recruiter/getFullProfile?recruiterID=${user.uid}`);
          const recruiter = await response.json();
          setCompanyID(recruiter.data.CompanyID);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecruiterProfile();
  }, [user]);

  const updateJobLists = (data) => {
    const newDrafts = data.data.filter((job) => job.Status === "DRAFT");
    const newCompleted = data.data.filter((job) => job.Status === "COMPLETED");
    if (JSON.stringify(newDrafts) !== JSON.stringify(drafts)) {
      setDrafts(newDrafts);
    }
    if (JSON.stringify(newCompleted) !== JSON.stringify(completed)) {
      setCompleted(newCompleted);
    }
  };

  const fetchJobPostings = async (recruiterID) => {
    try {
      const response = await fetch(`${API_URL}/action/recruiter/getJobPostings?recruiterID=${recruiterID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        updateJobLists(data);
        if (data.data.length > 0 && data.data[0].CompanyID !== companyID) {
          setCompanyID(data.data[0].CompanyID);
        }
        setLoading(false);
      } else {
        setError(data.message);
        setLoading(false);
      }
    } catch (error) {
      setError("Error");
      setLoading(false);
    }
  };

  const fetchCompany = async (companyID) => { // We can delete this later, and instead pass the companyID in later given the recruiterID. Right now, there will be no Company ID if there are no jobs
    try {
      const response = await fetch(`${API_URL}/profile/company/getFullProfile?companyID=${companyID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setCompanyName(data.data.Name);
    } catch (error) {
      console.log('Error getting information on Company');
    }
  };

  useEffect(() => {
    if (user) {
      fetchJobPostings(user.uid);
    }
  }, [user, drafts, completed]);

  useEffect(() => {
    if (companyID) {
      fetchCompany(companyID);
    }
  }, [companyID]);


  return (
    <div className="flex h-screen">
      <div className="w-full md:w-64 flex-none h-screen overflow-auto">
        <Bookmarks
          user={user}
          onSelectJob={handleSelectJob}
          onGetJobPostings={fetchJobPostings}
          drafts={drafts}
          completed={completed}
          companyID = {companyID}
          companyName = {companyName}
        />
      </div>
      <div className="flex-1 p-4 overflow-x-auto overflow-y-auto no-scrollbar">

        {selectedJob && (
          <JobDetails 
            key={selectedJob.JobID}
            job={selectedJob}
            onClose={handleCloseJobDetails}
            onGetJobPostings={fetchJobPostings}
            companyName={companyName}
            onJobUpdate={handleJobUpdate} // Pass the update handler
          />
        )}
      </div>
    </div>
  );
};

export default ManageLayout;