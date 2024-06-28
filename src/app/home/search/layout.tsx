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
      name: "John Doe",
      age: "22",
      institution: "University of Example",
      degree: "B.Sc Computer Science",
      lookingfor: [
        'Software Engineer',
        'Backend Developer',
        'Full Stack Developer'
      ],
      availability: "Summer 2024",
      experience: [
        { title: 'Software Developer', company: 'Google', startTime: 'Jan 2023', endTime: 'Jun 2024' },
        { title: 'Technical Assistant', company: 'Meta' },
      ],
      skills: ['Python', 'Java', 'C++']
    },
    {
      name: "Jane Smith",
      age: "23",
      institution: "Example State University",
      degree: "B.A. Mathematics",
      lookingfor: [
        'Data Analyst',
        'Business Analyst',
        'Research Assistant'
      ],
      availability: "Fall 2024",
      experience: [
        { title: 'Data Analyst', company: 'Microsoft' },
        { title: 'Research Assistant', company: 'Amazon' },
      ],
      skills: ['R', 'SQL', 'Tableau']
    },
    {
      name: "Alice Johnson",
      age: "21",
      institution: "Tech Institute",
      degree: "B.Sc Information Technology",
      lookingfor: [
        'IT Support Specialist',
        'Software Tester',
        'Web Developer'
      ],
      availability: "Winter 2024",
      experience: [
        { title: 'IT Support Intern', company: 'Dell' },
        { title: 'Software Tester', company: 'IBM' },
      ],
      skills: ['JavaScript', 'HTML', 'CSS']
    },
    {
      name: "Bob Brown",
      age: "24",
      institution: "Example University",
      degree: "M.Sc Data Science",
      lookingfor: [
        'Data Scientist',
        'Machine Learning Engineer',
        'Data Engineer'
      ],
      availability: "Spring 2024",
      experience: [
        { title: 'Data Scientist Intern', company: 'Netflix' },
        { title: 'Machine Learning Intern', company: 'Spotify' },
      ],
      skills: ['Python', 'TensorFlow', 'Keras']
    },
    {
      name: "Charlie Davis",
      age: "22",
      institution: "Example Technical College",
      degree: "B.Sc Computer Engineering",
      lookingfor: [
        'Embedded Systems Engineer',
        'Hardware Engineer',
        'Firmware Developer'
      ],
      availability: "Summer 2024",
      experience: [
        { title: 'Embedded Systems Intern', company: 'Intel' },
        { title: 'Hardware Engineer Intern', company: 'NVIDIA' },
      ],
      skills: ['C', 'Verilog', 'Assembly']
    },
    {
      name: "Eve Martinez",
      age: "23",
      institution: "University of Tech",
      degree: "B.Sc Software Engineering",
      lookingfor: [
        'Front-End Developer',
        'UI/UX Designer',
        'Product Manager'
      ],
      availability: "Spring 2024",
      experience: [
        { title: 'Front-End Developer', company: 'Airbnb' },
        { title: 'UI/UX Designer', company: 'Facebook' },
      ],
      skills: ['React', 'Adobe XD', 'CSS']
    },
    {
      name: "Frank Wilson",
      age: "24",
      institution: "Example Academy",
      degree: "B.Sc Cybersecurity",
      lookingfor: [
        'Security Analyst',
        'Network Security Specialist',
        'Penetration Tester'
      ],
      availability: "Winter 2024",
      experience: [
        { title: 'Security Analyst Intern', company: 'Cisco' },
        { title: 'Network Security Intern', company: 'Oracle' },
      ],
      skills: ['Linux', 'Networking', 'Python']
    }
    // Add more student objects here
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
      <div className="flex-grow flex flex-wrap gap-2 overflow-y-auto no-scrollbar" style={{ height: 'calc(100% - 1rem)' }}>
        {showStudents && !showStudentDetail && students.map((student, index) => (
          <StudentCard 
            key={index} 
            {...student} 
            onClick={() => handleCardClick(student)} 
            onBookmark={() => handleBookmarkClick(student)} 
            isBookmarked={isBookmarked(student)} 
          />
        ))}
        {showStudentDetail && selectedStudent && (
          <StudentProfileView 
            student={selectedStudent} 
            onClose={handleCloseDetail} 
            onBookmark={() => handleBookmarkClick(selectedStudent)}
            isBookmarked={isBookmarked(selectedStudent)}
          />
        )}
      </div>
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