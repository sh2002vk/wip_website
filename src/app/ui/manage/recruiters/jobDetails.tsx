'use client'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import {faPencilAlt, faTimes, faSearch, faCheck, faTrash, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import CollapsibleCard from './cards/collapsableCard';
import JobOptionToggle from './cards/jobOptionToggle';
import StudentProfileView from "@/app/ui/search/studentProfileView";
import JobDashboard from "@/app/ui/manage/recruiters/jobDashboard";
import "./style.css"
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs, {Dayjs} from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const JobDetails = ({ companyName, job, onClose, onJobUpdate, onGetJobPostings}) => { //onJobUpdate
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [isJobDescriptionOpen, setIsJobDescriptionOpen] = useState(false);
  const [isJobQualificationOpen, setIsJobQualificationOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDashboardView, setIsDashboardView] = useState(true);

  const [jobDetailsJobType, setJobDetailsJobType] = useState(job.Type);
  const [jobDetailsDuration, setJobDetailsDuration] = useState(job.Duration);
  const [jobDetailsTerms, setJobDetailsTerms] = useState(job.Terms);
  const [jobDetailsWorkMode, setJobDetailsWorkMode] = useState(job.Environment);
  const [jobDetailsIndustry, setJobDetailsIndustry] = useState(job.Industry);
  const [dateClosed, setDateClosed] = useState<Dayjs | null>(null);

  const [jobDescriptionContent, setJobDescriptionContent] = useState(job.JobDescription);
  const [jobQualificationContent, setJobQualificationContent] = useState(job.JobQualification);
  const [jobTitle, setJobTitle] = useState(job.Role);
  const [jobCompany, setJobCompany] = useState(companyName);
  const [jobLocation, setJobLocation] = useState(job.Location);
  const [jobStatus, setJobStatus] = useState(job.Status);
  //ADD PAY?
  const [requiredDocuments, setRequiredDocuments] = useState({
    Resume: job.RequiredDocuments?.Resume || false,
    CoverLetter: job.RequiredDocuments?.CoverLetter || false,
    // VideoApplication: job.RequiredDocuments?.videoApplication || false,
    EnglishSample: job.RequiredDocuments?.EnglishSample || false,
  });

  useEffect(() => {
    updateJobDetails();
  }, [job]);

  const updateJobDetails = () => {
    setJobTitle(job.Role);
    setJobLocation(job.Location);
    setJobDetailsJobType(job.Type);
    setJobDetailsDuration(job.Duration);
    setJobDetailsTerms(job.Terms);
    setJobDetailsWorkMode(job.Environment);
    setJobDetailsIndustry(job.Industry);
    setDateClosed(dayjs(job.DateClosed));
    setJobDescriptionContent(job.JobDescription);
    setJobQualificationContent(job.JobQualification);
    setJobCompany(companyName);
    setRequiredDocuments({
      Resume: job.RequiredDocuments?.Resume || false,
      CoverLetter: job.RequiredDocuments?.CoverLetter || false,
      EnglishSample: job.RequiredDocuments?.EnglishSample || false,
    });
  }

  const handleOptionChange = (sectionName: string, newSelectedOptions: string | string[])  => {
    if (sectionName === 'Work Type') {
      setJobDetailsJobType(newSelectedOptions);
    }
    if (sectionName === 'Duration') {
      setJobDetailsDuration(newSelectedOptions);
    }
    if (sectionName === 'Terms') {
      setJobDetailsTerms(newSelectedOptions);
    }
    if (sectionName === 'Work Mode') {
      setJobDetailsWorkMode(newSelectedOptions);
    }
    if (sectionName === 'Industry') {
      setJobDetailsIndustry(newSelectedOptions);
    }
  };
  const toggleEdit = async () => {
    if (isEditing) {
      await handleUpdate();
      setIsEditing(!isEditing);
    } else {
      setIsEditing(!isEditing);
    }
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
    console.log("title being used to update is:" + jobTitle);
    const updateData = {
      Type: jobDetailsJobType,
      Role: jobTitle,
      Location: jobLocation,
      // Pay: 0, CHANGE LATER IF NEEDED
      DateClosed: dayjs(dateClosed).toISOString(),
      Environment: jobDetailsWorkMode,
      Duration: jobDetailsDuration,
      Terms: jobDetailsTerms,
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
      if (!response.ok) {
        console.log("error updating");
      } else {
        const updatedJob = await response.json();
        onJobUpdate(updatedJob); // Pass updated job back to parent
        console.log("successfully updated: ", updatedJob);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCompleteJob = async () => {
    try {
      const response = await fetch(`http://localhost:4000/action/recruiter/updateJobPosting`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobID: job.JobID,
          updatedData: {
            Status: "COMPLETED"
          }
        })
      })

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div key={job.JobID} className="p-4 bg-white overflow-y-auto no-scrollbar">
        <div className="border-b border-gray-300 mb-4">
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
                {(job.Status === "DRAFT" || !isDashboardView) ? (
                    <>
                      <FontAwesomeIcon icon={faTrashCan} size="xl" onClick={handleDelete}/>
                      <FontAwesomeIcon icon={faPencilAlt} size="xl" onClick={toggleEdit} />
                      {job.Status == "DRAFT" && <FontAwesomeIcon icon={faCheck} size="xl" onClick={handleCompleteJob}/>}
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
                  value={companyName}
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
                <p className="text-lg font-bold">{companyName}</p>
                {job.Status == "DRAFT" ? (
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
                    selectedOptions: jobDetailsJobType,
                    onOptionChange: (newSelectedOptions) => handleOptionChange('Work Type', newSelectedOptions)
                  },
                  {
                    title: "Duration",
                    options: ["4 months", "8 months", "12 months"],
                    selectedOptions: jobDetailsDuration,
                    onOptionChange: (newSelectedOptions) => handleOptionChange('Duration', newSelectedOptions)
                  },
                  {
                    title: "Terms",
                    options: ["F24", "W25", "S25"],
                    selectedOptions: jobDetailsTerms,
                    onOptionChange: (newSelectedOptions) => handleOptionChange('Terms', newSelectedOptions),
                    multiple: true // Indicate this section allows multiple selections
                  },
                  {
                    title: "Work Mode",
                    options: ["In-person", "Hybrid", "Remote"],
                    selectedOptions: jobDetailsWorkMode,
                    onOptionChange: (newSelectedOptions) => handleOptionChange('Work Mode', newSelectedOptions)
                  },
                  {
                    title: "Industry",
                    options: ["Technology", "Business"],
                    selectedOptions: jobDetailsIndustry,
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
              {isEditing ? (
                  <DatePicker
                      label="End date"
                      value={dateClosed}
                      onChange={(newDate) => setDateClosed(newDate)}
                      className="w-52"
                      sx={{ mt: 2, mb: 2 }}
                      views={["day", "month", "year"]}
                      format="DD MMMM, YYYY"
                  />
              ) : (
                  <div className="mt-4">
                    {dayjs(dateClosed).isValid() && <span className="mt-4">Job Deadline: {dayjs(dateClosed).format('MMMM DD, YYYY')}</span>}
                  </div>
              )}
            </div>

            {/*We need to include states for these components, and have indicators for when they are active*/}
            <div className="">
              <h2 className="text-xl text-orange-500 font-bold mb-2">Optional Components</h2>
              <div className="flex justify-between w-full">
                {isEditing ? (
                    <>
                      <h2 className="text-lg font-bold">Resume</h2>
                      <JobOptionToggle
                          isSelected={requiredDocuments?.Resume}
                          onToggle={() => handleToggleRequiredDocument("Resume")}
                      />
                    </>
                ) : (
                    <>
                      <h2 className={`${requiredDocuments?.Resume ?? false ?
                          "text-lg font-bold" :
                          "text-gray-300 text-lg font-bold"}`}
                      >Resume</h2>
                    </>
                )}
              </div>
              <div className="flex justify-between w-full">
                {isEditing ? (
                    <>
                      <h2 className="text-lg font-bold">Cover Letter</h2>
                      <JobOptionToggle
                          isSelected={requiredDocuments?.CoverLetter}
                          onToggle={() => handleToggleRequiredDocument("CoverLetter")}
                      />
                    </>
                ) : (
                    <>
                      <h2 className={`${requiredDocuments?.CoverLetter ?? false ?
                          "text-lg font-bold" :
                          "text-gray-300 text-lg font-bold"}`}
                      >Cover Letter</h2>
                    </>
                  )}
              </div>
              {/*<div className="flex justify-between w-full">*/}
              {/*  {isEditing ? (*/}
              {/*      <>*/}
              {/*        <h2 className="text-lg font-bold">Video Application</h2>*/}
                      {/*<JobOptionToggle*/}
                      {/*    isSelected={job.RequiredDocuments.videoApplication}*/}
                      {/*    onToggle={() => handleToggleRequiredDocument("videoApplication")}*/}
                      {/*/>*/}
              {/*      </>*/}
              {/*  ) : (*/}
              {/*      <>*/}
              {/*        <h2 className={`${job.RequiredDocuments?.videoApplication ?? false ?*/}
              {/*            "text-lg font-bold" :*/}
              {/*            "text-gray-300 text-lg font-bold"}`}*/}
              {/*        >Video Application</h2>*/}
              {/*      </>*/}
              {/*  )}*/}
              {/*</div>*/}
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
                      <JobOptionToggle
                          isSelected={requiredDocuments?.EnglishSample}
                          onToggle={() => handleToggleRequiredDocument("EnglishSample")}
                      />
                    </>
                ) : (
                    <>
                      <h2 className={`${requiredDocuments?.EnglishSample ?? false ?
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
            <JobDashboard
              jobID={job.JobID}
            />
          </>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default JobDetails;