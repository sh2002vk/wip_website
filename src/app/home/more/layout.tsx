'use client';

import React, { useState } from 'react';
import Options from '@/app/ui/more/options';
import Profile from '@/app/ui/more/profile';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../../firebase'; // Ensure the correct import path

type LayoutProps = {
  children: React.ReactNode;
  // title?: string;
};

const MoreLayout = ({ children }: LayoutProps) => {

  const [user, setUser] = useState(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const [view, setView] = useState('o'); 

  const renderView = (userObj) => {
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
        <Options setView={setView}/>
      </div>
      <div className="flex-1 p-0 overflow-x-auto overflow-y-auto no-scrollbar">
        {renderView(user)}
      </div>
    </div>
  );
};

export default MoreLayout;

