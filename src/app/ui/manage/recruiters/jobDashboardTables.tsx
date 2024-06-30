'use client';
import React, { useState, useEffect } from 'react';
import StudentProfileView from "@/app/ui/search/studentProfileView";
interface jobDashboardTableProps {
    isActionNeeded?: boolean,
    isInvited?: boolean,
    isContacting?: boolean,
    onCardClick: (student: any) => void
}

const JobDashboardTables: React.FC<jobDashboardTableProps> = ({isActionNeeded, isInvited, isContacting, onCardClick}) => {
    const applicantData = [
        {
            StudentID: 1,
            FirstName: 'John',
            LastName: 'Doe',
            School: 'University of Example',
            EmailID: 'johndoe@example.com',
            AcademicYear: 3,
            Age: 22,
            ResumeLink: 'https://example.com/resume/johndoe',
            AcademicMajor: 'Computer Science',
            GPA: 3.7,
            WorkExperience: [
                {
                    Company: "Company X",
                    Role: "Role X"
                }
            ],
            PersonalStatement: 'Passionate about technology and innovation.',
            Experience: 2.5,
            Availability: "Fall 2025",
            Preference: [
                "Software",
                "Tech"
            ],
            Skills: [
                "Frontend",
                "Backend"
            ],
            Quota: 3
        }
    ];
    const shortlistData = [
        {
            StudentID: 1,
            FirstName: 'John',
            LastName: 'Doe',
            School: 'University of Example',
            EmailID: 'johndoe@example.com',
            AcademicYear: 3,
            Age: 22,
            ResumeLink: 'https://example.com/resume/johndoe',
            AcademicMajor: 'Computer Science',
            GPA: 3.7,
            WorkExperience: [
                {
                    Company: "Company X",
                    Role: "Role X"
                }
            ],
            PersonalStatement: 'Passionate about technology and innovation.',
            Experience: 2.5,
            Availability: "Fall 2025",
            Preference: [
                "Software",
                "Tech"
            ],
            Skills: [
                "Frontend",
                "Backend"
            ],
            Quota: 3
        },
        {
            StudentID: 2,
            FirstName: 'Mark',
            LastName: 'Campbell',
            School: 'University of Guelfe',
            EmailID: 'johndoe@example.com',
            AcademicYear: 3,
            Age: 22,
            ResumeLink: 'https://example.com/resume/johndoe',
            AcademicMajor: 'Computer Science',
            GPA: 3.7,
            WorkExperience: [
                {
                    Company: "Company X",
                    Role: "Role X"
                }
            ],
            PersonalStatement: 'Passionate about technology and innovation.',
            Experience: 2.5,
            Availability: "Fall 2025",
            Preference: [
                "Software",
                "Tech"
            ],
            Skills: [
                "Frontend",
                "Backend"
            ],
            Quota: 3
        }
    ];

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showStudentDetail, setShowStudentDetail] = useState(false);
    const [bookmarkedStudents, setBookmarkedStudents] = useState([]);

    const contactingStudents = applicantData.filter(applicant =>
        shortlistData.some(shortlist => shortlist.StudentID === applicant.StudentID)
    ); //Contacting list should be the && of Job shortlist and job applicant studentIDs

    let dataToShow: any[] = [];
    if (isActionNeeded) {
        dataToShow = applicantData;
    } else if (isInvited) {
        dataToShow = shortlistData;
    } else if (isContacting) {
        dataToShow = contactingStudents;
    }

    const sortedData = applicantData.sort((a, b) => {
        if (a.Status === 'APPLIED' && b.Status !== 'APPLIED') {
            return -1;
        }
        if (a.Status !== 'APPLIED' && b.Status === 'APPLIED') {
            return 1;
        }
        return 0;
    });

    const handleCardClick = (student) => {
        setShowStudentDetail(true);
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
        <div className="h-full overflow-y-auto flex flex-col relative">
            {!showStudentDetail ? (
                <>
                    <div className="p-4 sticky top-0 bg-[#F5f5f5] z-10 border-b">
                        {isActionNeeded ? (
                            <h1 className="text-xl font-light ">Action Needed <span className="bg-gray-200 text-sm font-medium py-1 px-2 rounded-full ml-2">{sortedData.length}</span></h1>
                        ) : (
                            <>
                                {isInvited ? (
                                    <h1 className="text-xl font-light ">Invited <span className="bg-gray-200 text-sm font-medium py-1 px-2 rounded-full ml-2">{shortlistData.length}</span></h1>
                                ) : (
                                    <h1 className="text-xl font-light ">Contacting <span className="bg-gray-200 text-sm font-medium py-1 px-2 rounded-full ml-2">{contactingStudents.length}</span></h1>
                                )}
                            </>
                        )}
                    </div>
                    <div className="p-4 pt-0">
                        {dataToShow.map((item, index) => (
                            <div key={index} className="flex justify-between py-3 border-b"
                                 onClick={() => onCardClick(item)}
                            >
                                <div className="flex items-center">
                                    <div className="bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold text-gray-500">{item.FirstName.charAt(0)}</div>
                                    <div className="ml-4">
                                        <p className="text-md font-medium">{item.FirstName}</p>
                                        <p className="text-sm text-gray-500">{item.School}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center">
                                    {(item.Status == "APPLIED" && isActionNeeded) && <span className="bg-gray-200 text-sm font-light py-1 px-2 rounded-full">UNREVIEWED</span>}
                                    {(isContacting) && <span className="bg-gray-200 text-sm font-light py-1 px-2 rounded-full">{item.EmailID}</span>}
                                    <span className="ml-4 text-gray-400 text-sm">{item.ApplicationTime}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="absolute inset-0 w-full h-full">
                    {showStudentDetail && selectedStudent && (
                        <StudentProfileView
                            student={selectedStudent}
                            onClose={handleCloseDetail}
                            onBookmark={() => handleBookmarkClick(selectedStudent)}
                            isBookmarked={isBookmarked(selectedStudent)}
                            isApplication={true}
                            applicationID={1}//The selected application
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default JobDashboardTables;