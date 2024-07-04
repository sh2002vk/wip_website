import React from 'react';

const whatsNew = () => {
  const updates = [
    {
      time: '22m',
      icon: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg',
      title: 'Software Engineer',
      description: 'This job showed interest in you',
      action: 'view post',
      link: '#',
    },
    {
      time: '2h',
      icon: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg',
      title: 'Cybersecurity Intern',
      description: 'Your application has been reviewed',
      action: 'view in manage',
      link: '#',
    },
    {
      time: '1d',
      icon: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg',
      title: 'Security Analyst',
      description: 'Post closes in 2 days',
      action: 'complete application',
      link: '#',
    },
    {
      time: '1d',
      icon: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg',
      title: 'Product Manager',
      description: 'Post closed - new quota allocated',
      action: 'view other postings',
      link: '#',
    },
  ];

  return (
    <div className="h-full overflow-y-auto p-5">
      <div className="sticky top-0 bg-[#F5f5f5] z-10">
        <h1 className="text-xl font-light mb-2">
          What's New <span className="bg-gray-200 text-sm font-medium py-1 px-2 rounded-full ml-2">{updates.length}</span>
        </h1>
        <div className="grid grid-cols-12 text-gray-500 text-sm mb-2">
          <span className="col-span-1"></span>
          <span className="col-span-1"></span>
          <span className="col-span-3"></span>
          <span className="col-span-4 ">Update</span>
          <span className="col-span-3">Action</span>
        </div>
        <hr className="border-gray-300" />
      </div>
      <div className="pt-2">
        {updates.map((update, index) => (
          <div key={index} className="grid grid-cols-12 items-center py-1">
            <span className="col-span-1 text-gray-500">{update.time}</span>
            <img src={update.icon} alt={update.title} className="col-span-1 w-7 h-7 rounded-full" />
            <div className="col-span-3">
              <p className="text-sm font-light">{update.title}</p>
            </div>
            <div className="col-span-4">
              <p className="text-sm text-gray-500">{update.description}</p>
            </div>
            <a href={update.link} className="col-span-3 text-orange-400 hover:underline">{update.action}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default whatsNew;
