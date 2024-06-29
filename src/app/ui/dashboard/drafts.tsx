import React from 'react';

const Drafts = () => {
  const data = [
    { role: 'Operations Intern', progress: 90 },
    { role: 'Data Analyst', progress: 60 },
    { role: 'Product Manager', progress: 60 },
    { role: 'Project Manager', progress: 20 },
    { role: 'Logistics Coordinator', progress: 10 },
    { role: 'Logistics Coordinator', progress: 10 },
    { role: 'Logistics Coordinator', progress: 10 }
  ];

  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <div className="p-4 sticky top-0 bg-[#F5f5f5] z-10">
        <h1 className="text-xl font-semibold">
          Draft Postings <span className="bg-gray-200 text-sm font-medium py-1 px-2 rounded-full ml-2">{data.length}</span>
        </h1>
        <div className="mt-2 text-right text-sm text-gray-500">Progress</div>
      </div>
      <div className="p-4 pt-0">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between py-2 border-b">
            <p className="text-md font-light">{item.role}</p>
            <div className="flex items-center">
              <div className="relative w-32 h-3 bg-orange-200 rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-orange-400 rounded-full"
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              <span className="ml-4 text-gray-600 text-sm">{item.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drafts;
