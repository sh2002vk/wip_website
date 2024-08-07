'use client';
import React, { useState } from 'react';
import Parameters from '@/app/ui-student/search/parameters';
import JobCard from '@/app/ui-student/search/JobCard';
import JobProfileView from '@/app/ui-student/search/JobProfileView';
import Bookmarks from '@/app/ui-student/search/bookmarks';

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from '../../../firebase';

const API_URL = process.env.API_URL

type AuthUser = User | null;

type LayoutProps = {
  children: React.ReactNode;
  // title?: string;
};

type Filters = {
  workingTypes?: WorkingType[];
  availabilities?: Availability[];
  location?: string;
  selectedPrograms?: string[];
};

// Define a type for the whereClause
type WhereClause = {
  environment?: string[];
  duration?: string[];
  location?: string;
  industry?: string[];
};

type WorkingType = "In-Person" | "Hybrid" | "Remote";
type Availability = "4 Months" | "8 Months" | "1+ Year";

const SearchLayout = ({ children }: LayoutProps) => {
  const [user, setUser] = useState<AuthUser>(null);
  const [jobs, setJobs] = useState([]);
  const [showJobs, setShowJobs] = useState(false);
  const [showJobDetail, setShowJobDetail] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [isBookmarksExpanded, setIsBookmarksExpanded] = useState(false);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        fetchBookmarkedJobs(user.uid);
        handleSearch({});
      } else {
        setUser(null);
      }
      // console.log("SEARCH", user);
    });

    return () => unsubscribe();
  }, []);

  const fetchBookmarkedJobs = async (studentID: string) => {
    try {
      // console.log('fetching bookmarks');
      const response = await fetch(`${API_URL}/action/student/getBookmarkedJobs?studentID=${studentID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // console.log('bookmarks found: ', data.data);
      setBookmarkedJobs(data.data);
    } catch (error) {
      console.error('There was a problem with the get operation:', error);
    }
  };

  const handleSearch = async (filters: Filters) => {
    // console.log("Filters to send to API: ", filters);
    const availabilityMapping: Record<Availability, string> = {
      "4 Months": "4",
      "8 Months": "8",
      "1+ Year": "12"
    };

    const worktypeMapping: Record<WorkingType, string> = {
      "In-Person": "INPERSON",
      "Hybrid": "HYBRID",
      "Remote": "REMOTE"
    }

    let whereClause: WhereClause = {};

    if (filters.workingTypes) {
      whereClause.environment = filters.workingTypes.map((type) => worktypeMapping[type]);
    }

    if (filters.availabilities) {
      whereClause.duration = filters.availabilities.map((availability) => availabilityMapping[availability]);
    }

    if (filters.location) {
      whereClause.location = filters.location;
    }

    if (filters.selectedPrograms) {
      whereClause.industry = filters.selectedPrograms;
    }

    // console.log('where clause: ', whereClause);

    try {
      const response = await fetch(`${API_URL}/action/student/getJobs`, {
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
      const listedJobs = data.data.filter((job) => job.Status !== "DRAFT");
      setJobs(listedJobs);
      setShowJobs(true);
      setShowJobDetail(false);
    } catch (error) {
      console.error('There was a problem with the get operation:', error);
    }
  };

  const handleCardClick = (job: any) => {
    setShowJobDetail(true);
    setSelectedJob(job);
    setIsBookmarksExpanded(false); // Hide bookmarks tab when viewing a job profile
  };

  const handleBookmarkClick = async (job: any) => {
    let studentID = user.uid;
    let recruiterID = job.RecruiterID;

    const isBookmarked = bookmarkedJobs.some((j) => {
      if (!j || !j.JobID) {
        console.warn("Invalid bookmarked student data", j);
        return false;
      }
      return j.JobID === job.JobID;
    });

    // console.log('is  bookmarked?: ', isBookmarked);

    try {
      if (isBookmarked) {
        // console.log('deleting bookmark for: ', recruiterID);
        await fetch(`${API_URL}/action/student/unbookmarkJob`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ JobID: job.JobID, StudentID: studentID }),
        });
        setBookmarkedJobs((prev) => prev.filter((j) => j.JobID !== job.JobID));
      } else {
        // console.log('creating bookmark for:', recruiterID);
        await fetch(`${API_URL}/action/student/bookmarkJob`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ RecruiterID: recruiterID, StudentID: studentID, JobID: job.JobID }),
        });
        setBookmarkedJobs((prev) => [...prev, job]);
        // console.log('bookmarked jobs are: ', bookmarkedJobs);
      }
    } catch (error) {
      console.error('There was a problem with the bookmark operation:', error);
    }
  };

  const handleCloseDetail = () => {
    setShowJobDetail(false);
    setSelectedJob(null);
    setShowJobs(true);
  };

  // const isBookmarked = (job: Job) => bookmarkedJobs.some(j => j.title === job.title);
  const isBookmarked = (job) => bookmarkedJobs.some((j) => {
    if (!j || !j.JobID) {
      console.warn("Invalid bookmarked job data", j);
      return false;
    }
    return j.JobID === job.JobID;
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
            user={user}
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
