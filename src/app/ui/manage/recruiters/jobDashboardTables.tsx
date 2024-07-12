'use client';
import React, { useState, useEffect } from 'react';
import StudentProfileView from "@/app/ui/search/studentProfileView";

interface Application {
    Status: string;
    StudentID: number;
}

interface Shortlist {
    StudentID: number;
}

interface Student {
    StudentID: number;
    FirstName: string;
    LastName: string;
    School: string;
    Email: string;
    AcademicMajor: string;
    GPA: number;
}

interface jobDashboardTableProps {
    isActionNeeded?: boolean,
    isInvited?: boolean,
    isContacting?: boolean,
    onCardClick: (student: any, isApplication: boolean) => void,
    data: Shortlist[] | Application[];
}

const JobDashboardTables: React.FC<jobDashboardTableProps> = ({data, isActionNeeded, isInvited, isContacting, onCardClick}) => {
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
            Quota: 3,
            Status: 'APPLIED'
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

    // const contactingStudents = applicantData.filter(applicant =>
    //     shortlistData.some(shortlist => shortlist.StudentID === applicant.StudentID)
    // ); //Contacting list should be the && of Job shortlist and job applicant studentIDs
    //
    // let dataToShow: any[] = [];
    // if (isActionNeeded) {
    //     dataToShow = applicantData;
    // } else if (isInvited) {
    //     dataToShow = shortlistData;
    // } else if (isContacting) {
    //     dataToShow = contactingStudents;
    // }

    const sortedData = (data as Application[]).sort((a, b) => {
        if (a.Status === 'APPLIED' && b.Status !== 'APPLIED') {
            return -1;
        }
        if (a.Status !== 'APPLIED' && b.Status === 'APPLIED') {
            return 1;
        }
        return 0;
    });

    const [tableItems, setTableItems] = useState([]);
    useEffect(() => {
        const getTileInformation = async () => {
            try {
                const items: (Student & { Status?: string, ApplicationTime?: Date , ApplicationID? : number })[] = [];
                for (const a of data) {
                    const response = await fetch(`http://localhost:4000/profile/student/getFullProfile?studentID=${a.StudentID}`);
                    const profile = await response.json();
                    items.push({
                        ...profile.data,
                        Status: 'Status' in a ? a.Status : undefined, // Use the status if available
                        ApplicationTime: 'ApplicationTime' in a ? a.ApplicationTime : undefined,
                        ApplicationID: 'ApplicationID' in a ? a.ApplicationID : undefined
                    });
                }
                setTableItems(items);
            } catch (error) {
                console.error('Error fetching student profiles:', error);
            }
        };

        if (data.length > 0) {
            getTileInformation();
        }
    }, [data]);

    return (
        <div className="h-full overflow-y-auto flex flex-col relative">
                <div className="p-4 sticky top-0 bg-[#F5f5f5] z-10 border-b">
                    {isActionNeeded ? (
                        <h1 className="text-xl font-light ">Action Needed <span className="bg-gray-200 text-sm font-medium py-1 px-2 rounded-full ml-2">{tableItems.length}</span></h1>
                    ) : (
                        <>
                            {isInvited ? (
                                <h1 className="text-xl font-light ">Invited <span className="bg-gray-200 text-sm font-medium py-1 px-2 rounded-full ml-2">{tableItems.length}</span></h1>
                            ) : (
                                <h1 className="text-xl font-light ">Contacting <span className="bg-gray-200 text-sm font-medium py-1 px-2 rounded-full ml-2">{tableItems.length}</span></h1>
                            )}
                        </>
                    )}
                </div>
                <div className="p-4 pt-0">
                    {tableItems.map((item: Student, index) => (
                        <div key={index} className="flex justify-between py-3 border-b"
                             onClick={() => onCardClick(item, !isInvited)} // !isInvited tells the parent component that this is not an application
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
        </div>
    );
};

export default JobDashboardTables;