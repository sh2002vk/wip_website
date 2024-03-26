import React from 'react';
import Parameters from '@/app/ui/search/Parameters';
import SideBar from "@/app/ui/home/sidebar"; 
import StudentCard from "@/app/ui/search/StudentCard"

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const SearchLayout = ({ children, title }: LayoutProps) => {
  return (
    // Use a flex container to arrange children side by side
    <div className="flex-container">

      <div className="w-full flex-none md:w-64">
        <Parameters />
      </div>

      {/* <div className="w-full flex-none md:w-64">
        <Bookmarks />
      </div> */}
      
      {/* <div className="w-full flex-none md:w-64">
        <StudentCard
          name="Some Name"
          age="?"
          institution="Institution Name"
          degree="Degree Program(s)"
          availability="Summer 2024"
          experience={[
              { title: 'Software Developer', company: 'Google' },
              { title: 'Technical Assistant', company: 'Meta' },
          ]}
          skills={['Python', 'Java', 'C++']}
        />
      </div> */}

    </div>
  );
};

export default SearchLayout;
