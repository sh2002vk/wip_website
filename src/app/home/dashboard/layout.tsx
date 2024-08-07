// src/app/home/dashboard/layout.tsx
'use client';
import React, { useEffect, useState } from 'react';

import Applications from '@/app/ui/dashboard/applications';
import Drafts from '@/app/ui/dashboard/drafts';
import ClosedPostings from "@/app/ui/dashboard/closedpostings";
import ActivePostings from "@/app/ui/dashboard/activepostings";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../firebase'; // Ensure the correct import path

const API_URL = process.env.API_URL

type LayoutProps = {
  children: React.ReactNode;
  // title?: string;
};

const DashboardLayout = ({ children }: LayoutProps) => {
  const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState<string | null>(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          fetchUserProfile(user.uid); // Fetch user profile data
        } else {
          setUser(null);
          setLoading(false);
        }
      });
  
      return () => unsubscribe();
    }, []);

    const fetchUserProfile = async (uid: string) => {
      try {
        const response = await fetch(`${API_URL}/profile/student/getFullProfile?studentID=${uid}`);
        const student = await response.json();
        setFirstName(student.data.FirstName);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false); // Also set loading to false if there's an error
      }
    };

    if (loading) {
        return <p>Loading...</p>; // Show loading state while checking auth
    }

    if (!user) {
        return <p>User not logged in</p>; // Show message if user is not logged in
    }

  return (
    <div className="flex flex-col h-screen p-10 bg-white">
      <div className="flex-none mb-4">
        {/* User displayName will not yet have values before you can update user info */}
        <h1 className="text-3xl text-black">
          {'Welcome back, '}
          <span className="text-[#ff6f00]">{firstName || 'Bob'}</span>
          <span className="text-black">!</span>
        </h1>
        
        {/*Used to test user login, delete later*/}
        <p className='text-xs'>Email: {user.email}</p>
        
        <h2 className='pt-3 text-2xl font-light'>Here are your insights at a glance</h2>
      </div>

      <div className="relative top-2 w-full h-full">
        {/* Tile 1 */}
        <div className="absolute bg-[#F5f5f5] p-4 rounded-lg shadow-md overflow-hidden" style={{ width: '46%', height: '40%' }}>
          <Applications
            user={user}
          />
        </div>

        {/* Tile 2 */}
        <div className="absolute bg-[#F5f5f5] p-4 rounded-lg shadow-md overflow-hidden" style={{ width: '49%', height: '53%', left: '50%' }}>
          <ActivePostings
            user={user}/>
        </div>

        {/* Tile 3 */}
        <div className="absolute bg-[#F5f5f5] p-4 rounded-lg shadow-md overflow-hidden" style={{ width: '46%', height: '50%', top: '45%' }}>
           <Drafts user={user}/>
        </div>

        {/* Tile 4 */}
        <div className="absolute bg-[#FFFFFF] p-2 rounded-lg overflow-hidden" style={{ width: '49%', height: '40%', top: '57%', left: '50%' }}>
          <ClosedPostings
            user={user}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
