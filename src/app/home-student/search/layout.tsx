'use client';
import React, { useState } from 'react';
import Parameters from '@/app/ui-student/search/parameters';
import JobCard from '@/app/ui-student/search/JobCard';
import JobProfileView from '@/app/ui-student/search/JobProfileView';
import Bookmarks from '@/app/ui-student/search/bookmarks';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../firebase';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const SearchLayout = ({ children, title }: LayoutProps) => {
  const [user, setUser] = useState(null);
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
      } else {
        setUser(null);
      }
      console.log("SEARCH", user);
    });

    return () => unsubscribe();
  }, []);

  const fetchBookmarkedJobs = async (studentID) => {
    try {
      // console.log('fetching bookmarks');
      const response = await fetch(`http://localhost:4000/action/student/getBookmarkedJobs?studentID=${studentID}`, {
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

  const handleSearch = async (filters) => {
    // console.log("Filters to send to API: ", filters);
    const availabilityMapping = {
      "4 Months": "4",
      "8 Months": "8",
      "1+ Year": "12"
    };

    const worktypeMapping = {
      "In-Person": "INPERSON",
      "Hybrid": "HYBRID",
      "Remote": "REMOTE"
    }

    let whereClause = {};

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
      const response = await fetch('http://localhost:4000/action/student/getJobs', {
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
      setJobs(data.data);
      setShowJobs(true);
      setShowJobDetail(false);
    } catch (error) {
      console.error('There was a problem with the get operation:', error);
    }
  };

  const handleCardClick = (job: Job) => {
    setShowJobDetail(true);
    setSelectedJob(job);
    setIsBookmarksExpanded(false); // Hide bookmarks tab when viewing a job profile
  };

  const handleBookmarkClick = async (job: Job) => {
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
        await fetch('http://localhost:4000/action/student/unbookmarkJob', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ JobID: job.JobID, StudentID: studentID }),
        });
        setBookmarkedJobs((prev) => prev.filter((j) => j.JobID !== job.JobID));
      } else {
        // console.log('creating bookmark for:', recruiterID);
        await fetch('http://localhost:4000/action/student/bookmarkJob', {
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
