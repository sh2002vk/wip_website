import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Bookmarks = ({ jobs, onJobClick, onRemoveClick, isExpanded, toggleExpand, closeExpand }) => {
  return (
    <div 
      className={`fixed top-0 right-0 h-full p-2 transition-all duration-300 ${isExpanded ? 'w-64 bg-white' : 'w-10 bg-white'}`}
      style={{ zIndex: 1000 }}
    >
      <div onClick={toggleExpand} className="cursor-pointer">
        <FontAwesomeIcon
          icon={solidBookmark}
          size="2x"
          className="text-orange-300"
        />
      </div>
      {isExpanded && (
        <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 w-full">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-bold">Bookmarks</h3>
            <FontAwesomeIcon
              icon={faTimes}
              size="lg"
              className="cursor-pointer"
              onClick={closeExpand}
            />
          </div>
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <div key={index} className="border-b border-gray-200 py-2 cursor-pointer flex justify-between items-center">
                <div onClick={() => onJobClick(job)}>
                  <div className="font-semibold">{job.Role}</div>
                  <div className="text-sm text-gray-600">{job.Industry}</div>
                  <div className="text-sm text-gray-600">{job.Location}</div>
                </div>
                <FontAwesomeIcon
                  icon={faTimes}
                  size="lg"
                  className="text-gray-500 cursor-pointer ml-2"
                  onClick={() => onRemoveClick(job)}
                />
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-600">No bookmarks yet</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
