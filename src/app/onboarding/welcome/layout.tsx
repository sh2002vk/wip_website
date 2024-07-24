'use client';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const WelcomeLayout = ({ children, title }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center items-center bg-gray-100 w-full h-screen">
        <div className="w-full p-5 max-w-2xl text-center">
          <h1 className="text-4xl font-semibold mb-4">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

const Welcome = () => {
  return (
    <WelcomeLayout title="Congratulations!">
      <p className="text-xl font-light mb-8">
        To start off, what would you like to do first?
      </p>
      <div className="flex space-x-5 justify-around">
        <div className="w-1/2 p-9 bg-[#ff7002] text-white rounded-lg flex flex-col items-center justify-center">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-1 1v1H7a2 2 0 00-2 2v9a2 2 0 002 2h6a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 00-1-1H9zm3 3H8V3h4v2z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Finish profile setup</h2>
          <p className="text-sm font-medium">Upload essential documents such as your resume, and introduce yourself</p>
        </div>
        <div className="w-1/2 p-8 bg-white text-black border border-gray-300 rounded-lg flex flex-col items-center justify-center">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 3a7 7 0 100 14A7 7 0 0010 3zM7 9a1 1 0 012 0v1a1 1 0 01-2 0V9zm3 0a1 1 0 012 0v1a1 1 0 01-2 0V9zm-4 5a4.978 4.978 0 001.528 3.357 5.002 5.002 0 006.944 0A4.978 4.978 0 0014 14H6z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Start browsing</h2>
          <p className="text-sm font-medium">See the latest postings from top companies and get a taste of what WIP offers</p>
        </div>
      </div>
    </WelcomeLayout>
  );
};

export default Welcome;
