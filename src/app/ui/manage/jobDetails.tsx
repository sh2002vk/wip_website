// JobDetails.tsx
'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //used for the close button on each job posting
import { faPencilAlt, faTimes, faSearch, faCheck } from '@fortawesome/free-solid-svg-icons';
import CollapsibleCard from './collapsableCard';
import JobOptionToggle from './jobOptionToggle';
import "./style.css"


interface JobDetailsProps {
  job: {
    company: string;
    title: string;
    location: string;
    jobDescription: string;
    jobDetail: string;
    jobQualification: string;
    jobBenefits: string;
    type: string;
  };
}

const JobDetails: React.FC<JobDetailsProps> = ({ job }) => {

    const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
    const [isJobDescriptionOpen, setIsJobDescriptionOpen] = useState(false);
    const [isJobQualificationOpen, setIsJobQualificationOpen] = useState(false);
  
    const toggleJobDetails = () => setIsJobDetailsOpen(!isJobDetailsOpen);
    const toggleJobDescription = () => setIsJobDescriptionOpen(!isJobDescriptionOpen);
    const toggleJobQualification = () => setIsJobQualificationOpen(!isJobQualificationOpen);


    return (
        <div className="p-4 bg-white overflow-y-auto no-scrollbar">
            <div className="border-b border-gray-300 mb-4">
                <div className="flex justify-end">
                    {/*TODO: On click handler*/}
                    <button /*onClick={}*/ className="bg-transparent font-bold text-black hover:text-gray-600">
                        <FontAwesomeIcon icon={faTimes} size="2x"/>
                    </button>
                </div>       
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                    <div className="flex space-x-4">
                        <FontAwesomeIcon icon={faCheck} size="lg" />
                        <FontAwesomeIcon icon={faPencilAlt} size="lg" />
                        <FontAwesomeIcon icon={faSearch} size="lg" />
                    </div>
                </div>
                <div className="mt-2 mb-4">
                    <p className="text-lg font-bold">{job.company}</p>
                    <p className="text-lg">{job.location}</p>
                </div>
            </div>

            <div className="border-b border-gray-300 mb-4">
                <CollapsibleCard title="Job Details" content={job.jobDetail} />
                <CollapsibleCard title="Job Description" content={job.jobDescription} />
                <CollapsibleCard title="Job Qualification" content={job.jobQualification} />
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
