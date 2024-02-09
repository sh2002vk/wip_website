import React from 'react';
import Bookmarks from '@/app/ui/manage/bookmarks';
import SideBar from "@/app/ui/home/sidebar"; 

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const ManageLayout = ({ children, title }: LayoutProps) => {
  return (
    // Use a flex container to arrange children side by side
    <div className="flex-container">

      <div className="w-full flex-none md:w-64">
        <Bookmarks />
      </div>

      {/* <div className="w-full flex-none md:w-64">
        <Bookmarks />
      </div> */}
      
      {/* <div className="w-full flex-none md:w-64">{children}</div> */}

    </div>
  );
};

export default ManageLayout;
