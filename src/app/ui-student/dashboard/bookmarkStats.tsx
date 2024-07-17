import React, {useEffect, useState} from 'react';

const BookmarkedStats = ({user}) => {

    const [bookmarkAmount, setBookmarkAmount] = useState();
    const [quota, setQuota] = useState();
    const fetchBookmarkAmount = async (user) => {
        if (!user) return;

        try {
            const response = await fetch(`http://localhost:4000/account/student/getBookmarkAmount?studentID=${user.uid}`);
            if (!response.ok) {
                console.log("Error in response");
                return;
            }
            const associatedBookmarks = await response.json();
            console.log("quota", associatedBookmarks.length);
            setBookmarkAmount(associatedBookmarks.length);
        } catch (error) {
            console.log("Error in fetching bookmark amount", error);
        }
    }

    const fetchQuota = async (user) => {
        if (!user) return;

        try {
            const response = await fetch(`http://localhost:4000/account/student/getQuota?studentID=${user.uid}`);
            if (!response.ok) {
                console.log("Error in response");
                return;
            }
            const quotaData = await response.json();
            console.log("quota", quotaData.quota);
            setQuota(quotaData.quota);
        } catch (error) {
            console.log("Error in fetching quota amount", error);
        }
    }

    useEffect(() => {
        if (user) {
            fetchBookmarkAmount(user);
            fetchQuota(user);
        }
    }, [user]);

  return (
    <div className=" h-full p-1 font-light">
      <div className="text-lg text-gray-600">You have been bookmarked</div>
      <span className="text-lg font-semibold text-orange-400">{bookmarkAmount} times</span>
      <span className="text-lg text-gray-600"> by </span>
      <span className="text-lg font-semibold text-orange-400">recruiters</span>
      <div className="relative mt-6 flex flex-col items-center">
        <div className="w-24 h-24 border-2 rounded-full border-orange-400 flex items-center justify-center">
          <div className="text-2xl font-semibold text-gray-700">{quota}</div>
        </div>
        <div className="text-sm text-gray-500 mt-2">Quota left</div>
      </div>
    </div>
  );
};

export default BookmarkedStats;