'use client'
import React, { useState, useEffect } from 'react';
import Parameters from '@/app/ui/search/parameters';
import StudentCard from '@/app/ui/search/studentCard';
import StudentProfileView from '@/app/ui/search/studentProfileView';
import Bookmarks from '@/app/ui/search/bookmarks';
import "../no-scrollbar.css";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../firebase'; // Ensure the correct import path

import { useRouter } from 'next/navigation';
const API_URL = process.env.API_URL

type LayoutProps = {
  children: React.ReactNode;
  // title?: string;
};

type WorkingSession = "Fall 24" | "Winter 25" | "Summer 25";
type Availability = "4 Months" | "8 Months" | "1+ Year";
type DegreeLevel = "3/4 Year" | "Masters" | "PHD";
type WorkType = "Local" | "Hybrid" | "Remote";

const SearchLayout = ({ children }: LayoutProps) => {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [showStudents, setShowStudents] = useState(false);
  const [showStudentDetail, setShowStudentDetail] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [bookmarkedStudents, setBookmarkedStudents] = useState([]);
  const [isBookmarksExpanded, setIsBookmarksExpanded] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchBookmarkedStudents(user.uid);
      } else {
        setUser(null);
        router.push('/login'); // Redirect to student home
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchBookmarkedStudents = async (recruiterID) => {
    try {
      const response = await fetch(`${API_URL}/action/recruiter/getBookmarkedStudents?recruiterID=${recruiterID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setBookmarkedStudents(data.data);
    } catch (error) {
      console.error('There was a problem with the get operation:', error);
    }
  };

  const handleSearch = async (filters) => {

    const availabilityMapping: Record<Availability, string> = {
      "4 Months": "4",
      "8 Months": "8",
      "1+ Year": "12"
    };

    const levelMapping: Record<DegreeLevel, number> = {
      "3/4 Year": 4,
      "Masters": 5,
      "PHD": 6
    };

    const worktypeMapping: Record<WorkType, string> = {
      "Local": "INPERSON",
      "Hybrid": "HYBRID",
      "Remote": "REMOTE"
    }

    const sessionMapping: Record<WorkingSession, string> = {
      "Fall 24": "F24",
      "Winter 25": "W25",
      "Summer 25": "S25"
    }

    let whereClause: {
      season?: string[];
      preference?: string[];
      duration?: string[];
      level?: number[];
      location?: string;
      program?: string[];
    } = {};

    if (filters.season) {
      whereClause.season = filters.season.map((session: WorkingSession) => sessionMapping[session]);
    }

    if (filters.preference) {
      whereClause.preference = filters.preference.map((type: WorkType) => worktypeMapping[type]);
    }

    if (filters.duration) {
      whereClause.duration = filters.duration.map((availability: Availability) => availabilityMapping[availability]);
    }

    if (filters.level) {
      whereClause.level = filters.level.map((level: DegreeLevel) => levelMapping[level]);
    }

    if (filters.location) {
      whereClause.location = filters.location;
    }

    if (filters.selectedPrograms) {
      whereClause.program = filters.selectedPrograms;
    }

    try {
      const response = await fetch(`${API_URL}/action/recruiter/getStudents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(whereClause),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setStudents(data.data);
      setShowStudents(true);
      setShowStudentDetail(false);
    } catch (error) {
      console.error('There was a problem with the get operation:', error);
    }
  };

  const handleCardClick = (student) => {
    setShowStudentDetail(true);
    setSelectedStudent(student);
    setIsBookmarksExpanded(false); // Hide bookmarks tab when viewing a student profile
  };

  const handleBookmarkClick = async (student) => {
    const recruiterID = user.uid; // Assuming user is logged in and user object is set
    const studentID = student.StudentID;

    const isBookmarked = bookmarkedStudents.some((s) => {
      if (!s || !s.StudentID) {
        console.warn("Invalid bookmarked student data", s);
        return false;
      }
      return s.StudentID === student.StudentID;
    });

    try {
      if (isBookmarked) {
        await fetch(`${API_URL}/action/recruiter/unbookmarkStudent`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recruiterID: recruiterID, studentID: studentID }),
        });
        setBookmarkedStudents((prev) => prev.filter((s) => s.StudentID !== student.StudentID));
      } else {
        await fetch(`${API_URL}/action/recruiter/bookmarkStudent`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recruiterID: recruiterID, studentID: studentID }),
        });
        setBookmarkedStudents((prev) => [...prev, student]);
      }
    } catch (error) {
      console.error('There was a problem with the bookmark operation:', error);
    }
  };

  const handleCloseDetail = () => {
    setShowStudentDetail(false);
    setSelectedStudent(null);
    setShowStudents(true);
  };

  const isBookmarked = (student) => bookmarkedStudents.some((s) => {
    if (!s || !s.StudentID) {
      console.warn("Invalid bookmarked student data", s);
      return false;
    }
    return s.StudentID === student.StudentID;
  });


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
              isApplication={false} // Default to false
              refreshData={() => {}} // Default to no-op function
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
