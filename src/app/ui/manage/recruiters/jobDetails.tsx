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

const API_URL = process.env.API_URL

const JobDetails = ({ companyName, job, onClose, onJobUpdate, onGetJobPostings}) => { //onJobUpdate
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [isJobDescriptionOpen, setIsJobDescriptionOpen] = useState(false);
  const [isJobQualificationOpen, setIsJobQualificationOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDashboardView, setIsDashboardView] = useState(true);

  const [jobDetailsJobType, setJobDetailsJobType] = useState(job.Type);
  const [jobDetailsDuration, setJobDetailsDuration] = useState(job.Duration);
  const [jobDetailsTerms, setJobDetailsTerms] = useState([]);
  const [jobDetailsWorkMode, setJobDetailsWorkMode] = useState(job.Environment);
  const [jobDetailsIndustry, setJobDetailsIndustry] = useState(job.Industry);
  const [dateClosed, setDateClosed] = useState<Dayjs | null>(null);

  const [jobDescriptionContent, setJobDescriptionContent] = useState(job.JobDescription);
  const [jobQualificationContent, setJobQualificationContent] = useState(job.JobQualification);
  const [jobTitle, setJobTitle] = useState(job.Role);
  const [jobCompany, setJobCompany] = useState(companyName);
  const [jobLocation, setJobLocation] = useState(job.Location);
  const [jobStatus, setJobStatus] = useState(job.Status);

  const [requiredDocuments, setRequiredDocuments] = useState({
    Resume: job.RequiredDocuments?.Resume || false,
    CoverLetter: job.RequiredDocuments?.CoverLetter || false,
    EnglishSample: job.RequiredDocuments?.EnglishSample || false,
  });

  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation popup

  const optionMapping: { [key: string]: string } = {
    "Internship": "INTERNSHIP",
    "Contract": "CONTRACT",
    "Other": "OTHER",
    "4 months": "4",
    "8 months": "8",
    "12 months": "12",
    "In-person": "INPERSON",
    "Hybrid": "HYBRID",
    "Remote": "REMOTE",
    "Technology": "TECHNOLOGY",
    "Business": "BUSINESS",
  };

  const reverseOptionMapping = Object.fromEntries(
    Object.entries(optionMapping).map(([key, value]) => [value, key])
  );

  useEffect(() => {
    updateJobDetails();
  }, [job]);

  useEffect(() => {
    if (job && Array.isArray(job.Terms)) {
      setJobDetailsTerms(job.Terms);
    }
  }, [job]);

  const updateJobDetails = () => {
    setJobTitle(job.Role);
    setJobLocation(job.Location);
    setJobDetailsJobType(job.Type);
    setJobDetailsDuration(job.Duration);
    setJobDetailsTerms(Array.isArray(job.Terms) ? job.Terms : []);
    setJobDetailsWorkMode(job.Environment);
    setJobDetailsIndustry(job.Industry);
    setDateClosed(job.DateClosed ? dayjs(job.DateClosed) : null);
    setJobDescriptionContent(job.JobDescription);
    setJobQualificationContent(job.JobQualification);
    setJobCompany(companyName);
    setRequiredDocuments({
      Resume: job.RequiredDocuments?.Resume || false,
      CoverLetter: job.RequiredDocuments?.CoverLetter || false,
      EnglishSample: job.RequiredDocuments?.EnglishSample || false,
    });
  }

  const handleOptionChange = (
    sectionName: string,
    newSelectedOptions: string | string[]
  ) => {
    // Convert newSelectedOptions to a string for single-option selections
    const selectedOption = Array.isArray(newSelectedOptions)
      ? newSelectedOptions[0] // Choose the first option or handle accordingly
      : newSelectedOptions;
  
    // Map the selected option to its corresponding mapped value
    const mappedOption = optionMapping[selectedOption];
  
    switch (sectionName) {
      case "Work Type":
        setJobDetailsJobType(mappedOption);
        break;
      case "Duration":
        setJobDetailsDuration(mappedOption);
        break;
      case "Terms":
        setJobDetailsTerms(newSelectedOptions as string[]); // For multiple selections
        break;
      case "Work Mode":
        setJobDetailsWorkMode(mappedOption);
        break;
      case "Industry":
        setJobDetailsIndustry(mappedOption);
        break;
      default:
        console.warn("Unknown section name:", sectionName);
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
      const response = await fetch(`${API_URL}/action/recruiter/deleteJobPosting`, {
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
      } else {
        const data = await response.json();
        console.log("successfully deleted:", data)
        onGetJobPostings();
        onClose(); // Close the job details view after deletion
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  const handleUpdate = async () => {
    // console.log("title being used to update is:" + jobTitle);
    // console.log("submitting job type", jobDetailsJobType);
    // console.log("submitting job duration", jobDetailsDuration);
    // console.log("submitting job Industry", jobDetailsIndustry);
    // console.log("submitting job mode", jobDetailsWorkMode);
    const updateData = {
      Type: jobDetailsJobType,
      Role: jobTitle,
      Location: jobLocation,
      // Pay: 0, CHANGE LATER IF NEEDED
      DateClosed: dateClosed ? dayjs(dateClosed).toISOString() : null,
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
      const response = await fetch(`${API_URL}/action/recruiter/updateJobPosting`, {
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
        // console.log("successfully updated: ", updatedJob);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCompleteJob = async () => {
    try {
      const response = await fetch(`${API_URL}/action/recruiter/updateJobPosting`, {
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
      onGetJobPostings();

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
                placeholder="Job Title"
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-1/2 p-1 text-xl font-bold mb-2 border text-gray-600 border-gray-300 rounded"
              />
            ) : (
              <h2 className="text-xl font-bold mb-2">{jobTitle ? jobTitle : "New Role"}</h2>
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
                    {showConfirmation ? (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white border border-gray-300 p-4 rounded shadow-md w-1/3">
                          <p className="mb-4">Are you sure you want to delete this job posting?</p>
                          <div className="flex justify-end">
                            <button
                              onClick={handleDelete}
                              className="bg-[#ff6f00] text-white py-1 px-3 rounded mr-2 hover:bg-red-600"
                            >
                              Yes
                            </button>
                            <button
                              onClick={() => setShowConfirmation(false)}
                              className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400"
                            >
                              No
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <FontAwesomeIcon icon={faTrashCan} size="xl" onClick={() => setShowConfirmation(true)} />
                    )}
                    <FontAwesomeIcon icon={faPencilAlt} size="xl" onClick={toggleEdit} />
                    {job.Status === "DRAFT" && <FontAwesomeIcon icon={faCheck} size="xl" onClick={handleCompleteJob}/>}
                  </>
                ) : (<></>)}
              </div>
            )}
          </div>
          <div className="mt-2 mb-4">
            {isEditing ? (
              <div className="flex justify-between">
                <p className="text-lg font-bold w-1/2 p-1 mt-1">{companyName}</p>
                <input
                  type="text"
                  value={jobLocation}
                  placeholder="Location"
                  onChange={(e) => setJobLocation(e.target.value)}
                  className="w-1/2 p-1 text-lg mb-2 border text-gray-400 border-gray-300 rounded"
                />
              </div>
            ) : (
              <>
                <p className="text-lg font-bold">{companyName}</p>
                {job.Status === "DRAFT" ? (
                  <p className="text-lg">{jobLocation ? jobLocation : "Location"}</p>
                ) : (
                  <div className="flex justify-between">
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
                    selectedOptions: reverseOptionMapping[jobDetailsJobType],
                    onOptionChange: (newSelectedOptions) => handleOptionChange('Work Type', newSelectedOptions)
                  },
                  {
                    title: "Duration",
                    options: ["4 months", "8 months", "12 months"],
                    selectedOptions: reverseOptionMapping[jobDetailsDuration],
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
                    selectedOptions: reverseOptionMapping[jobDetailsWorkMode],
                    onOptionChange: (newSelectedOptions) => handleOptionChange('Work Mode', newSelectedOptions)
                  },
                  {
                    title: "Industry",
                    options: ["Technology", "Business"],
                    selectedOptions: reverseOptionMapping[jobDetailsIndustry],
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
                  onChange={(newDate) => setDateClosed(dayjs(newDate).isValid() ? dayjs(newDate) : null)}
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