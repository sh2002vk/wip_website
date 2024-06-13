'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Profile() {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full mx-auto bg-white p-4">
      {/* Left Section */}
      <div className="flex flex-col items-center md:w-1/3">
        <div className="flex flex-col items-center">
          <div className="mt-10 bg-gray-300 rounded-full h-40 w-40"></div>
          <h2 className="mt-4 text-xl font-bold">Name</h2>
          <p className="text-gray-600">Company</p>
          <p className="text-gray-600">Position Title(s)</p>
          <p className="text-gray-600">email</p>
          <p className="text-gray-600">City · Province · Country</p>
        </div>
        <div className="flex space-x-2 justify-center mt-auto mb-6 pr-4">
          <Link href="/edit-profile" legacyBehavior>
            <a className="bg-orange-500 text-white px-4 py-2 rounded">Edit Profile</a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className="bg-orange-500 text-white px-4 py-2 rounded">Log Out</a>
          </Link>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col md:w-2/3 p-4 space-y-6">
        <div className="flex flex-col mb-4 space-y-2">
          <p><strong>Hiring for:</strong> Google | Amazon | Facebook</p>
          <p><strong>Area:</strong> Tech Roles</p>
          <p><strong>Documents:</strong></p>
          <div className="flex space-x-2 mt-2">
            <button className="border border-gray-300 px-4 py-2 rounded">Company</button>
            <button className="border border-gray-300 px-4 py-2 rounded">Logo Image</button>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold">Professional Bio</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quas sapiente inventore totam ullam obcaecati amet consectetur animi nesciunt esse?
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold">Contact Information</h3>
          <p>Email: something@somemail.com</p>
          <p>Phone: 123-456-7890</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold">Company Culture and Benefits</h3>
          <p>Culture: Lorem ipsum, dolor sit amet consectetur?</p>
          <p>Learning Opportunities: Lorem ipsum dolor sit amet?</p>
          <p>Benefit: Lorem ipsum dolor sit amet consectetur.</p>
        </div>
      </div>
    </div>
  );
}
