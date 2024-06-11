'use client'
import React from 'react';
import Parameters from '@/app/ui/search/Parameters';
import SideBar from "@/app/ui/home/sidebar"; 
import StudentCard from "@/app/ui/search/StudentCard"

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
      availability: "Summer 2024",
      experience: [
        { title: 'Software Developer', company: 'Google' },
        { title: 'Technical Assistant', company: 'Meta' },
      ],
      skills: ['Python', 'Java', 'C++']
    },
    {
      name: "John Doe",
      age: "22",
      institution: "University of Example",
      degree: "B.Sc Computer Science",
      availability: "Summer 2024",
      experience: [
        { title: 'Software Developer', company: 'Google' },
        { title: 'Technical Assistant', company: 'Meta' },
      ],
      skills: ['Python', 'Java', 'C++']
    },
    {
      name: "John Doe",
      age: "22",
      institution: "University of Example",
      degree: "B.Sc Computer Science",
      availability: "Summer 2024",
      experience: [
        { title: 'Software Developer', company: 'Google' },
        { title: 'Technical Assistant', company: 'Meta' },
      ],
      skills: ['Python', 'Java', 'C++']
    },
    {
      name: "John Doe",
      age: "22",
      institution: "University of Example",
      degree: "B.Sc Computer Science",
      availability: "Summer 2024",
      experience: [
        { title: 'Software Developer', company: 'Google' },
        { title: 'Technical Assistant', company: 'Meta' },
      ],
      skills: ['Python', 'Java', 'C++']
    },
    {
      name: "John Doe",
      age: "22",
      institution: "University of Example",
      degree: "B.Sc Computer Science",
      availability: "Summer 2024",
      experience: [
        { title: 'Software Developer', company: 'Google' },
        { title: 'Technical Assistant', company: 'Meta' },
      ],
      skills: ['Python', 'Java', 'C++']
    },
    {
      name: "John Doe",
      age: "22",
      institution: "University of Example",
      degree: "B.Sc Computer Science",
      availability: "Summer 2024",
      experience: [
        { title: 'Software Developer', company: 'Google' },
        { title: 'Technical Assistant', company: 'Meta' },
      ],
      skills: ['Python', 'Java', 'C++']
    },
    {
      name: "John Doe",
      age: "22",
      institution: "University of Example",
      degree: "B.Sc Computer Science",
      availability: "Summer 2024",
      experience: [
        { title: 'Software Developer', company: 'Google' },
        { title: 'Technical Assistant', company: 'Meta' },
      ],
      skills: ['Python', 'Java', 'C++']
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
      <div className="w-full md:w-3/4 p-4 flex flex-no-wrap overflow-y-auto grid grid-rows-2 grid-flow-col no-scrollbar" style={{ height: 'calc(100% - 1rem)' }}>
        {showStudents && students.map((student, index) => (
          <StudentCard key={index} {...student} />
        ))}
      </div>
    </div>
  );
  
};

export default SearchLayout;
