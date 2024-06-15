import React from 'react';

const applications = () => {
  const data = [
    {
      name: 'Jake',
      university: 'University of British Columbia',
      role: 'Software Dev',
      time: '22m'
    },
    {
      name: 'Max',
      university: 'University of Toronto',
      role: 'Data Scientist',
      time: '50m'
    },
    {
      name: 'Melissa',
      university: 'University of Waterloo',
      role: 'Data Scientist',
      time: '2h'
    },
    {
        name: 'Melissa',
        university: 'University of Waterloo',
        role: 'Data Scientist',
        time: '2h'
      }
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <h1 className="text-xl font-semibold">New Applications <span className="bg-gray-200 text-sm font-medium py-1 px-2 rounded-full ml-2">8</span></h1>
        <div className="mt-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center">
                <div className="bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center text-lg font-bold text-gray-500">{item.name.charAt(0)}</div>
                <div className="ml-4">
                  <p className="text-md font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.university}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="bg-gray-200 text-sm font-light py-1 px-2 rounded-full">{item.role}</span>
                <span className="ml-4 text-gray-400 text-sm">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default applications;
