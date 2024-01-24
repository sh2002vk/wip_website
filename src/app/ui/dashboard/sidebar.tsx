import Link from 'next/link';
import Image from 'next/image'; // if you are using images for logos or icons

export default function SideBar() {
  return (
    <div className="flex flex-col h-screen w-20 md:w-60 bg-gray-200">
      {/* Logo or Home Link */}
      <div className="flex items-center justify-center h-20 w-20 md:h-40 md:w-60">
        <Link href="/" className="flex items-center justify-center h-full w-full">
            {/* Replace with your logo image if you have one */}
            <span className="hidden md:block text-lg font-semibold text-black-600">W</span> 
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col flex-grow">
        <nav className="flex flex-col mt-10 space-y-2">
          {/* Example Link */}
          <Link href="/dashboard" className="group flex items-center justify-center h-12 w-20 md:w-60 hover:bg-gray-300">
              <span className="hidden group-hover:block md:block text-sm font-medium text-gray-700">Dashboard</span>
          </Link>
          {/* Add more navigation links here */}
        </nav>

        {/* Sign Out Button */}
        <div className="mt-auto mb-10">
          <Link href="/" className="flex items-center justify-center h-12 w-18 md:w-60 rounded-lg bg-blue-500 text-white transition-colors hover:bg-blue-400">
              {/* Icon placeholder - replace with actual icons */}
              <span className="hidden md:block text-sm font-medium">Log out</span> 
          </Link>
        </div>
      </div>
    </div>
  );
}
