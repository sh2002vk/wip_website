'use client';
import React, { useState } from 'react';
import Bookmarks from '@/app/ui/manage/recruiters/bookmarks';
import JobDetails from '@/app/ui/manage/recruiters/jobDetails';
import SideBar from "@/app/ui/home/sidebar"; 
import Profiles from '@/app/ui/message/profiles';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const MessageLayout = ({ children, title }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className="w-full md:w-64 flex-none h-screen overflow-auto ">
        <Profiles/>
      </div>
      <div className="flex-1 p-4 overflow-x-auto overflow-y-auto no-scrollbar">
        <p>Chat here</p>
      </div>
    </div>
  );
};

export default MessageLayout;
