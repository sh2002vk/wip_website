'use client';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const DashboardLayout = ({ children, title }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen p-10 bg-white">
      <div className="flex-none mb-4">
        <h1 className="text-3xl text-black">{'Welcome back, '}
        <span className="text-orange-500">Bob</span>
         <span className="text-black">!</span>
         </h1>
        <h2 className='pt-3 text-2xl font-light'>Here are you insights at a glance</h2>
      </div>

      <div className="relative top-2 w-full h-full">
        {/* Tile 1 */}
        <div className="absolute bg-[#F5f5f5] p-4 rounded-lg shadow-md" style={{ width: '45%', height: '40%' }}>
          <p>NEW APPLICATIONS BOARD</p>
        </div>

        {/* Tile 2 */}
        <div className="absolute bg-[#F5f5f5] p-4 rounded-lg shadow-md" style={{ width: '45%', height: '55%', left: '50%' }}>
          <p>YOUR ACTIVE POSTINGS</p>
        </div>

        {/* Tile 3 */}
        <div className="absolute bg-[#F5f5f5] p-4 rounded-lg shadow-md" style={{ width: '45%', height: '50%', top: '45%'}}>
          <p>DRAFT POSTINGS</p>
        </div>

        {/* Tile 4 */}
        <div className="absolute bg-[#F5f5f5] p-4 rounded-lg shadow-md" style={{ width: '45%', height: '35%', top: '60%', left: '50%' }}>
          <p>CLOSED POSTINGS</p>
        </div>
      </div>
    </div>
  );
};
export default DashboardLayout;
