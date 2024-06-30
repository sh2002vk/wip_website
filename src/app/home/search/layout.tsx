'use client'
import React, { useState } from 'react';
import Parameters from '@/app/ui/search/parameters';
import StudentCard from '@/app/ui/search/studentCard';
import StudentProfileView from '@/app/ui/search/studentProfileView';
import Bookmarks from '@/app/ui/search/bookmarks';
import "../no-scrollbar.css";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../firebase'; // Ensure the correct import path

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const SearchLayout = ({ children, title }: LayoutProps) => {

  const students = [
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
      WorkExperience: [ // TODO: ADD THIS TO BACKEND TABLE
        {
          Company: "Company X",
          Role: "Role X"
        }
      ],
      PersonalStatement: 'Passionate about technology and innovation.',
      Experience: 2.5,
      Availability: "Fall 2025",  // TODO: ADD THIS TO BACKEND TABLE
      Preference: [ // TODO: ADD THIS TO BACKEND TABLE
          "Software",
          "Tech"
      ],
      Skills: [ // TODO: ADD THIS TO BACKEND TABLE
          "Frontend",
          "Backend"
      ],
      Quota: 3
    },
    {
      StudentID: 2,
      FirstName: 'Bill',
      LastName: 'Hower',
      School: 'University of Guelfe',
      EmailID: 'billbillbill@hotmail.com',
      AcademicYear: 3,
      Age: 22,
      ResumeLink: 'https://example.com/resume/johndoe',
      AcademicMajor: 'Business',
      GPA: 3.7,
      WorkExperience: [ // TODO: ADD THIS TO BACKEND TABLE
        {
          Company: "Space X",
          Role: "Technical Designer"
        }
      ],
      PersonalStatement: 'I like building rockets.',
      Experience: 2.5,
      Availability: "Fall 2025",  // TODO: ADD THIS TO BACKEND TABLE
      Preference: [ // TODO: ADD THIS TO BACKEND TABLE
        "Design",
        "Tech"
      ],
      Skills: [ // TODO: ADD THIS TO BACKEND TABLE
        "Design",
        "Communication"
      ],
      Quota: 3
    },
    {
      StudentID: 3,
      FirstName: 'Michael',
      LastName: 'Rivers',
      School: 'McGill University',
      EmailID: 'mikey@mcgill.com',
      AcademicYear: 3,
      Age: 22,
      ResumeLink: 'https://example.com/resume/johndoe',
      AcademicMajor: 'Finance',
      GPA: 3.7,
      WorkExperience: [ // TODO: ADD THIS TO BACKEND TABLE
        {
          Company: "JPMorgan Chase",
          Role: "Financial Analyst"
        }
      ],
      PersonalStatement: 'i daytrade corn',
      Experience: 2.5,
      Availability: "Fall 2025",  // TODO: ADD THIS TO BACKEND TABLE
      Preference: [ // TODO: ADD THIS TO BACKEND TABLE
        "Software",
        "Tech"
      ],
      Skills: [ // TODO: ADD THIS TO BACKEND TABLE
        "Gambling",
        "Modelling"
      ],
      Quota: 3
    },
    {
      StudentID: 4,
      FirstName: 'Stu',
      LastName: 'Beans',
      School: 'McMasters University',
      EmailID: 'stu@mcm.com',
      AcademicYear: 3,
      Age: 22,
      ResumeLink: 'https://example.com/resume/johndoe',
      AcademicMajor: 'Design',
      GPA: 3.7,
      WorkExperience: [ // TODO: ADD THIS TO BACKEND TABLE
        {
          Company: "Palantir",
          Role: "Lead designer"
        }
      ],
      PersonalStatement: 'i design using figma',
      Experience: 2.5,
      Availability: "Fall 2025",  // TODO: ADD THIS TO BACKEND TABLE
      Preference: [ // TODO: ADD THIS TO BACKEND TABLE
        "Design",
        "Tech"
      ],
      Skills: [ // TODO: ADD THIS TO BACKEND TABLE
        "Figma",
        "Modelling"
      ],
      Quota: 3
    },
  ];

  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const [showStudents, setShowStudents] = useState(false);
  const [showStudentDetail, setShowStudentDetail] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [bookmarkedStudents, setBookmarkedStudents] = useState([]);
  const [isBookmarksExpanded, setIsBookmarksExpanded] = useState(false);

  const handleSearch = (filters: { availability: number; preference: string; degreeLevel: string; date: Dayjs | null; keyword: string }) => {
    // Now you have the filter states here and can log or use them as needed
    console.log("Filters to send to API: ", filters);
    setShowStudents(true);
    setShowStudentDetail(false);
    // Here, you could also make an API call using the filters
  };

  const handleCardClick = (student) => {
    setShowStudentDetail(true);
    setSelectedStudent(student);
    setIsBookmarksExpanded(false); // Hide bookmarks tab when viewing a student profile
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

  const handleCloseDetail = () => {
    setShowStudentDetail(false);
    setSelectedStudent(null);
    setShowStudents(true);
  };

  const isBookmarked = (student) => bookmarkedStudents.some(s => s.name === student.name);

  const toggleBookmarksTab = () => {
    setIsBookmarksExpanded(!isBookmarksExpanded);
  };

  const closeBookmarksTab = () => {
    setIsBookmarksExpanded(false);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen relative">

      <div className="w-full md:w-64 flex-none h-screen overflow-auto">
        <Parameters onSearch={handleSearch} user={user} />
      </div>
      {!showStudentDetail ? (
          <div className="flex-grow flex flex-wrap gap-2 ml-4 overflow-y-auto no-scrollbar" style={{ height: 'calc(100% - 1rem)' }}>
            {showStudents && !showStudentDetail && students.map((student, index) => (
                <StudentCard
                    key={index}
                    {...student}
                    onClick={() => handleCardClick(student)}
                    onBookmark={() => handleBookmarkClick(student)}
                    isBookmarked={isBookmarked(student)}
                />
            ))}
          </div>
      ) : (
          <>
          {showStudentDetail && selectedStudent && (
              <StudentProfileView
                  student={selectedStudent}
                  onClose={handleCloseDetail}
                  onBookmark={() => handleBookmarkClick(selectedStudent)}
                  isBookmarked={isBookmarked(selectedStudent)}
              />
          )}
          </>
      )}
      {!showStudentDetail && (
        <div className="absolute top-0 right-0 h-screen">
          <Bookmarks 
            students={bookmarkedStudents} 
            onStudentClick={handleCardClick} 
            isExpanded={isBookmarksExpanded}
            toggleExpand={toggleBookmarksTab}
            closeExpand={closeBookmarksTab}
          />
        </div>
      )}
    </div>
  );
};

export default SearchLayout;