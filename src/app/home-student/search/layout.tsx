'use client';
import React, { useState } from 'react';
import Parameters from '@/app/ui-student/search/parameters';
import JobCard from '@/app/ui-student/search/JobCard';
import JobProfileView from '@/app/ui-student/search/JobProfileView';
import Bookmarks from '@/app/ui-student/search/bookmarks';

type Job = {
  title: string;
  role: string;
  description: string;
  pay: string;
  dates: string;
  location: string;
  recruiter: string;
  companyName: string;
  workMode: 'In-Person' | 'Remote' | 'Hybrid';
  citizenshipRequirement: string;
  applicationDeadline: string;
  duration: '4 months' | '8 months' | '1 year';
  resume: boolean;
  coverLetter: boolean;
  transcript: boolean;
};

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const SearchLayout = ({ children, title }: LayoutProps) => {
  const jobs: Job[] = [
    {
      title: "Software Engineer",
      role: "Full Stack Developer",
      description: "Develop and maintain web applications.",
      pay: "$70,000 - $90,000",
      dates: "Summer 2024",
      location: "San Francisco, CA",
      recruiter: "Tech Solutions Inc.",
      companyName: "Tech Solutions Inc.",
      workMode: "Hybrid",
      citizenshipRequirement: "N/A",
      applicationDeadline: "2024-05-30",
      duration: "4 months",
      resume: false,
      coverLetter: true,
      transcript: true
    },
    {
      title: "Data Analyst",
      role: "Business Analyst",
      description: "Analyze data and generate insights.",
      pay: "$60,000 - $80,000",
      dates: "Fall 2024",
      location: "New York, NY",
      recruiter: "Data Insights Co.",
      companyName: "Data Insights Co.",
      workMode: "Remote",
      citizenshipRequirement: "N/A",
      applicationDeadline: "2024-06-15",
      duration: "8 months",
      resume: true,
      coverLetter: false,
      transcript: true
    },
    {
      title: "IT Support Specialist",
      role: "Support Specialist",
      description: "Provide IT support and troubleshooting.",
      pay: "$50,000 - $70,000",
      dates: "Winter 2024",
      location: "Austin, TX",
      recruiter: "IT Solutions Pro",
      companyName: "IT Solutions Pro",
      workMode: "In-Person",
      citizenshipRequirement: "N/A",
      applicationDeadline: "2024-07-01",
      duration: "1 year",
      resume: false,
      coverLetter: true,
      transcript: true
    },
    {
      title: "Machine Learning Engineer",
      role: "ML Engineer",
      description: "Develop machine learning models and algorithms.",
      pay: "$90,000 - $110,000",
      dates: "Spring 2024",
      location: "Seattle, WA",
      recruiter: "ML Experts Inc.",
      companyName: "ML Experts Inc.",
      workMode: "Hybrid",
      citizenshipRequirement: "N/A",
      applicationDeadline: "2024-08-20",
      duration: "4 months",
      resume: true,
      coverLetter: true,
      transcript: true
    },
    {
      title: "Embedded Systems Engineer",
      role: "Hardware Engineer",
      description: "Design and develop embedded systems.",
      pay: "$80,000 - $100,000",
      dates: "Summer 2024",
      location: "San Jose, CA",
      recruiter: "Embedded Solutions Ltd.",
      companyName: "Embedded Solutions Ltd.",
      workMode: "In-Person",
      citizenshipRequirement: "N/A",
      applicationDeadline: "2024-09-10",
      duration: "8 months",
      resume: true,
      coverLetter: true,
      transcript: true
    },
    {
      title: "Front-End Developer",
      role: "UI Developer",
      description: "Design and implement user interfaces.",
      pay: "$60,000 - $80,000",
      dates: "Spring 2024",
      location: "Chicago, IL",
      recruiter: "UI Innovations Inc.",
      companyName: "UI Innovations Inc.",
      workMode: "Remote",
      citizenshipRequirement: "N/A",
      applicationDeadline: "2024-10-05",
      duration: "1 year",
      resume: true,
      coverLetter: true,
      transcript: true
    }
  ];

  const [showJobs, setShowJobs] = useState(false);
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState<Job[]>([]);
  const [isBookmarksExpanded, setIsBookmarksExpanded] = useState(false);

  const handleSearch = (filters: { availability: number; preference: string; degreeLevel: string; date: Dayjs | null; keyword: string }) => {
    console.log("Filters to send to API: ", filters);
    setShowJobs(true);
    setShowJobDetail(false);
    // Here, you could also make an API call using the filters
  };

  const handleCardClick = (job: Job) => {
    setShowJobDetail(true);
    setSelectedJob(job);
    setIsBookmarksExpanded(false); // Hide bookmarks tab when viewing a job profile
  };

  const handleBookmarkClick = (job: Job) => {
    setBookmarkedJobs(prev => {
      if (prev.some(bJob => bJob.title === job.title)) {
        return prev.filter(bJob => bJob.title !== job.title);
      }
      return [...prev, job];
    });
  };

  const handleCloseDetail = () => {
    setShowJobDetail(false);
    setSelectedJob(null);
    setShowJobs(true);
  };

  const isBookmarked = (job: Job) => bookmarkedJobs.some(j => j.title === job.title);

  const toggleBookmarksTab = () => {
    setIsBookmarksExpanded(!isBookmarksExpanded);
  };

  const closeBookmarksTab = () => {
    setIsBookmarksExpanded(false);
  };

  return (
    <div className="flex h-screen relative">
      <div className={`w-full md:w-64 flex-none h-screen overflow-auto ${showJobDetail ? 'hidden' : ''}`}>
        <Parameters onSearch={handleSearch} />
      </div>
      <div className="flex-grow flex flex-wrap gap-1 overflow-y-auto no-scrollbar" style={{ height: 'calc(100% - 1rem)' }}>
        {showJobs && !showJobDetail && jobs.map((job, index) => (
          <JobCard 
            key={index} 
            {...job} 
            onClick={() => handleCardClick(job)} 
            onBookmark={() => handleBookmarkClick(job)} 
            isBookmarked={isBookmarked(job)} 
          />
        ))}
        {showJobDetail && selectedJob && (
          <JobProfileView 
            job={selectedJob} 
            onClose={handleCloseDetail} 
            onBookmark={() => handleBookmarkClick(selectedJob)}
            isBookmarked={isBookmarked(selectedJob)}
          />
        )}
      </div>
      {!showJobDetail && (
        <div>
          <Bookmarks 
            jobs={bookmarkedJobs} 
            onJobClick={handleCardClick} 
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
