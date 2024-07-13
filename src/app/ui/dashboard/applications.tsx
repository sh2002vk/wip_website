import React, { useState, useEffect } from 'react';

const applications = ({user}) => {
  const data = [
    {
      name: 'Jake',
      university: 'University of British Columbia',
      role: 'Software Dev',
      time: '22m',
      JobID: 1
    },
    {
      name: 'Max',
      university: 'University of Toronto',
      role: 'Data Scientist',
      time: '50m',
      JobID: 1
    },
    {
      name: 'Melissa',
      university: 'University of Waterloo',
      role: 'Data Scientist',
      time: '2h',
      JobID: 1,
    },
    {
      name: 'Gloria',
      university: 'Hardward University',
      role: 'Data Scientist',
      time: '2h',
      JobID: 2,
    }
  ];

  const [applicantList, setApplicantList] = useState([]);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`http://localhost:4000/action/recruiter/getNewApplications?recruiterID=${user.uid}`);
      const applicants = await response.json();
      console.log(applicants);
      setApplicantList(applicants);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchApplications();
  }, [user.uid])

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 sticky top-0 bg-[#F5f5f5] z-10">
        <h1 className="text-xl font-semibold ">New Applications <span className="bg-gray-200 text-sm font-medium py-1 px-2 rounded-full ml-2">{applicantList.length}</span></h1>
      </div>
      <div className="p-4 pt-0">
        {applicantList.map((applicant, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center">
              <div className="bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold text-gray-500">{applicant.studentModel.FirstName.charAt(0)}</div>
              <div className="ml-4">
                <p className="text-md font-medium">{applicant.studentModel.FirstName}</p>
                <p className="text-sm text-gray-500">{applicant.studentModel.School}</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="bg-gray-200 text-sm font-light py-1 px-2 rounded-full">{applicant.jobModel.Role}</span>
              <span className="ml-4 text-gray-400 text-sm">{applicant.ApplicationTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default applications;
