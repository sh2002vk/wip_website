'use client'
import React, { useState, useEffect } from 'react';
import Bookmarks from '@/app/ui-student/manage/bookmarks';
import JobDetails from '@/app/ui-student/manage/jobDetails';
import SideBar from "@/app/ui/home/sidebar";
import { useAuth } from '../../../context/authContext'; // Import useAuth hook
import { useRouter } from 'next/navigation';

type LayoutProps = {
  children: React.ReactNode;
};

const ManageLayout = ({ children }: LayoutProps) => {
  const { user, loading: authLoading } = useAuth(); // Use loading state from useAuth
  const [selectedJob, setSelectedJob] = useState(null);
  const [quota, setQuota] = useState(0);
  const [hasApplications, setHasApplications] = useState(true);
  const [dataLoading, setDataLoading] = useState(true); // Loading state for data fetching
  const [loadingApplications, setLoadingApplications] = useState(true); // Loading state for applications
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user) {
      setDataLoading(true); // Set loading state to true before fetching
      fetchQuota(user);
      calculateQuota();
      setApplications();
      setDataLoading(false); // Set loading state to false after fetching
    }
  }, [user, authLoading]);

  const fetchQuota = async (user) => {
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:4000/account/student/getQuota?studentID=${user.uid}`);
      if (!response.ok) {
        console.log("Error in response");
        return;
      }
      const quotaData = await response.json();
      console.log("quota", quotaData.quota);
      setQuota(quotaData.quota);
    } catch (error) {
      console.log("Error in fetching quota amount", error);
    }
  }

  const setApplications = async () => {
    setLoadingApplications(true); // Set loading to true before fetching
    const applications = await fetchApplications();
    if (applications && Array.isArray(applications)) {
      setHasApplications(applications.length > 0);
    } else {
      setHasApplications(false);
    }
    setLoadingApplications(false); // Set loading to false after fetching
  }

  const fetchApplications = async () => {
    try {
      const responseApp = await fetch(`http://localhost:4000/action/student/getApplications?studentID=${user.uid}`)
      const dataApp = await responseApp.json();
      if (!responseApp.ok) {
        throw new Error;
      }
      return dataApp;
    } catch (error) {
      console.log("Error in fetching applications");
    }
  }

  const calculateQuota = async () => {
    try {
      const responseStu = await fetch(`http://localhost:4000/profile/student/getFullProfile?studentID=${user.uid}`)
      const dataStu = await responseStu.json();
      if (!responseStu.ok) {
        throw new Error;
      }
      const dataApp = await fetchApplications();
      const maxQuota = dataStu.data.MaxQuota;
      const appliedJobs = dataApp.filter((apps) => apps.Status !== "DRAFT");

      const newQuota = maxQuota - appliedJobs.length;
      console.log("maxQuota", maxQuota);
      console.log("app length", appliedJobs);
      console.log("new quota", newQuota);

      const response = await fetch('http://localhost:4000/account/student/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentID: user.uid,
          updatedData: {
            Quota: newQuota,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setQuota(newQuota);
      console.log('Quota updated successfully:', data);
    } catch (error) {
      console.log("Error in calculating/updating newQuota")
    }
  }

  const handleSearchNav = () => {
    router.replace('/home-student/search');
  };

  const handleSelectJob = (job: any) => {
    setSelectedJob(job);
  };

  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  const handleJobDelete = () => {
    setSelectedJob(null);
  };

  // Render loading state if either auth or data is loading
  if (authLoading || dataLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-64 flex-none h-screen overflow-auto">
        <Bookmarks
          user={user}
          sharedQuota={quota}
          onSelectJob={handleSelectJob} 
        />
      </div>
      <div className="flex-1 p-4 overflow-x-auto overflow-y-auto no-scrollbar">
        {selectedJob ? (
          <JobDetails
            calculateQuota={calculateQuota}
            sharedQuota={quota}
            user={user}
            applicationData={selectedJob}
            onClose={handleCloseJobDetails} 
            onJobDelete={handleJobDelete}
          />
        ) : (
            <>
              {loadingApplications ? ( // Check the loading state before rendering
                  <span>Loading applications...</span>
              ) : (
                  <div className="flex h-full items-center justify-center">
                    {!hasApplications && (
                        <div className="flex flex-col items-center space-y-3">
                          <div className="bg-gray-200 text-gray-700 p-4 rounded-lg">
                            No applications found
                          </div>
                          <span
                            onClick={handleSearchNav}
                            className="cursor-pointer text-orange-500 hover:underline"
                          >
                            Take me to search
                          </span>
                        </div>
                    )}
                  </div>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default ManageLayout;