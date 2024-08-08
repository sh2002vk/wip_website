'use client'
import React, { useState, useEffect } from 'react';
import "./style.css"
import StudentProfileView from "@/app/ui/search/studentProfileView";
import JobDashboardTables from "@/app/ui/manage/recruiters/jobDashboardTables";

const API_URL = process.env.API_URL

interface Application {
    Status: string;
    StudentID: number;
}

interface Shortlist {
    StudentID: number;
}
const JobDashboard = ({jobID}) => {
    // const jobID = 1;
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

    const [applications, setApplications] = useState([]);
    const [shortlist, setShortlist] = useState<Shortlist[]>([]);
    const [applicationInformation, setApplicationInformation] = useState<Application[]>([]);
    const [actionApplications, setActionApplications] = useState<Application[]>([]);
    const [invitedApplications, setInvitedApplications] = useState<Shortlist[]>([]);
    const [contactingApplications, setContactingApplications] = useState<Application[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const fetchApplicationsAndShortlist = async (jobID: string) => {
        try {
            const [applicationsResponse, shortlistResponse] = await Promise.all([
                fetch(`${API_URL}/action/recruiter/getJobApplicants?jobID=${jobID}`),
                fetch(`${API_URL}v/action/recruiter/getShortlistedStudents?jobID=${jobID}`)
            ]);

            const applications: Application[] = await applicationsResponse.json();
            const shortlist: { data: Shortlist[] } = await shortlistResponse.json();

            setApplications(applications);
            setShortlist(shortlist.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchApplicationInformation = async (applicationID: number): Promise<Application | undefined> => {
        try {
            const response = await fetch(`${API_URL}/profile/application/getApplication?applicationID=${applicationID}`);
            const applicationInfo: Application = await response.json();
            return applicationInfo;
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        // console.log("Fetching application and shortlist");
        fetchApplicationsAndShortlist(jobID);
    }, [jobID]);

    useEffect(() => {
        // console.log("Fetching Application Information");
        const fetchAllApplicationInformation = async () => {
            let applicationInfo: Application[] = [];
            for (const application of applications) {
                const appInfo = await fetchApplicationInformation(application);
                if (appInfo) {
                    applicationInfo.push(appInfo);
                }
            }
            setApplicationInformation(applicationInfo);
            setIsDataLoaded(true);
        };

        if (applications.length > 0) {
            fetchAllApplicationInformation();
        }
    }, [applications]);

    useEffect(() => {
        // console.log("Sorting Tables");
        if (!isDataLoaded) return;  // Wait until data is fully loaded
        const sortTables = () => {
            let actionApps: Application[] = [];
            let invitedApps: Shortlist[] = [];
            let contactingApps: Application[] = [];

            const shortlistSet = new Set(shortlist.map(item => item.StudentID));
            const applicationSet = new Set(applicationInformation.map(app => app.StudentID));

            // console.log("shortlistSet", shortlistSet);
            // console.log("applicationSet", applicationSet);

            applicationInformation.forEach(app => {
                if ((app.Status === "REVIEWED" || app.Status === "APPLIED") && !shortlistSet.has(app.StudentID)) {
                    actionApps.push(app);
                } else if (shortlistSet.has(app.StudentID) || app.Status === "ACCEPT") {
                    contactingApps.push(app);
                }
            });

            invitedApps = shortlist.filter(item => !applicationSet.has(item.StudentID));

            setActionApplications(actionApps);
            setInvitedApplications(invitedApps);
            setContactingApplications(contactingApps);

            // console.log("ACTION", actionApps);
            // console.log("INVITED", invitedApps);
            // console.log("CONTACTING", contactingApps);
        };

        if (applicationInformation.length > 0 || shortlist.length > 0) {
            sortTables();
        }
    }, [applicationInformation, shortlist]);

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

    const refreshData = () => {
        fetchApplicationsAndShortlist(jobID);
    };

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
                            data={actionApplications}
                        />
                    </div>
                    <div className="absolute bg-[#F5f5f5] p-2 rounded-lg shadow-md" style={{ width: '28%', height: '37%', left: '70%'}}>
                        <JobDashboardTables
                            onCardClick={handleCardClick}
                            isActionNeeded={false}
                            isInvited={true}
                            isContacting={false}
                            data={invitedApplications}
                        />
                    </div>
                    <div className="absolute bg-[#F5f5f5] p-2 rounded-lg shadow-md" style={{ width: '61.5%', height: '33%', top: '63%'}}>
                        <JobDashboardTables
                            onCardClick={handleCardClick}
                            isActionNeeded={false}
                            isInvited={false}
                            isContacting={true}
                            data={contactingApplications}
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
                            refreshData={refreshData}
                        />
                    )}
                </div>
            )}
        </div>
    );
};
export default JobDashboard;