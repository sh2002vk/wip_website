'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

const JobProfileView = ({ job, onClose, onBookmark, isBookmarked }) => {
    const [bookmarked, setBookmarked] = useState(isBookmarked);

    useEffect(() => {
        setBookmarked(isBookmarked);
    }, [isBookmarked]);

    const handleBookmarkClick = () => {
        setBookmarked(!bookmarked);
        onBookmark();
    };

    return (
        <div className="job-profile-view flex flex-col md:flex-row border rounded-lg w-full shadow-lg max-h-full overflow-y-auto">
            <div className="flex-none w-full md:w-1/3 p-8 border-r">
                <h2 className="text-xl text-orange-400 font-bold mb-4">Application Information</h2>
                <div className="mb-4">
                    <p className="text-base font-semibold">Application Deadline</p>
                    <p className="text-lg font-light text-gray-700">{job.applicationDeadline}</p>
                </div>
                <div className="mb-4">
                    <p className="text-base font-semibold">Recruiter</p>
                    <p className="text-lg font-light text-gray-700">{job.recruiter}</p>
                </div>
                <div>
                    <p className="text-base font-semibold">Required Documents</p>
                    <p className="text-lg font-medium text-gray-700">Resume: {job.resume ? 'Yes' : 'No'}</p>
                    <p className="text-lg font-medium text-gray-700">Cover Letter: {job.coverLetter ? 'Yes' : 'No'}</p>
                    <p className="text-lg font-medium text-gray-700">Transcript: {job.transcript ? 'Yes' : 'No'}</p>
                </div>
            </div>

            <div className="flex-1 p-8">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
                        <p className="text-lg font-semibold">{job.companyName}</p>
                        <p className="text-lg text-gray-500">{job.location}</p>
                        <hr className="my-2"/>
                    </div>
                    <div className="flex items-center">
                        <button onClick={handleBookmarkClick}>
                            <FontAwesomeIcon
                                icon={bookmarked ? solidBookmark : regularBookmark}
                                size="lg"
                                className={bookmarked ? 'text-orange-300' : 'text-black'}
                            />
                        </button>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none ml-4">
                            &times;
                        </button>
                    </div>
                </div>
                <div>
                    <p className="text-base font-semibold mb-1">Duration: <span className='font-light'>{job.duration}</span></p>
                    <p className="text-base font-semibold mb-1">Work Mode: <span className='font-light'>{job.workMode}</span></p>
                    <p className="text-base font-semibold mb-1">Pay: <span className='font-light'>{job.pay}</span></p>
                    <p className="text-base font-semibold mb-4">Citizenship Requirement: <span className='font-light'>{job.citizenshipRequirement}</span></p>
                    <h2 className="text-xl font-bold mb-2">Job Description</h2>
                    <p className="text-medium font-light mb-4">{job.description}</p>
                </div>
            </div>
        </div>
    );
};

export default JobProfileView;
