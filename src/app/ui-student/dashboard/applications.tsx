import React, {useEffect, useState} from 'react';
const API_URL = process.env.API_URL

type ApplicationItem = {
  role: string;
  dateClosed: string;
  percentage: number;
  competition: number;
  jobStatus: string;
  appStatus: string;
};


const Applications = ({user}) => {
  const applicationData = [
    {
      icon: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg', 
      title: 'Product Manager',
      daysSubmitted: 1,
      reviewProgress: 80,
      competition: 5,
      status: 'open',
    },
    {
      icon: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg', 
      title: 'Data Scientist',
      daysSubmitted: 2,
      reviewProgress: 0,
      competition: 7,
      status: 'open',
    },
    {
      icon: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg',
      title: 'Business Intelligence',
      daysSubmitted: 12,
      reviewProgress: null,
      competition: 17,
      status: 'closed',
    },
    {
      icon: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg', 
      title: 'Product Specialist',
      daysSubmitted: 1,
      reviewProgress: null,
      competition: 12,
      status: 'closed',
    },
  ];

  const [applicationInsights, setApplicationInsights] = useState([]);

  const fetchJobCompetition = async (jobID) => {
    try {
      const response = await fetch(`${API_URL}/action/student/getCompetition?jobID=${jobID}`);
      const competition = await response.json();
      if (!response.ok) {
        console.log("Error in fetching competition numbers");
        return 0;
      }
      return competition;
    } catch (error) {
      console.log("error fetching job competition");
    }
  }
  const fetchApplicationInsights = async () => {
    if (!user) return;

    try {
      const rows: ApplicationItem[] = [];
      const response = await fetch(`${API_URL}/action/student/getApplicationInsights?studentID=${user.uid}`);
      const data = await response.json();
      const filteredData = data.filter(application => application.Status !== 'DRAFT');
      if (!response.ok) {
        console.log("Error in retrieving applications")
      }
      for (const application of filteredData) {
        const item: ApplicationItem = {
          role: application.jobModel.Role,
          dateClosed: application.jobModel.DateClosed,
          percentage: getPercentage(application.Status),
          competition: 0, // Default value, to be updated
          jobStatus: application.jobModel.Status,
          appStatus: application.Status,
        };
        const jobID = application.jobModel.JobID;
        const competition = await fetchJobCompetition(jobID);
        item.competition = competition.competition;
        rows.push(item);
      }
      setApplicationInsights(rows);
      // console.log("ROWS", rows);
    } catch (error) {
      console.log("Error fetching applicationInsights")
    }
  }

  const daysUntilClosed = (dateClosed: string) => {
    const today = new Date().getTime(); // Current time in milliseconds
    const closedDate = new Date(dateClosed).getTime(); // Closed date in milliseconds
    const differenceInTime = closedDate - today;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    return differenceInDays;
  };
  

  useEffect(() => {
    fetchApplicationInsights();
  }, [user, fetchApplicationInsights])

  const statusMapping = {
    "APPLIED": "Applied",
    "REVIEWED": "Reviewed",
    "INTERVIEW": "Interviewing",
    "ACCEPT": "Accepted",
    "REJECT": "Rejected",
  }

  const getPercentage = (status) => {
    switch (status) {
      case "APPLIED":
        return 25;
      case "REVIEWED":
        return 50;
      case "INTERVIEW":
        return 75;
      case "ACCEPT":
        return 100;
      default:
        return 0;
    }
  }

  return (
    <div className="h-full overflow-y-auto p-5">
      <div className="sticky top-0 bg-[#F5f5f5] z-10">
      <h1 className=" text-xl font-light mb-2">
          Your Applications <span className="bg-gray-200 text-sm font-medium py-1 px-2 rounded-full ml-2">{applicationInsights.length}</span>
        </h1>
        <div className="grid grid-cols-12 text-gray-500 text-sm mb-2">
          <span className="col-span-5"></span>
          <span className="col-span-2">Days left</span>
          <span className="col-span-3">Progress</span>
          <span className="col-span-2">Competition</span>
        </div>
        <hr className="border-gray-300 mb-2" />
      </div>
      <div className=" pt-0">
        {applicationInsights.map((application, index) => (
          <div key={index} className="grid grid-cols-12 items-center py-2 border-b">
            <div className="col-span-5 flex items-center space-x-4">
              {/*<img src={application.icon} alt={application.title} className="w-8 h-8 rounded-full" />*/} {/*//TODO company icons here*/}
              <span className={`font-light ${application.status === 'closed' ? 'text-gray-400' : 'text-black'}`}>{application.role}</span>
            </div>
            <div className="col-span-2 pl-3">{daysUntilClosed(application.dateClosed)}</div>
            <div className="col-span-3">
              {application.jobStatus !== 'CLOSED' ? (
                  <div className="flex flex-col items-start">
                    <div className="w-2/3 bg-orange-200 rounded-full h-2 mb-2">
                      <div className="bg-orange-400 h-2 rounded-full" style={{ width: `${application.percentage}%` }}></div>
                    </div>
                    <span className="text-sm">{statusMapping[application.appStatus]}</span>
                  </div>
              ) : (
                  <span className="text-gray-400">Closed</span>
              )}
            </div>
            <div className="col-span-2 text-center ">{application.competition}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applications;
