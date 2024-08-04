'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import ToggleSwitch from './cards/toggleSwitch';
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import JobCard from './cards/jobCard';

export default function Bookmarks({ user, onSelectJob}) { 

  const [applicationData, setApplicationData] = useState([]);
  const [quota, setQuota] = useState();
  const [loading, setLoading] = useState(true); // State to manage loading

  const fetchCompanyName = async (companyID) => {
    try {
      const response = await fetch(`http://localhost:4000/profile/company/getFullProfile?companyID=${companyID}`);
      const data = await response.json();
      if (!data) {
        console.log("Error: no company");
        return;
      } else {
        return data.data.Name;
      }
    } catch (error) {
      console.log("Error", error);
      return;
    }
  }
  const fetchJobData = async (jobID, applicationID) => {
    try {
      const response = await fetch(`http://localhost:4000/profile/job/getJob?jobID=${jobID}`);
      const data = await response.json();
      if (!data) {
        console.log("No job found");
        return null;
      } else {
        const companyName = await fetchCompanyName(data.CompanyID);
        return {
          applicationID: applicationID,
          jobID: jobID,
          companyID: data.CompanyID,
          Role: data.Role,
          CompanyName: companyName
        };
      }
    } catch (error) {
      console.log("Error", error);
      return null;
    }
  }

  const fetchApplications = async (user) => {
    if (!user) return;

    try {
      const response = await fetch(`http://localhost:4000/action/student/getApplications?studentID=${user.uid}`);
      const data = await response.json();
      if (!data) {
        console.log("fetch Application failed");
        return;
      } else {
        const dataList = await Promise.all(data.map(application =>
            fetchJobData(application.JobID, application.ApplicationID)
        ));
        setApplicationData(dataList.filter(item => item !== null)); // filter out any null items
      }
    } catch (error) {
      console.log("error getting application", error);
    }
  }

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

  useEffect(() => {
    setLoading(true);
    fetchApplications(user);
    fetchQuota(user);
    setLoading(false);
  }, [user])

  if (loading) {
    return (
        <div className="loading-screen">
          <p>Loading...</p>
        </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full mx-auto bg-white pl-4 py-4 space-y-4 border-r border-black">
      <div className='container mx-auto pr-4'>
        {/* Contains a toggle switch, a list of job postings, and a new post button */}

        <div className="text-xl text-center font-bold my-7">
          Applications   
        </div>
        
        <div className="flex flex-col space-y-2 my-2 h-[75vh] overflow-y-auto no-scrollbar pt-7">
          {
          applicationData.map((application) => (
            <JobCard 
              key={application.id}
              company={application.CompanyName}
              title={application.Role}
              onClick={() => onSelectJob(application)}
              // onRemove={() => handleRemoveBookmark(job.id)}
            />
          ))}
        </div>
        
        <div className="mt-4 flex justify-center">
          <p className="text-center text-md font-semibold">
            You have <span className="text-orange-500">{quota}</span> applications left
            {/*Add logic here to display how many applications are not completed */}
          </p>
        </div>
      </div>
    </div>
  );
}