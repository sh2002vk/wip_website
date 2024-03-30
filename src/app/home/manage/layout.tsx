import React from 'react';
import Bookmarks from '@/app/ui/manage/bookmarks';
import SideBar from "@/app/ui/home/sidebar"; 

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const ManageLayout = ({ children, title }: LayoutProps) => {
  return (
    <div className="flex-container flex flex-wrap">

      <div className="w-full h-screen flex-none md:w-64">
        {/*List to display drafts or completed job postings */}
        <Bookmarks />
      </div>
      <div className="w-full md:w-3/4 p-4 flex flex-no-wrap overflow-x-auto grid grid-rows-2 grid-flow-col" style={{ height: 'calc(100% - 1rem)' }}>
        {/*Section used to modify or view the draft and completed job posting contents*/}
      </div>
    </div>
  );
};

export default ManageLayout;
