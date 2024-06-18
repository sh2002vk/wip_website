'use client';

import React from 'react';
import Link from 'next/link';

const Options = ({ setView }) => {
  return (
    <div className="flex flex-col h-screen w-full mx-auto bg-white border-r border-black">
      <div className="container mx-auto flex flex-col justify-between h-full">
        <nav className="flex flex-col w-full">
          <button onClick={() => setView('Profile')} className="group flex items-center pl-7 h-20 w-full hover:bg-gray-300 border-b border-gray-300">
            <span className="text-sm font-medium text-gray-700">Profile</span>
          </button>
          <button onClick={() => setView('Settings')} className="group flex items-center pl-7 h-20 w-full hover:bg-gray-300 border-b border-gray-300">
            <span className="text-sm font-medium text-gray-700">Settings</span>
          </button>
        </nav>
        <div id='logoutbutton' className="flex justify-center mt-auto mb-10">
          <Link href="/" className="flex items-center justify-center h-12 w-40 rounded-lg bg-orange-500 text-white transition-colors hover:bg-blue-400">
            <span className="text-sm font-medium">Log out</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Options;
