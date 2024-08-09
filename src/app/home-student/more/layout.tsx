'use client';

import React, { useState } from 'react';
import Options from '@/app/ui-student/more/options';
import Profile from '@/app/ui-student/more/profile';

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from '../../../firebase'; // Ensure the correct import path

import { useRouter } from 'next/navigation';

type LayoutProps = {
  children: React.ReactNode;
  // title?: string;
};

type AuthUser = User | null;

const MoreLayout = ({ children }: LayoutProps) => {

  const [user, setUser] = useState<AuthUser>(null);
  const [view, setView] = useState('o'); 

  const router = useRouter();


  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        router.push('./'); // Redirect to student home
      }
    });

    return () => unsubscribe();
  }, []);

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