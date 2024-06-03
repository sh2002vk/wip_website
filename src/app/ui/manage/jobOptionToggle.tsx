import React, { useState } from 'react';

const JobOptionToggle: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => setIsToggled(!isToggled);

  return (
    <div
      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
        isToggled ? 'bg-orange-400' : 'bg-gray-300'
      }`}
      onClick={handleToggle}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
          isToggled ? 'translate-x-5' : ''
        }`}
      ></div>
    </div>
  );
};

export default JobOptionToggle;
