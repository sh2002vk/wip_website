'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
const StudentProfileView = ({ student, onClose, onBookmark, isBookmarked, isApplication, applicationID}) => {
    const [bookmarked, setBookmarked] = useState(isBookmarked);

    const sampleApplications = [
        { JobID: 1, StudentID: 1, RecruiterID: 1, ApplicationTime: new Date(), Status: 'APPLIED', Resume: "SampleResumeLink" },
        { JobID: 2, StudentID: 2, RecruiterID: 2, ApplicationTime: new Date(), Status: 'REVIEWED', Resume: "resume.txt", CoverLetter: "COVERLETTER", EnglishSample: "ENGLISHSAMPLE.TXT"},
        // Add more application records as needed
    ];

    useEffect(() => {
        setBookmarked(isBookmarked);
    }, [isBookmarked]);

    const handleBookmarkClick = () => {
        setBookmarked(!bookmarked);
        onBookmark();
    };

    return (
        <div className="student-profile-view flex flex-col md:flex-row p-2 border rounded-lg shadow-lg max-h-full overflow-y-auto">
            <div className="flex-none w-full md:w-1/3 flex flex-col items-center text-center p-8">
                <div className="flex">
                    <div className="w-[20px]"></div>
                    <div className="flex h-[150px] w-[150px] rounded-full bg-gray-300 overflow-hidden items-center justify-center">
                        {/* For now, using WIP logo as a template */}
                        <Image src="/wip.png" alt="profile picture" width={64} height={64} layout="responsive" />
                    </div>
                    <div className="w-[16px] text-sm" onClick={handleBookmarkClick}>
                        <FontAwesomeIcon
                            icon={bookmarked ? solidBookmark : regularBookmark}
                            size="lg"
                            className={bookmarked ? 'text-orange-300' : 'text-black'}
                        />
                    </div>
                </div>

                <h1 className="mt-5 text-2xl font-bold">{student.FirstName} {student.LastName}</h1>
                <p className="text-xl font-bold">{student.School}</p>
                <p className="text-xl font-light">Major in {student.AcademicMajor}</p>
                <p className="mt-5 text-gray-500 font-light">City · Province · Country</p>
                <p className="mt-4 text-orange-500 font-medium">Some highlighted key words here, Consider adding a highlight attribute for a student object</p>
            </div>

            <div className={`flex-1 p-4 ${isApplication ? "py-4" : "py-8"}`}>
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-base text-gray-500">Looking for:</p>
                        <p className="text-lg font-medium text-gray-700">{student.Preference.join(' · ')}</p>
                        <p className="text-base text-gray-500 mt-4">Availability</p>
                        <p className="text-lg font-medium text-gray-700">{student.Availability}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-3xl font-bold leading-none">
                        &times;
                    </button>
                </div>
                {isApplication && (
                    <div className={"flex space-x-2 mt-2"}>
                        <div> {/*TODO: API calls instead of hard coded sampleApplication*/}
                            {sampleApplications[1].Resume && (
                                <button className="bg-[#ff6f00] hover:bg-orange-400 text-white font-bold py-0.5 px-2 rounded">
                                    Resume
                                </button>
                            )}
                        </div>
                        <div>
                            {sampleApplications[1].CoverLetter && (
                                <button className="bg-[#ff6f00] hover:bg-orange-400 text-white font-bold py-0.5 px-2 rounded">
                                    Cover Letter
                                </button>
                            )}
                        </div>
                        <div>
                            {sampleApplications[1].EnglishSample && (
                                <button className="bg-[#ff6f00] hover:bg-orange-400 text-white font-bold py-0.5 px-2 rounded">
                                    English Sample
                                </button>
                            )}
                        </div>
                    </div>
                )}
                <div className="mt-4">
                    <h2 className="text-base font-bold">About</h2>
                    <p className="text-medium font-light" style={{ textIndent: '2em' }}>This is where the candidate will insert a concise introduction about themselves, where they will share some information about things they would like recruiters to know about them. We need to set a word limit to this section. Ideally this section will not be too long, but I've also included a scroll bar at the right just in case.</p>
                </div>
                <div className="mt-4">
                    <h2 className="text-base font-bold">Skill sets</h2>
                    <p className="text-medium font-light">{student.Skills.join(', ')}</p>
                </div>
                <div className="mt-4">
                    <h2 className="text-base font-bold">Previous Experience</h2>
                    {student.WorkExperience.map((exp, index) => (
                        <div key={index} className="text-medium mb-1">
                            <p>
                                <span className="font-semibold italic">{exp.Role}</span> · {exp.Company}
                            </p>
                            {/*{(exp.startTime || exp.endTime) && (*/}
                            {/*    <p className="text-base text-gray-500 font-light">*/}
                            {/*        {exp.startTime ? `${exp.startTime} -` : ' -'} {exp.endTime}*/}
                            {/*    </p>*/}
                            {/*)}*/}
                        </div>
                    ))}
                </div>

                <div className="flex-grow"></div>

                {isApplication && (
                    <div className={"flex space-x-2 mt-6 justify-end"}>
                        <button className="bg-[#ff6f00] hover:bg-orange-400 text-white font-bold py-1 px-4 rounded">
                            Contact
                        </button>
                        <button className="bg-[#ff6f00] hover:bg-orange-400 text-white font-bold py-1 px-4 rounded">
                            Reject
                        </button>
                        <button className="bg-[#ff6f00] hover:bg-orange-400 text-white font-bold py-1 px-4 rounded">
                            Mark as reviewed
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentProfileView;
