import React, {useState} from 'react';

const Drafts = ({user}) => {
  const drafts = [
    {
      icon: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg', 
      title: 'Product Manager',
      dueDate: 1,
      draftProgress: 80,
      competition: 5,
    },
    {
      icon: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg', 
      title: 'Data Scientist',
      dueDate: 2,
      draftProgress: 50,
      competition: 7,
    },
    {
      icon: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg',
      title: 'Business Intelligence',
      dueDate: 12,
      draftProgress: 25,
      competition: 17,
    },
    {
      icon: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg', 
      title: 'Product Specialist',
      dueDate: 1,
      draftProgress: 32,
      competition: 12,
    },
  ];

  const [draftInsights, setDraftInsights] = useState([]);
  const fetchJobCompetition = async (jobID) => {
    try {
      const response = await fetch(`http://localhost:4000/action/student/getCompetition?jobID=${jobID}`);
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
  const fetchDraftInsights = async (user) => {
    if (!user) return;

    try {
      const rows = [];
      const response = await fetch(`http://localhost:4000/action/student/getApplicationInsights?studentID=${user.uid}`);
      const data = await response.json();
      const filteredData = data.filter(application => application.Status === 'DRAFT');
      if (!response.ok) {
        console.log("Error in retrieving applications")
      }
      for (const application of filteredData) {
        const item = {};
        item.role = application.jobModel.Role;
        item.dateClosed = application.jobModel.DateClosed;
        const requiredDocLength = application.jobModel.RequiredDocuments ? Object.keys(application.jobModel.RequiredDocuments).length : 0;
        const submittedDocLength = application.SubmittedDocuments ? Object.keys(application.SubmittedDocuments).length : 0;
        item.percentage = requiredDocLength > 0 ? (submittedDocLength / requiredDocLength) * 100 : 0;
        const jobID = application.jobModel.JobID;
        const competition = await fetchJobCompetition(jobID);
        item.competition = competition.competition;
        rows.push(item);
      }
      setDraftInsights(rows);
      console.log("ROWS", rows);
    } catch (error) {
      console.log("Error fetching applicationInsights", error)
    }
  }

  const daysUntilClosed = (dateClosed) => {
    const today = new Date();
    const closedDate = new Date(dateClosed);
    const differenceInTime = closedDate - today;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
    return differenceInDays;
  }

  useState(() => {
    fetchDraftInsights(user);
  }, [user])

  return (
    <div className="h-full overflow-y-auto p-5">
      <div className="sticky top-0 bg-[#F5f5f5] z-10">
        <h1 className="text-xl font-light mb-2">
          Drafts <span className="bg-gray-200 text-sm font-medium py-1 px-2 rounded-full ml-2">{draftInsights.length}</span>
        </h1>
        <div className="grid grid-cols-12 text-gray-500 text-xs mb-2">
          <span className="col-span-5"></span>
          <span className="col-span-1">Days until closed</span>
          <span className="col-span-4 pl-6">Progress</span>
          <span className="col-span-2">Competition</span>
        </div>
        <hr className="border-gray-300 mb-2" />
      </div>
      <div className="pt-0">
        {draftInsights.map((draft, index) => (
          <div key={index} className="grid grid-cols-12 items-center py-2 border-b text-sm">
            <div className="col-span-5 flex items-center space-x-4">
              {/*<img src={draft.icon} alt={draft.title} className="w-8 h-8 rounded-full" />*/} {/*TODO add back in profile photos*/}
              <span className={`font-light ${draft.percentage === 0 ? 'text-gray-400' : 'text-black'}`}>{draft.role}</span>
            </div>
            <div className="col-span-1 pl-3">{daysUntilClosed(draft.dateClosed)}</div>
            <div className="col-span-4 pl-6">
              <div className="flex items-center">
                <div className="w-20 bg-orange-200 rounded-full h-2 mr-2">
                  <div className="bg-orange-400 h-2 rounded-full" style={{ width: `${draft.percentage ?? 0}%` }}></div>
                </div>
                <span>{draft.percentage}%</span>
              </div>
            </div>
            <div className="col-span-2 text-center">{draft.competition}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drafts;
