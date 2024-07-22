"use client"; // Ensure this is at the top of the file

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();
  const currentRoute = usePathname();

  useEffect(() => {
    if (currentRoute === '/onboarding') {
      router.push('/onboarding/whyWip');
    }
  }, [currentRoute, router]);

  const navItems = [
    { href: '/onboarding/whyWip', label: 'Why WIP' },
    { href: '/onboarding/yourDetails', label: 'Your details' },
    { href: '/onboarding/verification', label: 'Verification' },
    { href: '/onboarding/password', label: 'Password' },
    { href: '/onboarding/welcome', label: 'Welcome to WIP' },
  ];

  return (
    <div className="flex flex-col h-screen w-full p-16 shadow-md">
      <div className="flex items-center mb-10">
        <img src="/wip.png" className="h-20 w-20 mr-2" />
        <span className="text-2xl font-light">WorkInProgress</span>
      </div>
      <nav className="flex flex-col mt-10 space-y-7">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href} legacyBehavior>
            <a
              className={`${
                currentRoute === item.href ? 'text-orange-500 font-semibold text-2xl' : 'text-gray-400 text-lg'
              } relative pl-4 before:absolute before:top-0 before:left-0 before:bottom-0 ${
                currentRoute === item.href ? 'before:w-1 before:bg-orange-500' : 'before:w-1 before:bg-gray-300'
              }`}
            >
              {item.label}
            </a>
          </Link>
        ))}
      </nav>
      <div className="mt-auto flex justify-between items-center text-gray-500 text-sm">
        <Link href="/" legacyBehavior>
          <a className="flex items-center space-x-1">
            <span>&larr;</span>
            <span>Go back</span>
          </a>
        </Link>
        <Link href="/login" legacyBehavior>
          <a>Log in</a>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
