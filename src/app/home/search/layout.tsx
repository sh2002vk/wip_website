'use client'
import React from 'react';
import Parameters from '@/app/ui/search/parameters';
import SideBar from "@/app/ui/home/sidebar"; 
import StudentCard from "@/app/ui/search/studentCard"
import "../no-scrollbar.css"

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
        { title: 'Software Developer', company: 'Google' },
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

  const [showStudents, setShowStudents] = React.useState(false);

  const handleSearch = (filters: { availability: number; preference: string; degreeLevel: string; date: Dayjs | null; keyword: string }) => {
    // Now you have the filter states here and can log or use them as needed
    console.log("Filters to send to API: ", filters);
    setShowStudents(true);
    // Here, you could also make an API call using the filters
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-64 flex-none h-screen overflow-auto">
        {/* Pass the handleSearch as a prop */}
        <Parameters onSearch={handleSearch} />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto no-scrollbar" style={{ height: 'calc(100% - 1rem)' }}>
        {showStudents && students.map((student, index) => (
          <StudentCard key={index} {...student} />
        ))}
      </div>
    </div>
  );
  
};

export default SearchLayout;
