'use client'
import React, { useState, useEffect } from 'react';
import "./style.css"
import StudentProfileView from "@/app/ui/search/studentProfileView";
const JobDashboard = () => {
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
        }
    ]

    const [selectedStudent, setSelectedStudent] = useState(null);
    const [showStudentDetail, setShowStudentDetail] = useState(false);
    const [bookmarkedStudents, setBookmarkedStudents] = useState([]);

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
        <>
            <div>
                {!showStudentDetail && students.map((student) => (
                    <span onClick={() => handleCardClick(student)} >{student.name}</span>
                ))}
            </div>
            {showStudentDetail && selectedStudent && (
                <StudentProfileView
                    student={selectedStudent}
                    onClose={handleCloseDetail}
                    onBookmark={() => handleBookmarkClick(selectedStudent)}
                    isBookmarked={isBookmarked(selectedStudent)}
                />
            )}
        </>
    );
};
export default JobDashboard;