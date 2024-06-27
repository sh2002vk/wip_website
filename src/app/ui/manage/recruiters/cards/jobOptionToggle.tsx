import React, { useState } from 'react';

interface JobOptionToggleProps {
  isSelected: boolean;
  onToggle: () => void;
}
const JobOptionToggle: React.FC<JobOptionToggleProps> = ({isSelected, onToggle}) => {
  const [isToggled, setIsToggled] = useState(false);

  // const handleToggle = () => setIsToggled(!isToggled);

  return (
    <div
      className={`w-12 h-6 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${
        isSelected ? 'bg-orange-400' : 'bg-gray-300'
      }`}
      onClick={onToggle}
    >
      <div
        className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out ${
          isSelected ? 'translate-x-5' : ''
        }`}
      ></div>
    </div>
  );
};

export default JobOptionToggle;
