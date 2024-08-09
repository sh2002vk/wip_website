'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import dayjs from "dayjs";

const API_URL = process.env.API_URL

const JobProfileView = ({ user, job, onClose, onBookmark, isBookmarked }) => {
    const [bookmarked, setBookmarked] = useState(isBookmarked);
    const [interestShown, setInterestShown] = useState(false);
    const [companyName, setCompanyName] = useState("");

    useEffect(() => {
        setBookmarked(isBookmarked);
    }, [isBookmarked]);

    useEffect(() => {
        const checkIfApplied = async () => {
            try {
                const response = await fetch(`${API_URL}/action/student/checkIfApplied?studentID=${user.uid}&jobID=${job.JobID}`);
                if (!response.ok) {
                    console.log("Error checking application status");
                    return;
                }
                const data = await response.json();

                console.log(data);

                setInterestShown(data.isApplied);
            } catch (error) {
                console.log("Error fetching application status:", error);
            }
        };

        checkIfApplied();
    }, [user.uid, job.JobID]);

    useEffect(() => {
        const fetchCompanyProfile = async () => {
            try {
                const response = await fetch(`${API_URL}/profile/company/getFullProfile?companyID=${job.CompanyID}`);
                if (!response.ok) {
                    console.log("Error fetching company profile");
                    return;
                }
                const data = await response.json();
                setCompanyName(data.data.Name);  // Adjust the field according to your API response

            } catch (error) {
                console.log("Error fetching company profile:", error);
            }
        };

        fetchCompanyProfile();
    }, [job.CompanyID]);

    const handleBookmarkClick = () => {
        setBookmarked(!bookmarked);
        onBookmark();
    };

    const handleShowInterestClick = async () => {
        if (!interestShown) {
            await createApplication();
        }
        setInterestShown(!interestShown);
    };

    const getBorderColor = (condition) => (condition ? 'orange' : 'gray');

    const createApplication = async () => {
        try {
            const response = await fetch(`${API_URL}/action/student/createApplication`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    JobID: job.JobID,
                    StudentID: user.uid,
                    RecruiterID: job.RecruiterID,
                    ApplicationTime: new Date().toISOString(), // Ensure the date is in ISO format
                    Status: "DRAFT"
                }),
            });
            if (!response.ok) {
                console.log("Some error")
            }
            const data = await response.json();
            alert("Application Created")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col md:flex-row rounded-lg w-full shadow-lg max-h-full overflow-y-auto">
            <div className="flex-none w-full h-full md:w-1/3 border-r flex flex-col justify-between">
                <div className="p-7">
                    <h2 className="text-xl text-orange-400 font-bold mb-4">Application Information</h2>
                    <div className="mb-4">
                        <p className="text-base font-semibold">Application Deadline</p>
                        <p className="text-lg font-light text-gray-700">{dayjs(job.DateClosed).format('MMMM DD, YYYY')}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-base font-semibold">Recruiter</p>
                        <p className="text-lg font-light text-gray-700">{job.RecruiterID}</p>
                    </div>
                    <div>
                        <p className="text-base font-semibold mb-1">Required Documents</p>
                        <div className="mb-2">
                            <label className="button-like-label" style={{ display: 'inline-block', width:'150px', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 300, color: 'black', border: `2px solid ${getBorderColor(job.RequiredDocuments.Resume)}`, borderRadius: '0.25rem', cursor: 'pointer', textAlign: 'center' }}>
                                Resume
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="button-like-label" style={{ display: 'inline-block', width:'150px', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 300, color: 'black', border: `2px solid ${getBorderColor(job.RequiredDocuments.CoverLetter)}`, borderRadius: '0.25rem', cursor: 'pointer', textAlign: 'center' }}>

                                Cover Letter
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="button-like-label" style={{ display: 'inline-block', width:'150px', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 300, color: 'black', border: `2px solid ${getBorderColor(job.RequiredDocuments.Transcript)}`, borderRadius: '0.25rem', cursor: 'pointer', textAlign: 'center' }}>
                                Transcript
                            </label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-2 p-7">
                    {interestShown && (
                        <div className="text-[#ff6f00] text-xs">
                            You can find this job under manage.
                        </div>
                    )}
                    <button
                        onClick={handleShowInterestClick}
                        className="px-4 py-2 text-white rounded"
                        style={{
                            width: '150px',
                            borderRadius: '0.25rem',
                            cursor: 'pointer',
                            textAlign: 'center',
                            backgroundColor: interestShown ? '#d35400' : '#ff6f00',
                        }}
                    >
                        {interestShown ? 'Interest Shown' : 'Send Application to Manage'}
                    </button>
                </div>
            </div>

            <div className="flex-1 p-8">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold mb-1">{job.Role}</h1>
                        <button onClick={handleBookmarkClick} className="ml-3">
                            <FontAwesomeIcon
                                icon={bookmarked ? solidBookmark : regularBookmark}
                                size="lg"
                                className={bookmarked ? 'text-orange-300' : 'text-black'}
                            />
                        </button>
                    </div>
                    <div>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none ml-4"
                        >
                            &times;
                        </button>
                    </div>
                </div>
                <div>
                    {companyName &&                     
                    <p className="text-lg font-bold mb-1">
                        {companyName}
                    </p>   
                    }
                    <p className="text-base font-semibold mb-1">
                        Location: <span className="font-light">{job.Location}</span>
                    </p>                 
                    <p className="text-base font-semibold mb-1">
                        Duration: <span className="font-light">{job.Duration} {job.Duration ? "months" : "unspecified"}</span>
                    </p>
                    <p className="text-base font-semibold mb-1">
                        Work Mode: <span className="font-light">{job.Environment}</span>
                    </p>
                    <p className="text-base font-semibold mb-1">
                        Pay: <span className="font-light">
                            {job.Pay ? `${job.Pay.toLocaleString()} CAD` : "unspecified"}
                        </span>
                    </p>
                    <p className="text-base font-semibold mb-4">
                        Citizenship Requirement: <span className="font-light">{job.citizenshipRequirement}</span>
                    </p>
                    <h2 className="text-xl font-bold mb-2">Job Description</h2>
                    <p className="text-medium font-light mb-4">{job.JobDescription}</p>
                </div>
            </div>
        </div>
    );
};

export default JobProfileView;
