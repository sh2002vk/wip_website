import Link from 'next/link';
import Image from 'next/image'; // if you are using images for logos or icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faSearch, faCog } from '@fortawesome/free-solid-svg-icons';

export default function SideBar() {
  return (
    <div className="flex flex-col h-screen w-20 md:w-60 bg-white-200 border-r border-black">
      {/* Logo or Home Link */}
      <div className="flex items-center justify-center h-20 w-20 md:h-40 md:w-60">
        <Link href="/home" className="flex items-center justify-center h-full w-full">
            <Image src="/wip.png" alt="Logo" width={100} height={100} />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col flex-grow">
        <nav className="flex flex-col mt-10 space-y-2">
          {/* Adjust the padding-left to increase space between icon and text */}
          {/* Adjust the width or padding-right to shift overall content to the right */}
          <Link href="/home" className="group flex items-center pl-10 pr-4 h-12 w-full md:w-60 hover:bg-gray-300">
              <FontAwesomeIcon icon={faHouse} className="w-5 h-5 mr-4" /> {/* Add margin-right to create space between icon and text */}
              <span className="text-sm font-medium text-gray-700">Home</span>
          </Link>
          <Link href="/home/search" className="group flex items-center pl-10 pr-4 h-12 w-full md:w-60 hover:bg-gray-300">
              <FontAwesomeIcon icon={faSearch} className="w-5 h-5 mr-4" />
              <span className="text-sm font-medium text-gray-700">Search</span>
          </Link>
          <Link href="/home/manage" className="group flex items-center pl-10 pr-4 h-12 w-full md:w-60 hover:bg-gray-300">
              <FontAwesomeIcon icon={faCog} className="w-5 h-5 mr-4" />
              <span className="text-sm font-medium text-gray-700">Manage</span>
          </Link>
        </nav>

        {/* Sign Out Button */}
        <div id='logoutbutton' className="flex justify-center mt-auto mb-10">
          <Link href="/" className="flex items-center justify-center h-12 w-4/5 rounded-lg bg-blue-500 text-white transition-colors hover:bg-blue-400">
              <span className="text-sm font-medium">Log out</span> 
          </Link>
        </div>
      </div>
    </div>
  );
}
