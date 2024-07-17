import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Bookmarks = ({ students, onStudentClick, isExpanded, toggleExpand, closeExpand }) => {
  console.log('students gotten: ', students);
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
              size="md"
              className="cursor-pointer"
              onClick={closeExpand}
            />
          </div>
          {students.length > 0 ? (
            students.filter(student => student !== null).map((student, index) => (
              student && ( // Check if student is not null or undefined
                <div key={index} className="border-b border-gray-200 py-2 cursor-pointer" onClick={() => onStudentClick(student)}>
                  <div className="font-semibold">{student.FirstName} {student.LastName}</div>
                  <div className="text-sm text-gray-600">{student.School}</div>
                  <div className="text-sm text-gray-600">{student.AcademicMajor}</div>
                </div>
              )
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
