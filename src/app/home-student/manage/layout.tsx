'use client'
import React, { useState, useEffect } from 'react';
import Bookmarks from '@/app/ui-student/manage/bookmarks';
import JobDetails from '@/app/ui-student/manage/jobDetails';
import SideBar from "@/app/ui/home/sidebar";
import {onAuthStateChanged, User} from "firebase/auth";
import {auth} from "@/firebase";

type LayoutProps = {
  children: React.ReactNode;
};

type AuthUser = User | null;

const ManageLayout = ({ children }: LayoutProps) => {
  
  const [selectedJob, setSelectedJob] = useState(null);
  const [user, setUser] = useState<AuthUser>(null);
  const [quota, setQuota] = useState(0);

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

  const handleSelectJob = (job: any) => {
    setSelectedJob(job);
  };

  const handleCloseJobDetails = () => {
    setSelectedJob(null);
  };

  const handleJobDelete = () => {
    // setJobs(jobs.filter(job => job.id !== selectedJob.id));
    setSelectedJob(null);
  };

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

  // const increaseQuota = async (condition) => {
  //   try {
  //     await fetchQuota(user);
  //     const newQuota = quota + (condition ? 1 : -1);
  //
  //     const response = await fetch('http://localhost:4000/account/student/update', {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         studentID: user.uid,
  //         updatedData: {
  //           Quota: newQuota,
  //         },
  //       }),
  //     });
  //
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //
  //     const data = await response.json();
  //     setQuota(newQuota);
  //     console.log('Quota updated successfully:', data);
  //
  //     return data;
  //   } catch (error) {
  //     console.error('Error updating quota:', error);
  //   }
  // };

  const calculateQuota = async () => {
    try {
      const responseStu = await fetch(`http://localhost:4000/profile/student/getFullProfile?studentID=${user.uid}`)
      const responseApp = await fetch(`http://localhost:4000/action/student/getApplications?studentID=${user.uid}`)
      const dataStu = await responseStu.json();
      const dataApp = await responseApp.json();
      if (!responseStu.ok || !responseApp.ok) {
        throw new Error;
      }
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

  useEffect(() => {
    fetchQuota(user);
    calculateQuota();
  }, [user])

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
        {selectedJob && (
          <JobDetails
            calculateQuota={calculateQuota}
            sharedQuota={quota}
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