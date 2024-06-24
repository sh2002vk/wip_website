'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';

const StudentProfileView = ({ student, onClose, onBookmark, isBookmarked }) => {
    const [bookmarked, setBookmarked] = useState(isBookmarked);

    useEffect(() => {
        setBookmarked(isBookmarked);
    }, [isBookmarked]);

    const handleBookmarkClick = () => {
        setBookmarked(!bookmarked);
        onBookmark();
    };

    return (
        <div className="student-profile-view flex flex-col md:flex-row p-4 border rounded-lg shadow-lg">
            <div className="flex-none w-full md:w-1/3 flex flex-col items-center text-center p-8">
                <div className="flex">
                    <div className="w-[20px]"></div>
                    <div className="flex h-[200px] w-[200px] rounded-full bg-gray-300 overflow-hidden items-center justify-center">
                         {/* For now, using WIP logo as a template */}
                        <Image src="/wip.png" alt="profile picture" width={64} height={64} layout="responsive" />
                    </div>
                    <div className="w-[20px] text-sm" onClick={handleBookmarkClick}>
                        <FontAwesomeIcon
                            icon={bookmarked ? solidBookmark : regularBookmark}
                            size="lg"
                            className={bookmarked ? 'text-orange-300' : 'text-black'}
                        />
                    </div>
                </div>

                <h1 className="mt-5 text-2xl font-bold">{student.name} · {student.age}</h1>
                <p className="text-xl font-bold">{student.institution}</p>
                <p className="text-xl font-light">{student.degree}</p>
                <p className="mt-5 text-gray-500 font-light">City · Province · Country</p>
                <p className="mt-4 text-orange-500 font-medium">Some highlighted key words here, Consider adding a highlight attribute for a student object</p>
            </div>

            <div className="flex-1 p-4 py-8">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-base text-gray-500">Looking for:</p>
                        <p className="text-lg font-medium text-gray-700">{student.lookingfor.join(' · ')}</p>
                        <p className="text-base text-gray-500 mt-4">Availability</p>
                        <p className="text-lg font-medium text-gray-700">{student.availability}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none">
                        &times;
                    </button>
                </div>
                <div className="mt-4">
                    <h2 className="text-base font-bold">About</h2>
                    <p className="text-lg font-light" style={{ textIndent: '2em' }}>This is where the candidate will insert a concise introduction about themselves, where they will share some information about things they would like recruiters to know about them. We need to set a word limit to this section. Ideally this section will not be too long, but I've also included a scroll bar at the right just in case.</p>
                </div>
                <div className="mt-4">
                    <h2 className="text-base font-bold">Skill sets</h2>
                    <p className="text-lg font-light">{student.skills.join(', ')}</p>
                </div>
                <div className="mt-4">
                    <h2 className="text-base font-bold">Previous Experience</h2>
                    {student.experience.map((exp, index) => (
                        <div key={index} className="text-lg mb-1">
                            <p>
                                <span className="font-semibold italic">{exp.title}</span> · {exp.company}
                            </p>
                            {(exp.startTime || exp.endTime) && (
                                <p className="text-base text-gray-500 font-light">
                                    {exp.startTime ? `${exp.startTime} -` : ' -'} {exp.endTime}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudentProfileView;
