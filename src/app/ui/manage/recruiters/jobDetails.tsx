'use client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faPencilAlt, faTimes, faSearch, faCheck } from '@fortawesome/free-solid-svg-icons';
import CollapsibleCard from './cards/collapsableCard';
import JobOptionToggle from './cards/jobOptionToggle';
import "./style.css"

interface JobDetailsProps {
  job: {
    id: string;
    company: string;
    title: string;
    location: string;
    jobDescription: string;
    jobDetail: string;
    jobQualification: string;
    jobBenefits: string;
    type: string;
  };
  onClose: () => void;
  onJobUpdate: (updatedJob: any) => void; // Function to update job details
}

const JobDetails: React.FC<JobDetailsProps> = ({job, onClose, onJobUpdate }) => {
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [isJobDescriptionOpen, setIsJobDescriptionOpen] = useState(false);
  const [isJobQualificationOpen, setIsJobQualificationOpen] = useState(false);
  const [isPencilClicked, setIsPencilClicked] = useState(false);

  const [jobDetailsContent, setJobDetailsContent] = useState(job.jobDetail);
  const [jobDescriptionContent, setJobDescriptionContent] = useState(job.jobDescription);
  const [jobQualificationContent, setJobQualificationContent] = useState(job.jobQualification);

  useEffect(() => {
    setJobDetailsContent(job.jobDetail);
    setJobDescriptionContent(job.jobDescription);
    setJobQualificationContent(job.jobQualification);
  }, [job]);

  const toggleJobDetails = () => setIsJobDetailsOpen(!isJobDetailsOpen);
  const toggleJobDescription = () => setIsJobDescriptionOpen(!isJobDescriptionOpen);
  const toggleJobQualification = () => setIsJobQualificationOpen(!isJobQualificationOpen);
  
  const togglePencil = () => {
    if (isPencilClicked) {
        console.log("Updating");
        onJobUpdate({
            ...job,
            jobDetail: jobDetailsContent,
            jobDescription: jobDescriptionContent,
            jobQualification: jobQualificationContent,
        });
    }
    setIsPencilClicked(!isPencilClicked);
  };

  return (
    <div key={job.id} className="p-4 bg-white overflow-y-auto no-scrollbar">
      <div className="border-b border-gray-300 mb-4">
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-transparent font-bold text-black hover:text-gray-600">
            <FontAwesomeIcon icon={faTimes} size="2x"/>
          </button>
        </div>       
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-2">{job.title}</h2>
          <div className="flex space-x-4">
            <FontAwesomeIcon icon={faCheck} size="lg" />
            <FontAwesomeIcon icon={faPencilAlt} size="lg" onClick={togglePencil} />
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </div>
        </div>
        <div className="mt-2 mb-4">
          <p className="text-lg font-bold">{job.company}</p>
          <p className="text-lg">{job.location}</p>
        </div>
      </div>

      <div className="border-b border-gray-300 mb-4">
        <CollapsibleCard 
          title="Job Details"
          content={jobDetailsContent}
          editable={isPencilClicked}
          onContentChange={setJobDetailsContent}
        />
        <CollapsibleCard 
          title="Job Description"
          content={jobDescriptionContent}
          editable={isPencilClicked}
          onContentChange={setJobDescriptionContent}
        />
        <CollapsibleCard 
          title="Job Qualifications"
          content={jobQualificationContent}
          editable={isPencilClicked}
          onContentChange={setJobQualificationContent}
        />
      </div>

      <div className="">
        <h2 className="text-xl text-orange-500 font-bold mb-2">Optional Components</h2>
        <div className="flex justify-between w-full">
          <h2 className="text-lg font-bold">Cover Letter</h2>
          <JobOptionToggle />
        </div>
        <div className="flex justify-between w-full">
          <h2 className="text-lg font-bold">Video Application</h2>
          <JobOptionToggle />
        </div>
        <div className="flex justify-between w-full">
          <h2 className="text-lg font-bold">Cognitive Test</h2>
          <JobOptionToggle />
        </div>
        <div className="flex justify-between w-full">
          <h2 className="text-lg font-bold">English Sample</h2>
          <JobOptionToggle />
        </div>
        <div className="flex justify-between w-full">
          <h2 className="text-lg font-bold">Online Assessment</h2>
          <JobOptionToggle />
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
