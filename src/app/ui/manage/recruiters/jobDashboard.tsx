'use client'
import React, { useState, useEffect } from 'react';
import "./style.css"
import StudentProfileView from "@/app/ui/search/studentProfileView";
import JobDashboardTables from "@/app/ui/manage/recruiters/jobDashboardTables";
const JobDashboard = () => {
    const jobID = 1;
    const students = [
        {
            FirstName: 'John',
            LastName: 'Doe',
            School: 'University of Example',
            EmailID: 'johndoe@example.com',
            AcademicYear: 3,
            Age: 22,
            ResumeLink: 'https://example.com/resume/johndoe',
            AcademicMajor: 'Computer Science',
            GPA: 3.7,
            WorkExperience: 'Intern at Company X, Freelancer',
            PersonalStatement: 'Passionate about technology and innovation.',
            Experience: 2.5,
            Quota: 3
        },
    ]

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showStudentDetail, setShowStudentDetail] = useState(false);
    const [isApplication, setIsApplication] = useState(false);
    const [bookmarkedStudents, setBookmarkedStudents] = useState([]);

    const handleCardClick = (student, isApplication) => {
        setShowStudentDetail(true);
        setIsApplication(isApplication);
        setSelectedStudent(student);
    };

    const handleCloseDetail = () => {
        setShowStudentDetail(false);
        setSelectedStudent(null);
    };

    const handleBookmarkClick = (student) => {
        setBookmarkedStudents(prev => {
            if (prev.some(s => s.name === student.name)) {
                return prev.filter(s => s.name !== student.name);
            } else {
                return [...prev, student];
            }
        });
    };
    const isBookmarked = (student) => bookmarkedStudents.some(s => s.name === student.name);

    return (
        <div className="flex flex-col h-full bg-white">
            {!showStudentDetail ? (
                <>
                    <div className="absolute bg-[#F5f5f5] p-2 rounded-lg shadow-md" style={{ width: '31%', height: '37%' }}>
                        <JobDashboardTables
                            onCardClick={handleCardClick}
                            isActionNeeded={true}
                            isInvited={false}
                            isContacting={false}
                        />
                    </div>
                    <div className="absolute bg-[#F5f5f5] p-2 rounded-lg shadow-md" style={{ width: '28%', height: '37%', left: '70%'}}>
                        <JobDashboardTables
                            onCardClick={handleCardClick}
                            isActionNeeded={false}
                            isInvited={true}
                            isContacting={false}
                        />
                    </div>
                    <div className="absolute bg-[#F5f5f5] p-2 rounded-lg shadow-md" style={{ width: '61.5%', height: '33%', top: '63%'}}>
                        <JobDashboardTables
                            onCardClick={handleCardClick}
                            isActionNeeded={false}
                            isInvited={false}
                            isContacting={true}
                        />
                    </div>
                </>
                ) : (
                <div>
                    {showStudentDetail && selectedStudent && (
                        <StudentProfileView
                            student={selectedStudent}
                            onClose={handleCloseDetail}
                            onBookmark={() => handleBookmarkClick(selectedStudent)}
                            isBookmarked={isBookmarked(selectedStudent)}
                            isApplication={isApplication}
                            applicationID={1}//The selected application
                        />
                    )}
                </div>
            )}
        </div>
    );
};
export default JobDashboard;