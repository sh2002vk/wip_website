'use client';
import React, {useEffect, useState} from 'react';
import BookmarkedStats from '@/app/ui-student/dashboard/bookmarkStats';
import Applications from '@/app/ui-student/dashboard/applications';
import Drafts from "@/app/ui-student/dashboard/drafts";
import New from "@/app/ui-student/dashboard/whatsNew";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "@/firebase";

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const DashboardLayout = ({ children, title }: LayoutProps) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false); // Set loading to false after user state is updated
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <p>Loading...</p>; // Show loading state while checking auth
    }

    if (!user) {
        return <p>User not logged in</p>; // Show message if user is not logged in
    }

  return (
    <div className="flex flex-col h-screen p-10 bg-white">
      <div className="flex-none mb-4">
        <h1 className="text-3xl text-black">
          {'Welcome back, '}
          <span className="text-[#ff6f00]">Student {user.uid}</span>
          <span className="text-black">!</span>
        </h1>
        <h2 className='pt-3 text-2xl font-light'>Here are your insights at a glance</h2>
      </div>

      <div className="relative top-2 w-full h-full">
        {/* Tile 1 */}
        <div className="absolute bg-gradient-to-b to-white from-[#F5f5f5] p-4 rounded-lg shadow-md overflow-hidden" style={{ width: '23%', height: '45%' }}>
        <BookmarkedStats
            user={user}/>
      </div>


        {/* Tile 2 */}
        <div className="absolute bg-[#F5f5f5] p-4 rounded-lg shadow-md overflow-hidden" style={{ width: '73%', height: '45%', left: '27%' }}>
          <New />
        </div>

        {/* Tile 3 */}
        <div className="absolute bg-[#F5f5f5] p-4 rounded-lg shadow-md overflow-hidden" style={{ width: '51%', height: '50%', top: '50%' }}>
           <Applications
            user={user}/>
        </div>

        {/* Tile 4 */}
        <div className="absolute bg-[#F5f5f5] p-4 rounded-lg shadow-md overflow-hidden" style={{ width: '45%', height: '50%', top: '50%', left: '55%' }}>
          <Drafts
            user={user}/>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;