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

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose, onJobUpdate }) => {
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [isJobDescriptionOpen, setIsJobDescriptionOpen] = useState(false);
  const [isJobQualificationOpen, setIsJobQualificationOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDashboardView, setIsDashboardView] = useState(true);

  const [jobDetailsContent, setJobDetailsContent] = useState(job.jobDetail);
  const [jobDetailsJobType, setJobDetailsJobType] = useState(job.jobDetailJobType);
  const [jobDetailsDuration, setJobDetailsDuration] = useState(job.jobDetailDuration);
  const [jobDetailsStartTerm, setJobDetailsStartTerm] = useState(job.jobDetailStartTerm);
  const [jobDetailsWorkMode, setJobDetailsWorkMode] = useState(job.jobDetailWorkMode);
  const [jobDetailsIndustry, setJobDetailsIndustry] = useState(job.jobDetailIndustry);
  const [jobDescriptionContent, setJobDescriptionContent] = useState(job.jobDescription);
  const [jobQualificationContent, setJobQualificationContent] = useState(job.jobQualification);
  const [jobTitle, setJobTitle] = useState(job.title);
  const [jobCompany, setJobCompany] = useState(job.company);
  const [jobLocation, setJobLocation] = useState(job.location);
  const [requiredDocuments, setRequiredDocuments] = useState({
    coverLetter: job.requiredDocuments.coverLetter,
    videoApplication: job.requiredDocuments.videoApplication,
    cognitiveTest: job.requiredDocuments.cognitiveTest,
    englishSample: job.requiredDocuments.englishSample,
    onlineAssessment: job.requiredDocuments.onlineAssessment,
  });

  useEffect(() => {
    setJobDetailsContent(job.jobDetail);
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
  const toggleEdit = () => {
    if (isEditing) {
      const updatedJob = {
        ...job,
        jobDetail: jobDetailsContent,
        jobDetailsJobType: jobDetailsJobType,
        jobDetailsDuration: jobDetailsDuration,
        jobDetailsStartTerm: jobDetailsStartTerm,
        jobDetailsWorkMode: jobDetailsWorkMode,
        jobDetailsIndustry: jobDetailsIndustry,
        jobDescription: jobDescriptionContent,
        jobQualification: jobQualificationContent,
        title: jobTitle,
        company: jobCompany,
        location: jobLocation,
        requiredDocuments: requiredDocuments
      };

      onJobUpdate(updatedJob);
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
      console.log("Updated job:", job);
    }
  }, [isEditing, job]);

  return (
    <div key={job.id} className="p-4 bg-white overflow-y-auto no-scrollbar">
      <div className="border-b border-gray-300 mb-4">
        {/*<div className="flex justify-end">*/}
        {/*  <button onClick={onClose} className="bg-transparent font-bold text-black hover:text-gray-600">*/}
        {/*    <FontAwesomeIcon icon={faTimes} size="2x"/>*/}
        {/*  </button>*/}
        {/*</div>*/}
        <div className="flex justify-between mt-4">
          {isEditing ? (
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-1/2 p-1 text-xl font-bold mb-2 border text-gray-600 border-gray-300 rounded"
            />
          ) : (
            <h2 className="text-xl font-bold mb-2">{jobTitle}</h2>
          )}
          {isEditing ? (
            <div className="flex space-x-4">
              <span className="text-orange-500 text-xl font-bold">(Editing)</span>
              <FontAwesomeIcon icon={faCheck} size="xl" onClick={toggleEdit}/>
            </div>
          ) : (
            <div className="flex space-x-4">
              {(job.draft || !isDashboardView) ? (
                  <>
                    <FontAwesomeIcon icon={faTrashCan} size="xl"/>
                    <FontAwesomeIcon icon={faPencilAlt} size="xl" onClick={toggleEdit} />
                    {job.draft && <FontAwesomeIcon icon={faCheck} size="xl" />}
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
                value={jobCompany}
                onChange={(e) => setJobCompany(e.target.value)}
                className="w-1/2 p-1 text-lg font-bold mb-2 border text-gray-400 border-gray-300 rounded"
              />
              <input
                type="text"
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
                className="w-1/2 p-1 text-lg mb-2 border text-gray-400 border-gray-300 rounded"
              />
            </>
          ) : (
            <>
              <p className="text-lg font-bold">{jobCompany}</p>
              {job.draft ? (
                  <p className="text-lg">{jobLocation}</p>
              ) : (
                <div className={"flex justify-between"}>
                  <p className="text-lg">{jobLocation}</p>
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

      {!isDashboardView || job.draft ? (
        <>
          <div className="border-b border-gray-300 mb-4">
            <CollapsibleCard
              title="Job Details"
              editable={isEditing}
              sections={[
                {
                  title: "Job Type",
                  options: ["Internship", "Contract", "Other"],
                  selectedOption: jobDetailsJobType,
                  onOptionChange: (newSelectedOptions) => handleOptionChange('Work Type', newSelectedOptions)
                },
                {
                  title: "Duration",
                  options: ["4 months", "8 months", "1+ year"],
                  selectedOption: jobDetailsDuration,
                  onOptionChange: (newSelectedOptions) => handleOptionChange('Duration', newSelectedOptions)
                },
                {
                  title: "Start Term",
                  options: ["Fall 24", "Winter 25", "Spring 25", "Summer 25"],
                  selectedOption: jobDetailsStartTerm,
                  onOptionChange: (newSelectedOptions) => handleOptionChange('Start Term', newSelectedOptions)
                },
                {
                  title: "Work Mode",
                  options: ["In-person", "Hybrid", "Remote"],
                  selectedOption: jobDetailsWorkMode,
                  onOptionChange: (newSelectedOptions) => handleOptionChange('Work Mode', newSelectedOptions)
                },
                {
                  title: "Industry",
                  options: ["Technology", "Business"],
                  selectedOption: jobDetailsIndustry,
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
                    <JobOptionToggle
                        isSelected={requiredDocuments.coverLetter}
                        onToggle={() => handleToggleRequiredDocument("coverLetter")}
                    />
                  </>
              ) : (
                  <>
                    <h2 className={`${requiredDocuments.coverLetter ?
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
                    <JobOptionToggle
                        isSelected={requiredDocuments.videoApplication}
                        onToggle={() => handleToggleRequiredDocument("videoApplication")}
                    />
                  </>
              ) : (
                  <>
                    <h2 className={`${requiredDocuments.videoApplication ?
                        "text-lg font-bold" :
                        "text-gray-300 text-lg font-bold"}`}
                    >Video Application</h2>
                  </>
              )}
            </div>
            <div className="flex justify-between w-full">
              {isEditing ? (
                  <>
                    <h2 className="text-lg font-bold">Cognitive Test</h2>
                    <JobOptionToggle
                        isSelected={requiredDocuments.cognitiveTest}
                        onToggle={() => handleToggleRequiredDocument("cognitiveTest")}
                    />
                  </>
              ) : (
                  <>
                    <h2 className={`${requiredDocuments.cognitiveTest ?
                        "text-lg font-bold" :
                        "text-gray-300 text-lg font-bold"}`}
                    >Cognitive Test</h2>
                  </>
              )}
            </div>
            <div className="flex justify-between w-full">
              {isEditing ? (
                  <>
                    <h2 className="text-lg font-bold">English Sample</h2>
                    <JobOptionToggle
                        isSelected={requiredDocuments.englishSample}
                        onToggle={() => handleToggleRequiredDocument("englishSample")}
                    />
                  </>
              ) : (
                  <>
                    <h2 className={`${requiredDocuments.englishSample ?
                        "text-lg font-bold" :
                        "text-gray-300 text-lg font-bold"}`}
                    >English Sample</h2>
                  </>
              )}
            </div>
            <div className="flex justify-between w-full">
              {isEditing ? (
                  <>
                    <h2 className="text-lg font-bold">Online Assessment</h2>
                    <JobOptionToggle
                        isSelected={requiredDocuments.onlineAssessment}
                        onToggle={() => handleToggleRequiredDocument("onlineAssessment")}
                    />
                  </>
              ) : (
                  <>
                    <h2 className={`${requiredDocuments.onlineAssessment ?
                        "text-lg font-bold" :
                        "text-gray-300 text-lg font-bold"}`}
                    >Online Assessment</h2>
                  </>
              )}
            </div>
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