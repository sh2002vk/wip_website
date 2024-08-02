'use client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {faPencilAlt, faTimes, faCheck, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import CollapsibleCard from './cards/collapsableCard';
import "./style.css"
import { app } from '@/firebase';

export default function JobDetails({ user, applicationData, onClose, onJobDelete }) {
  const [job, setJob] = useState(null);
  const [application, setApplication] = useState(null);
  const [isEligible, setIsEligible] = useState(false); // New state for eligibility
  const [quota, setQuota] = useState(0);


    const [requiredDocuments, setRequiredDocuments] = useState({
    resume: false,
    coverLetter: false,
    videoApplication: false,
    cognitiveTest: false,
    englishSample: false,
    onlineAssessment: false
  });

  console.log('application data is: ', applicationData);

  const fetchJob = async (jobID) => {
    if (!jobID) return;

    try {
      console.log('executing fetchJob');
      const jobResponse = await fetch(`http://localhost:4000/profile/job/getJob?jobID=${jobID}`);
      const jobData = await jobResponse.json();
      if (!jobData) {
        console.log("No job found");
        throw new Error("Job not found");
      }
      setJob(jobData);
      setRequiredDocuments({
        resume: jobData.RequiredDocuments.Resume,
        coverLetter: jobData.RequiredDocuments.CoverLetter,
        videoApplication: jobData.RequiredDocuments.VideoApplication,
        cognitiveTest: jobData.RequiredDocuments.CognitiveTest,
        englishSample: jobData.RequiredDocuments.EnglishSample,
        onlineAssessment: jobData.RequiredDocuments.OnlineAssessment
      });
    } catch (error) {
      console.log("encountered error with job: ", error);
    }
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

  const fetchApplication = async (applicationID) => {
    if (!applicationID) return;

    try {
      console.log("EXECUTING fetchApplication");
      const applicationResponse = await fetch(`http://localhost:4000/profile/application/getApplication?applicationID=${applicationID}`);
      const applicationData = await applicationResponse.json();
      if (!applicationData) {
        console.log("No application found");
        throw new Error("Application not found");
      }
      setApplication(applicationData);
    } catch (error) {
      console.log("encountered error with application: ", error);
    }
  };

    const increaseQuota = async (condition) => {
        try {
            await fetchQuota(user);
            const newQuota = quota + (condition ? 1 : -1);

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
            console.log('Quota updated successfully:', data);

            return data;
        } catch (error) {
            console.error('Error updating quota:', error);
        }
    };

  const checkEligibility = async (applicationID, jobID) => {
    try {
      const response = await fetch(`http://localhost:4000/action/student/checkEligibility?ApplicationID=${applicationID}&JobID=${jobID}`);
      const data = await response.json();
      console.log('application isEligible?: ', data.isEligible);
      setIsEligible(data.isEligible); // Assuming the API returns { isEligible: boolean }
    } catch (error) {
      console.error('Error checking eligibility:', error);
    }
  };

  useEffect(() => {
    if (applicationData) {
      fetchApplication(applicationData.applicationID);
      fetchJob(applicationData.jobID);
    }
  }, [applicationData]);

  useEffect(() => {
    if (applicationData) {
      checkEligibility(applicationData.applicationID, applicationData.jobID);
    }
  }, [applicationData]);

  useEffect(() => {
      console.log("Fetching quota");
      fetchQuota(user);
  }, [user])

  if (!job) {
    return <div>Loading...</div>;
  }

  const handleFileUpload = async (event, documentType) => {
    console.log('UPLOADING FILE ENDPOINT');
    const file = event.target.files[0];
    console.log("Uploaded file:", file);
    console.log(documentType);
    const fileName = `${application.StudentID}_${application.JobID}_${documentType}`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('documentType', documentType);
    formData.append('documentName', fileName);

    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    try {
        const response = await fetch('http://localhost:4000/action/files/uploadFiles', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('File upload failed');
        }

        const data = await response.json();
        console.log('File uploaded successfully:', data);

        // Update the application state locally
        setApplication((prev) => ({
            ...prev,
            SubmittedDocuments: {
                ...prev.SubmittedDocuments,
                [documentType]: data.filePath // Adjust according to your response structure
            }
        }));

        // Prepare the data for updating the application in the database
        const updatedData = {
            SubmittedDocuments: {
                ...application.SubmittedDocuments,
                [documentType]: data.filePath
            }
        };

        console.log('updated data is: ', updatedData)

        // Make an API call to update the application in the database
        const updateResponse = await fetch('http://localhost:4000/action/student/updateApplication', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ApplicationID: application.ApplicationID,
                updatedData
            })
        });

        if (!updateResponse.ok) {
            throw new Error('Application update failed');
        }

        const updateResult = await updateResponse.json();
        console.log('Application updated successfully:', updateResult);

        // Recheck eligibility after file upload
        checkEligibility(application.ApplicationID, application.JobID);

    } catch (error) {
        console.error('Error uploading file:', error);
    }
};


  console.log('application from application data is: ', application.Status);

  const handleButtonClick = () => {
    if (application.Status === 'APPLIED') {
      // onJobDelete(application); 
      withdrawApplication(application);
      increaseQuota(true);
    } else if (application.Status === 'DRAFT' && isEligible) {
      if (quota > 0) {
          submitApplication(application);
          increaseQuota(false);
      } else {
        alert("No Application Quota Remaining");
      }
    } else {
      console.log(`Current status is: ${application.Status}`);
    }
  };

  const withdrawApplication = async (application) => {
    try {
      console.log("Withdrawing application:", application);
  
      const updatedData = {
        Status: 'DRAFT'
      };
  
      const response = await fetch('http://localhost:4000/action/student/updateApplication', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ApplicationID: application.ApplicationID,
          updatedData
        })
      });
  
      if (!response.ok) {
        throw new Error('Application withdrawal failed');
      }
  
      const updateResult = await response.json();
      console.log('Application withdrawn successfully:', updateResult);
  
      // Update the local application state
      setApplication((prev) => ({
        ...prev,
        Status: 'DRAFT'
      }));
  
    } catch (error) {
      console.error('Error withdrawing application:', error);
    }
  };

  const submitApplication = async (application) => {
    try {
      console.log("Submitting application:", application);
  
      const updatedData = {
        Status: 'APPLIED'
      };
  
      const response = await fetch('http://localhost:4000/action/student/updateApplication', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ApplicationID: application.ApplicationID,
          updatedData
        })
      });
  
      if (!response.ok) {
        throw new Error('Application submission failed');
      }
  
      const updateResult = await response.json();
      console.log('Application submitted successfully:', updateResult);
  
      // Update the local application state
      setApplication((prev) => ({
        ...prev,
        Status: 'APPLIED'
      }));
  
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };
  

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div key={job.JobID} className="p-4 bg-white overflow-y-auto no-scrollbar">
      <div className="border-b border-gray-300 mb-4">
        <div className="flex justify-between mt-4">
          <h2 className="text-xl font-bold mb-2">{job.Role}</h2>
          <button onClick={onClose} className="bg-transparent font-bold text-black hover:text-gray-600">
           <FontAwesomeIcon icon={faTimes} size="2x"/>
         </button>
        </div>
        <div className="mt-2 mb-4 flex justify-between">
          <div>
            <p className="text-lg font-bold">{applicationData.CompanyName}</p>
            <p className="text-lg">{job.Location}</p>
          </div>
          <button
            onClick={handleButtonClick}
            className={`text-white text-sm px-3 rounded min-h-[57px] ${
              isEligible ? 'bg-orange-400 hover:bg-orange-500' : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={!isEligible}
          >
            <span className="block">
              {application.Status === 'APPLIED' ? 'WITHDRAW APPLICATION' :
               application.Status === 'DRAFT' ? 'SUBMIT APPLICATION' :
               application.Status}
            </span>
          </button>
        </div>
      </div>

      <div className="border-b border-gray-300 mb-4">
        <CollapsibleCard
          title="Job Details"
          sections={[
            {
              title: "Job Type",
              selectedOption: job.Type,
            },
            {
              title: "Duration",
              selectedOption: job.Duration,
            },
            {
              title: "Start Term",
              selectedOption: job.Terms,
            },
            {
              title: "Work Mode",
              selectedOption: job.Environment,
            },
            {
              title: "Industry",
              selectedOption: job.Industry,
            },
          ]}
        />
        <CollapsibleCard
          title="Job Description"
          content={job.JobDescription}
        />
        <CollapsibleCard
          title="Job Qualifications"
          content={job.jobQualification}
        />
      </div>

      <div className="">
        <div className='flex justify-start'>
          <h2 className="text-xl text-orange-500 font-bold mb-2">Application Status</h2>
          <p className="text-lg text-gray-300 ml-3">
            (Last Modified on {formatDate(application.ApplicationTime)})
            {/*Add logic for displaying the last modified*/}
          </p>
        </div>

        {requiredDocuments.resume && (
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-bold">Resume</h2>
            <label className="text-lg italic font-bold cursor-pointer underline">
              <input 
                type="file" 
                className="hidden" 
                onChange={(event) => handleFileUpload(event, 'Resume')} 
                disabled={!(application.Status === "DRAFT")}
              />
              {application.SubmittedDocuments?.Resume == null ? 'Submit' : 'Submitted'}
            </label>
          </div>
        )}  
        {requiredDocuments.coverLetter && (
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-bold">Cover Letter</h2>
            <label className="text-lg italic font-bold cursor-pointer underline">
              <input 
                type="file" 
                className="hidden" 
                onChange={(event) => handleFileUpload(event, 'CoverLetter')} 
                disabled={!(application.Status === "DRAFT")}
              />
              {application.SubmittedDocuments?.CoverLetter == null ? 'Submit' : 'Submitted'}
            </label>
          </div>
        )}
        {requiredDocuments.videoApplication && (
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-bold">Video Application</h2>
            <label className="text-lg italic font-bold cursor-pointer underline">
              <input 
                type="file" 
                className="hidden" 
                onChange={(event) => handleFileUpload(event, 'VideoApplication')} 
                disabled={!(application.Status === "DRAFT")}
              />
              {application.SubmittedDocuments?.VideoApplication == null ? 'Submit' : 'Submitted'}
            </label>
          </div>
        )}
        {requiredDocuments.cognitiveTest && (
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-bold">Cognitive Test</h2>
            <label className="text-lg italic font-bold cursor-pointer underline">
              <input 
                type="file" 
                className="hidden" 
                onChange={(event) => handleFileUpload(event, 'CognitiveTest')} 
                disabled={!(application.Status === "DRAFT")}
              />
              {application.SubmittedDocuments?.CognitiveTest == null ? 'Submit' : 'Submitted'}
            </label>
          </div>
        )}
        {requiredDocuments.englishSample && (
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-bold">English Sample</h2>
            <label className="text-lg italic font-bold cursor-pointer underline">
              <input 
                type="file" 
                className="hidden" 
                onChange={(event) => handleFileUpload(event, 'EnglishSample')} 
                disabled={!(application.Status === "DRAFT")}
              />
              {application.SubmittedDocuments?.EnglishSample == null ? 'Submit' : 'Submitted'}
            </label>
          </div>
        )}
        {requiredDocuments.onlineAssessment && (
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-bold">Online Assessment</h2>
            <label className="text-lg italic font-bold cursor-pointer underline">
              <input 
                type="file" 
                className="hidden" 
                onChange={(event) => handleFileUpload(event, 'OnlineAssessment')}
                disabled={!(application.Status === "DRAFT")}
              />
              {application.SubmittedDocuments?.OnlineAssessment == null ? 'Submit' : 'Submitted'}
            </label>
          </div>
        )}
      </div>
    </div>
  );
};
