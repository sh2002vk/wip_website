'use client';

import React, { useState } from 'react';
import Options from '@/app/ui-student/more/options';
import Profile from '@/app/ui-student/more/profile';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const MoreLayout = ({ children, title }: LayoutProps) => {
  const [view, setView] = useState('o'); 

  const renderView = () => {
    switch (view) {
      case 'Profile':
        return <Profile />;
      case 'Settings':
        return <p> Settings will go here</p>;
      default:
        return <p>hey</p>;
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-64 flex-none h-screen overflow-auto">
        <Options setView={setView} />
      </div>
      <div className="flex-1 p-0 overflow-x-auto overflow-y-auto no-scrollbar">
        {renderView()}
      </div>
    </div>
  );
};

export default MoreLayout;