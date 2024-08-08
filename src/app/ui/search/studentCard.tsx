'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

export default function StudentCard({ FirstName, LastName, School, AcademicMajor, Availability, Preference, WorkExperience, Skills, onClick, onBookmark, isBookmarked }) {
    const [bookmarked, setBookmarked] = useState(isBookmarked);

    useEffect(() => {
        setBookmarked(isBookmarked);
    }, [isBookmarked]);

    const handleBookmarkClick = (e) => {
        e.stopPropagation();
        setBookmarked(!bookmarked);
        onBookmark();
    };

    return (
        <div onClick={onClick} className="relative min-w-[17rem] max-w-[17rem] min-h-[32rem] max-h-[30rem] rounded-2xl overflow-auto shadow-lg bg-gray-100 p-5 m-4 flex flex-col items-center justify-center">
            {/* Bookmark Icon at the top right corner */}
            <div className="absolute top-2 right-2 cursor-pointer" onClick={handleBookmarkClick}>
                <FontAwesomeIcon
                    icon={bookmarked ? solidBookmark : regularBookmark}
                    size="sm"
                    className={bookmarked ? 'text-orange-300 transition duration-300' : 'text-black transition duration-300'}
                />
            </div>

            {/* Items that should be middle-aligned */}
            <div className='flex flex-col items-center text-center'>
                <div className="py-8 flex h-16 w-16 rounded-full bg-gray-300 overflow-hidden items-center justify-center">
                    <Image src="/wip.png" alt="profile picture" width={64} height={64} layout="responsive" />
                </div>
                <div className="text-center py-4">
                    <div className="text-xl font-bold">{FirstName} {LastName}</div>
                    <p className="text-sm text-gray-600">{School}</p>
                    <p className="text-sm text-gray-600">{AcademicMajor}</p>
                </div>
            </div>

            {/* Items that should be left aligned */}
            <div className='text-left w-full'>
                <div className="py-1">
                    <h3 className="text-base font-semibold">Looking for</h3>
                    <p className="text-sm text-gray-600">{Preference}</p>
                </div>
                <div className="py-1">
                    <h3 className="text-base font-semibold">Availability</h3>
                    <p className="text-sm text-gray-600">{Availability}</p>
                </div>
                <div className="py-1">
                    <h3 className="text-base font-semibold">Previous Experience</h3>
                    <ul className="text-sm text-gray-600">
                        {WorkExperience.map((job, index) => (
                            <li key={index}>{job.title} - {job.company}</li>
                        ))}
                    </ul>
                </div>
                <div className="py-1">
                    <h3 className="text-base font-semibold">Skill sets</h3>
                    <p className="text-sm text-gray-600">{Skills}</p>
                </div>
            </div>
        </div>
    );
}
