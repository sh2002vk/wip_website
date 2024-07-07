import React from 'react';

const BookmarkedStats = () => {
  return (
    <div className=" h-full p-1 font-light">
      <div className="text-lg text-gray-600">You have been bookmarked</div>
      <span className="text-lg font-semibold text-orange-400">21 times</span>
      <span className="text-lg text-gray-600"> by </span>
      <span className="text-lg font-semibold text-orange-400">7 recruiters</span>
      <div className="relative mt-6 flex flex-col items-center">
        <div className="w-24 h-24 border-2 rounded-full border-orange-400 flex items-center justify-center">
          <div className="text-2xl font-semibold text-gray-700">1</div>
        </div>
        <div className="text-sm text-gray-500 mt-2">Quota left</div>
      </div>
    </div>
  );
};

export default BookmarkedStats;