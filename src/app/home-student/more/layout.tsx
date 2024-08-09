'use client';

import React, { useState } from 'react';
import Options from '@/app/ui-student/more/options';
import Profile from '@/app/ui-student/more/profile';
import { useAuth } from '../../../context/authContext'; // Import useAuth hook

type LayoutProps = {
  children: React.ReactNode;
  // title?: string;
};

const MoreLayout = ({ children }: LayoutProps) => {
  const {user, loading} = useAuth();
  const [view, setView] = useState('o'); 

  React.useEffect(() => {
    if (!loading && user) {
      console.log("Student Logged In");
    }
  }, [user, loading]);

  const renderView = (userObj: any) => {
    switch (view) {
      case 'Profile':
        return <Profile user={userObj}/>;
      case 'Settings':
        return <p> Settings will go here</p>;
      default:
        return <p>hey</p>;
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-64 flex-none h-screen overflow-auto">
        <Options setView={setView} />
      </div>
      <div className="flex-1 p-0 overflow-x-auto overflow-y-auto no-scrollbar">
        {renderView(user)}
      </div>
    </div>
  );
};

export default MoreLayout;