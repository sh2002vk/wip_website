// CollapsibleCard.tsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

interface CollapsibleCardProps {
  title: string;
  content: string;
}

const CollapsibleCard: React.FC<CollapsibleCardProps> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="bg-white mb-4 flex justify-between">
      <div className="w-2/12 flex items-start cursor-pointer text-gray-400" onClick={toggleOpen}>
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faCaretRight}
            className={`mr-2 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
          />
          <p className="text-lg text-black overflow-x-hidden">{title}</p>
        </div>
      </div>
      <div className={`w-10/12 transition-max-height duration-1000 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="mt-2 border-l border-gray-800 pl-4">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default CollapsibleCard;
