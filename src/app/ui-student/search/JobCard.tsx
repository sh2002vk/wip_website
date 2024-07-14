import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

export default function JobCard({ title, role, dates, location, recruiter, companyName, workMode, onClick, onBookmark, isBookmarked }) {
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
        <div onClick={onClick} className="relative w-[27rem] h-[15rem] rounded-2xl overflow-auto shadow-lg bg-gray-100 p-5 m-4 flex flex-col">
            <div className="absolute top-2 right-2 cursor-pointer" onClick={handleBookmarkClick}>
                <FontAwesomeIcon
                    icon={bookmarked ? solidBookmark : regularBookmark}
                    size="sm"
                    className={bookmarked ? 'text-orange-300 transition duration-300' : 'text-black transition duration-300'}
                />
            </div>
            <div className="flex p-4">
                <div className="w-16 h-16 bg-gray-300 rounded-full mr-4"></div>
                <div>
                    <h2 className="font-bold">{companyName}</h2>
                    <p className="">{title}</p>
                    <p className="text-gray-600">{location}</p>
                </div>
            </div>
            <div className="p-2">
                <p className="text-sm text-gray-600 mb-1"><strong>Term:</strong> {dates}</p>
                <p className="text-sm text-gray-600 mb-1"><strong>Recruiter:</strong> {recruiter}</p>
                <p className="text-sm text-gray-600"><strong>Work Mode:</strong> {workMode}</p>
            </div>
        </div>
    );
}
