'use client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {faPencilAlt, faTimes, faCheck, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import CollapsibleCard from './cards/collapsableCard';
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
    requiredDocuments: {
      coverLetter: boolean,
      videoApplication: boolean,
      cognitiveTest: boolean,
      englishSample: boolean,
      onlineAssessment: boolean
    }
  };
  onClose: () => void;
  onJobDelete: (selectedJob: any) => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose, onJobDelete }) => {
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [isJobDescriptionOpen, setIsJobDescriptionOpen] = useState(false);
  const [isJobQualificationOpen, setIsJobQualificationOpen] = useState(false);

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

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log("Uploaded file:", file);
  };

  return (
    <div key={job.id} className="p-4 bg-white overflow-y-auto no-scrollbar">
      <div className="border-b border-gray-300 mb-4">
        <div className="flex justify-between mt-4">
          <h2 className="text-xl font-bold mb-2">{jobTitle}</h2>
          <button onClick={onClose} className="bg-transparent font-bold text-black hover:text-gray-600">
           <FontAwesomeIcon icon={faTimes} size="2x"/>
         </button>
        </div>
        <div className="mt-2 mb-4 flex justify-between">
          <div>
            <p className="text-lg font-bold">{jobCompany}</p>
            <p className="text-lg">{jobLocation}</p>
          </div>
          <button onClick={onJobDelete} className="bg-orange-400 hover:bg-orange-500 text-white text-sm px-3 rounded min-h-[57px]">
            <span className="block">WITHDRAW</span>
            <span className="block">APPLICATION</span>
          </button>
        </div>
      </div>

      <div className="border-b border-gray-300 mb-4">
        <CollapsibleCard
          title="Job Details"
          sections={[
            {
              title: "Job Type",
              selectedOption: jobDetailsJobType,
            },
            {
              title: "Duration",
              selectedOption: jobDetailsDuration,
            },
            {
              title: "Start Term",
              selectedOption: jobDetailsStartTerm,
            },
            {
              title: "Work Mode",
              selectedOption: jobDetailsWorkMode,
            },
            {
              title: "Industry",
              selectedOption: jobDetailsIndustry,
            },
          ]}
        />
        <CollapsibleCard
          title="Job Description"
          content={jobDescriptionContent}
        />
        <CollapsibleCard
          title="Job Qualifications"
          content={jobQualificationContent}
        />
      </div>

      <div className="">
        <div className='flex justify-start'>
          <h2 className="text-xl text-orange-500 font-bold mb-2">Application Status</h2>
          <p className="text-lg text-gray-300 ml-3">
            (Last Modified on 04, April, 2024)
            {/*Add logic for displaying the last modified*/}
          </p>
        </div>

        {requiredDocuments.coverLetter && (
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-bold">Cover Letter</h2>
            <label className="text-lg italic font-bold cursor-pointer underline">
              <input 
                type="file" 
                className="hidden" 
                onChange={handleFileUpload} 
              />
              Submit
              {/*Add logic here to display Re-Submit, ex: when GET file returns true*/}
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
                onChange={handleFileUpload} 
              />
              Submit
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
                onChange={handleFileUpload} 
              />
              Submit
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
                onChange={handleFileUpload} 
              />
              Submit
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
                onChange={handleFileUpload} 
              />
              Submit
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
