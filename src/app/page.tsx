import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Homepage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#ff7002] via-white to-[#b6b5b5]">
      <div className="absolute top-0 right-0 mt-10 mr-10 flex space-x-4">
        <Link href="/onboarding">
          <span className="bg-[#ff6f00] text-white rounded-full px-6 py-4 cursor-pointer">Sign up</span>
        </Link>
        <Link href="/login">
          <span className="text-gray-900 cursor-pointer">Log in</span>
        </Link>
      </div>
      <div className="flex items-center space-x-1">
        <Image src="/wip.png" alt="Work In Progress Logo" width={250} height={250} />
        <h1 className="text-6xl font-light">Work In Progress.</h1>
      </div>
    </div>
  );
};

export default Homepage;
