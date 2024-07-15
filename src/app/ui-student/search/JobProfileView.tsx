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

    const getBorderColor = (condition) => condition ? 'orange' : 'gray';

    return (
        <div className="flex flex-col md:flex-row rounded-lg w-full shadow-lg max-h-full overflow-y-auto">
            <div className="flex-none w-full h-full md:w-1/3 border-r flex flex-col justify-between">
                <div className='p-7'>
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
                        <p className="text-base font-semibold mb-1">Required Documents</p>
                        <div className="mb-2">
                            <label className="button-like-label" style={{ display: 'inline-block', width:'150px', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 300, color: 'black', border: `2px solid ${getBorderColor(job.resume)}`, borderRadius: '0.25rem', cursor: 'pointer', textAlign: 'center' }}>
                                Resume
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="button-like-label" style={{ display: 'inline-block', width:'150px', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 300, color: 'black', border: `2px solid ${getBorderColor(job.coverLetter)}`, borderRadius: '0.25rem', cursor: 'pointer', textAlign: 'center' }}>
                                Cover Letter
                            </label>
                        </div>
                        <div className="mb-2">
                            <label className="button-like-label" style={{ display: 'inline-block', width:'150px', marginTop: '0.5rem', fontSize: '1rem', fontWeight: 300, color: 'black', border: `2px solid ${getBorderColor(job.transcript)}`, borderRadius: '0.25rem', cursor: 'pointer', textAlign: 'center' }}>
                                Transcript
                            </label>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center space-x-2 p-7">
                    <button className="px-4 py-2 bg-orange-500 text-white rounded">Show Interest</button>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded">Contact Recruiter</button>
                </div>
            </div>

            <div className="flex-1 p-8">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
                        <button onClick={handleBookmarkClick} className="ml-3">
                            <FontAwesomeIcon
                                icon={bookmarked ? solidBookmark : regularBookmark}
                                size="lg"
                                className={bookmarked ? 'text-orange-300' : 'text-black'}
                            />
                        </button>
                    </div>
                    <div>
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
