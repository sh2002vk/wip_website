'use client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {faPencilAlt, faTimes, faSearch, faCheck, faTrash, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import CollapsibleCard from './cards/collapsableCard';
import JobOptionToggle from './cards/jobOptionToggle';
import StudentProfileView from "@/app/ui/search/studentProfileView";
import JobDashboard from "@/app/ui/manage/recruiters/jobDashboard";
import "./style.css"

interface JobDetailsProps {
  job: {
    id: string;
    company: string;
    title: string;
    location: string;
    jobDescription: string;
    jobDetail: string;
    jobDetailJobType: string;
    jobDetailDuration: string;
    jobDetailStartTerm: string;
    jobDetailWorkMode: string;
    jobDetailIndustry: string;
    jobQualification: string;
    jobBenefits: string;
    type: string;
    draft: boolean;
    requiredDocuments: {
      coverLetter: boolean,
      videoApplication: boolean,
      cognitiveTest: boolean,
      englishSample: boolean,
      onlineAssessment: boolean
    }
  };
  onClose: () => void;
  onJobUpdate: (updatedJob: any) => void; // Function to update job details
}

const JobDetails = ({ job, onClose, onGetJobPostings}) => { //onJobUpdate
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [isJobDescriptionOpen, setIsJobDescriptionOpen] = useState(false);
  const [isJobQualificationOpen, setIsJobQualificationOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDashboardView, setIsDashboardView] = useState(true);

  const [jobDetailsJobType, setJobDetailsJobType] = useState(job.Type);
  const [jobDetailsDuration, setJobDetailsDuration] = useState(job.Duration);
  const [jobDetailsStartTerm, setJobDetailsStartTerm] = useState(job.StartTime);
  const [jobDetailsWorkMode, setJobDetailsWorkMode] = useState(job.Environment);
  const [jobDetailsIndustry, setJobDetailsIndustry] = useState(job.Industry);
  const [jobDescriptionContent, setJobDescriptionContent] = useState(job.JobDescription);
  const [jobQualificationContent, setJobQualificationContent] = useState(job.JobQualification);
  const [jobTitle, setJobTitle] = useState(job.Role);
  const [jobCompany, setJobCompany] = useState(job.companyModel.Name);
  const [jobLocation, setJobLocation] = useState(job.Location);
  const [jobStatus, setJobStatus] = useState(job.Status);
  //ADD PAY?
  const [requiredDocuments, setRequiredDocuments] = useState({
    Resume: job.RequiredDocuments?.resume || false,
    CoverLetter: job.RequiredDocuments?.coverLetter || false,
    // VideoApplication: job.RequiredDocuments?.videoApplication || false,
    EnglishSample: job.RequiredDocuments?.englishSample || false,
  });

  useEffect(() => {
    setJobDetailsJobType(job.jobDetailJobType)
    setJobDetailsDuration(job.jobDetailDuration)
    setJobDetailsStartTerm(job.jobDetailStartTerm)
    setJobDetailsWorkMode(job.jobDetailWorkMode)
    setJobDetailsIndustry(job.jobDetailIndustry)
    setJobDescriptionContent(job.jobDescription);
    setJobQualificationContent(job.jobQualification);
    setJobTitle(job.title);
    setJobCompany(job.company);
    setJobLocation(job.location);
    setRequiredDocuments(job.requiredDocuments)
  }, [job]);

  const toggleJobDetails = () => setIsJobDetailsOpen(!isJobDetailsOpen);
  const toggleJobDescription = () => setIsJobDescriptionOpen(!isJobDescriptionOpen);
  const toggleJobQualification = () => setIsJobQualificationOpen(!isJobQualificationOpen);

  const handleOptionChange = (sectionName: string, newSelectedOptions: string) => {
    if (sectionName === 'Work Type') {
      setJobDetailsJobType(newSelectedOptions);
    }
    if (sectionName === 'Duration') {
      setJobDetailsDuration(newSelectedOptions);
    }
    if (sectionName === 'Start Term') {
      setJobDetailsStartTerm(newSelectedOptions);
    }
    if (sectionName === 'Work Mode') {
      setJobDetailsWorkMode(newSelectedOptions);
    }
    if (sectionName === 'Industry') {
      setJobDetailsIndustry(newSelectedOptions);
    }
    // Add more conditions if you have more sections
  };
  const toggleEdit = async () => {
    if (isEditing) {
      // const updatedJob = {
      //   ...job,
      //   jobDetailsJobType: jobDetailsJobType,
      //   jobDetailsDuration: jobDetailsDuration,
      //   jobDetailsStartTerm: jobDetailsStartTerm,
      //   jobDetailsWorkMode: jobDetailsWorkMode,
      //   jobDetailsIndustry: jobDetailsIndustry,
      //   jobDescription: jobDescriptionContent,
      //   jobQualification: jobQualificationContent,
      //   title: jobTitle,
      //   company: jobCompany,
      //   location: jobLocation,
      //   requiredDocuments: requiredDocuments
      // };
      await handleUpdate();
      await onGetJobPostings();

      // onJobUpdate(updatedJob);
      console.log("Updating");
    }
    setIsEditing(!isEditing);
  };

  const handleToggleRequiredDocument = (doc: keyof typeof requiredDocuments) => {
    setRequiredDocuments((prev) => ({
      ...prev,
      [doc]: !prev[doc]
    }));
  };

  const toggleView = () => {
    setIsDashboardView(!isDashboardView);
  }

  useEffect(() => {
    if (!isEditing) {
      console.log("Showing:", job);
    }
  }, [isEditing, job]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/action/recruiter/deleteJobPosting`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobID: job.JobID
        })
      })
      if (!response.ok) {
        console.log("ERROR")
      }
      const data = await response.json();
      console.log("successfully deleted:", data)
      onClose();
    } catch (error) {
      console.log("ERROR");
    }
  }

  const handleUpdate = async () => {
    const updateData = {
      Type: jobDetailsJobType,
      Role: jobTitle,
      Location: jobLocation,
      // Pay: 0, CHANGE LATER IF NEEDED
      Environment: jobDetailsWorkMode,
      Duration: jobDetailsDuration,
      StartTime: jobDetailsStartTerm,
      // EndTime:
      Industry: jobDetailsIndustry,
      JobDescription: jobDescriptionContent,
      JobQualification: jobQualificationContent,
      Status: jobStatus,
      RequiredDocuments: {
        Resume: requiredDocuments?.Resume || false,
        CoverLetter: requiredDocuments?.CoverLetter || false,
        EnglishSample: requiredDocuments?.EnglishSample || false,
      },
    }
    try {
      const response = await fetch(`http://localhost:4000/action/recruiter/updateJobPosting`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobID: job.JobID,
          updatedData: updateData
        })
      })
      console.log(job.JobID)
      if (!response.ok) {
        console.log("error updating");
      } else {
        console.log("successfully updated: ", response)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div key={job.JobID} className="p-4 bg-white overflow-y-auto no-scrollbar">
      <div className="border-b border-gray-300 mb-4">
        <>{job.JobID}</>
        <div className="flex justify-between mt-4">
          {isEditing ? (
            <input
              type="text"
              value={job.Role}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-1/2 p-1 text-xl font-bold mb-2 border text-gray-600 border-gray-300 rounded"
            />
          ) : (
            <h2 className="text-xl font-bold mb-2">{job.Role}</h2>
          )}
          {isEditing ? (
            <div className="flex space-x-4">
              <span className="text-orange-500 text-xl font-bold">(Editing)</span>
              <FontAwesomeIcon icon={faCheck} size="xl" onClick={toggleEdit}/>
            </div>
          ) : (
            <div className="flex space-x-4">
              {(job.Status === "DRAFT" || !isDashboardView) ? (
                  <>
                    <FontAwesomeIcon icon={faTrashCan} size="xl" onClick={handleDelete}/>
                    <FontAwesomeIcon icon={faPencilAlt} size="xl" onClick={toggleEdit} />
                    {job.Status == "DRAFT" && <FontAwesomeIcon icon={faCheck} size="xl" />}
                  </>
                  ) : (<></>)}
            </div>
          )}
        </div>
        <div className="mt-2 mb-4">
          {isEditing ? (
            <>
              <input
                type="text"
                value={job.companyModel.Name}
                onChange={(e) => setJobCompany(e.target.value)}
                className="w-1/2 p-1 text-lg font-bold mb-2 border text-gray-400 border-gray-300 rounded"
              />
              <input
                type="text"
                value={job.Location}
                onChange={(e) => setJobLocation(e.target.value)}
                className="w-1/2 p-1 text-lg mb-2 border text-gray-400 border-gray-300 rounded"
              />
            </>
          ) : (
            <>
              <p className="text-lg font-bold">{job.companyModel.Name}</p>
              {job.Status == "DRAFT" ? (
                  <p className="text-lg">{job.Location}</p>
              ) : (
                <div className={"flex justify-between"}>
                  <p className="text-lg">{job.Location}</p>
                  {isDashboardView ? (
                      <p
                        className="text-lg text-orange-500 underline cursor-pointer"
                        onClick={toggleView}
                      >
                         Switch to job details
                      </p>
                      ) : (
                      <p
                       className="text-lg text-orange-500 underline cursor-pointer"
                       onClick={toggleView}
                       >
                         Switch to job dashboard
                       </p>
                      )}
                </div>
             )}
            </>
          )}
        </div>
      </div>

      {!isDashboardView || job.Status === "DRAFT" ? (
        <>
          <div className="border-b border-gray-300 mb-4">
            <CollapsibleCard
              title="Job Details"
              editable={isEditing}
              sections={[
                {
                  title: "Job Type",
                  options: ["Internship", "Contract", "Other"],
                  selectedOption: job.Type,
                  onOptionChange: (newSelectedOptions) => handleOptionChange('Work Type', newSelectedOptions)
                },
                {
                  title: "Duration",
                  options: ["4 months", "8 months", "1+ year"],
                  selectedOption: job.Duration,
                  onOptionChange: (newSelectedOptions) => handleOptionChange('Duration', newSelectedOptions)
                },
                {
                  title: "Start Term",
                  options: ["Fall 24", "Winter 25", "Spring 25", "Summer 25"],
                  selectedOption: job.StartTime,
                  onOptionChange: (newSelectedOptions) => handleOptionChange('Start Term', newSelectedOptions)
                },
                {
                  title: "Work Mode",
                  options: ["In-person", "Hybrid", "Remote"],
                  selectedOption: job.Environment,
                  onOptionChange: (newSelectedOptions) => handleOptionChange('Work Mode', newSelectedOptions)
                },
                {
                  title: "Industry",
                  options: ["Technology", "Business"],
                  selectedOption: job.Industry,
                  onOptionChange: (newSelectedOptions) => handleOptionChange('Industry', newSelectedOptions)
                },
              ]}
            />
            <CollapsibleCard
              title="Job Description"
              content={jobDescriptionContent}
              editable={isEditing}
              onContentChange={setJobDescriptionContent}
            />
            <CollapsibleCard
              title="Job Qualifications"
              content={jobQualificationContent}
              editable={isEditing}
              onContentChange={setJobQualificationContent}
            />
          </div>

          {/*We need to include states for these components, and have indicators for when they are active*/}
          <div className="">
            <h2 className="text-xl text-orange-500 font-bold mb-2">Optional Components</h2>
            <div className="flex justify-between w-full">
              {isEditing ? (
                  <>
                    <h2 className="text-lg font-bold">Cover Letter</h2>
                    {/*<JobOptionToggle*/}
                    {/*    isSelected={job.RequiredDocuments.coverLetter}*/}
                    {/*    onToggle={() => handleToggleRequiredDocument("coverLetter")}*/}
                    {/*/>*/}
                  </>
              ) : (
                  <>
                    <h2 className={`${job.RequiredDocuments?.coverLetter ?? false ?
                        "text-lg font-bold" :
                        "text-gray-300 text-lg font-bold"}`}
                    >Cover Letter</h2>
                  </>
                )}
            </div>
            <div className="flex justify-between w-full">
              {isEditing ? (
                  <>
                    <h2 className="text-lg font-bold">Video Application</h2>
                    {/*<JobOptionToggle*/}
                    {/*    isSelected={job.RequiredDocuments.videoApplication}*/}
                    {/*    onToggle={() => handleToggleRequiredDocument("videoApplication")}*/}
                    {/*/>*/}
                  </>
              ) : (
                  <>
                    <h2 className={`${job.RequiredDocuments?.videoApplication ?? false ?
                        "text-lg font-bold" :
                        "text-gray-300 text-lg font-bold"}`}
                    >Video Application</h2>
                  </>
              )}
            </div>
            {/*<div className="flex justify-between w-full">*/}
            {/*  {isEditing ? (*/}
            {/*      <>*/}
            {/*        <h2 className="text-lg font-bold">Cognitive Test</h2>*/}
            {/*        <JobOptionToggle*/}
            {/*            isSelected={requiredDocuments.cognitiveTest}*/}
            {/*            onToggle={() => handleToggleRequiredDocument("cognitiveTest")}*/}
            {/*        />*/}
            {/*      </>*/}
            {/*  ) : (*/}
            {/*      <>*/}
            {/*        <h2 className={`${requiredDocuments.cognitiveTest ?*/}
            {/*            "text-lg font-bold" :*/}
            {/*            "text-gray-300 text-lg font-bold"}`}*/}
            {/*        >Cognitive Test</h2>*/}
            {/*      </>*/}
            {/*  )}*/}
            {/*</div>*/}
            <div className="flex justify-between w-full">
              {isEditing ? (
                  <>
                    <h2 className="text-lg font-bold">English Sample</h2>
                    {/*<JobOptionToggle*/}
                    {/*    isSelected={job.RequiredDocuments.englishSample}*/}
                    {/*    onToggle={() => handleToggleRequiredDocument("englishSample")}*/}
                    {/*/>*/}
                  </>
              ) : (
                  <>
                    <h2 className={`${job.RequiredDocuments?.englishSample ?? false ?
                        "text-lg font-bold" :
                        "text-gray-300 text-lg font-bold"}`}
                    >English Sample</h2>
                  </>
              )}
            </div>
            {/*<div className="flex justify-between w-full">*/}
            {/*  {isEditing ? (*/}
            {/*      <>*/}
            {/*        <h2 className="text-lg font-bold">Online Assessment</h2>*/}
            {/*        <JobOptionToggle*/}
            {/*            isSelected={requiredDocuments.onlineAssessment}*/}
            {/*            onToggle={() => handleToggleRequiredDocument("onlineAssessment")}*/}
            {/*        />*/}
            {/*      </>*/}
            {/*  ) : (*/}
            {/*      <>*/}
            {/*        <h2 className={`${requiredDocuments.onlineAssessment ?*/}
            {/*            "text-lg font-bold" :*/}
            {/*            "text-gray-300 text-lg font-bold"}`}*/}
            {/*        >Online Assessment</h2>*/}
            {/*      </>*/}
            {/*  )}*/}
            {/*</div>*/}
          </div>
        </>
      ):(
        <>
          <JobDashboard />
        </>
      )}
    </div>
  );
};

export default JobDetails;