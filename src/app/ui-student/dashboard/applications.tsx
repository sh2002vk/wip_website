import React from 'react';

const applications = () => {
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

  return (
    <div className="h-full overflow-y-auto p-5">
      <div className="sticky top-0 bg-[#F5f5f5] z-10">
      <h1 className=" text-xl font-light mb-2">
          Your Applications <span className="bg-gray-200 text-sm font-medium py-1 px-2 rounded-full ml-2">{applicationData.length}</span>
        </h1>
        <div className="grid grid-cols-12 text-gray-500 text-sm mb-2">
          <span className="col-span-5"></span>
          <span className="col-span-2">Days</span>
          <span className="col-span-3">Progress</span>
          <span className="col-span-2">Competition</span>
        </div>
        <hr className="border-gray-300 mb-2" />
      </div>
      <div className=" pt-0">
        {applicationData.map((application, index) => (
          <div key={index} className="grid grid-cols-12 items-center py-2 border-b">
            <div className="col-span-5 flex items-center space-x-4">
              <img src={application.icon} alt={application.title} className="w-8 h-8 rounded-full" />
              <span className={`font-light ${application.status === 'closed' ? 'text-gray-400' : 'text-black'}`}>{application.title}</span>
            </div>
            <div className="col-span-2 pl-3">{application.daysSubmitted}</div>
            <div className="col-span-3">
              {application.status === 'open' ? (
                <div className="flex items-center">
                  <div className="w-20 bg-orange-200 rounded-full h-2 mr-2">
                    <div className="bg-orange-400 h-2 rounded-full" style={{ width: `${application.reviewProgress}%` }}></div>
                  </div>
                  <span>{application.reviewProgress}%</span>
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

export default applications;
