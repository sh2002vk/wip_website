'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const YourDetailsLayout = ({ children, title }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center items-center bg-gray-100 w-full h-screen">
        <div className="w-full p-5 max-w-2xl text-center">
          <h1 className="text-4xl font-semibold mb-4">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

const YourDetails = () => {
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    email: "",
    school: "",
    major: ""
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    router.push('/onboarding/verification');
  };

  return (
    <YourDetailsLayout title="Welcome!">
      <p className="text-xl font-light mb-8">
        First thing first, let us learn a bit about you
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label className="block text-left mb-1" htmlFor="lastName">Last Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="w-full p-3 pl-5 border-none rounded-3xl"
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-left mb-1" htmlFor="firstName">First Name<span className="text-red-500">*</span></label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="w-full p-3 pl-5 border-none rounded-3xl"
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-left mb-1" htmlFor="email">Email<span className="text-red-500">*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 pl-5 border-none rounded-3xl"
            required
          />
        </div>
        <div>
          <label className="block text-left mb-1" htmlFor="school">School<span className="text-red-500">*</span></label>
          <input
            id="school"
            name="school"
            value={formData.school}
            onChange={handleChange}
            placeholder="Enter your school"
            className="w-full p-3 pl-5 border-none rounded-3xl"
            required
          />
        </div>
        <div>
          <label className="block text-left mb-1" htmlFor="major">Major<span className="text-red-500">*</span></label>
          <input
            type="text"
            id="major"
            name="major"
            value={formData.major}
            onChange={handleChange}
            placeholder="Enter your major"
            className="w-full p-3 pl-5 border-none rounded-3xl"
            required
          />
        </div>
        <div className="text-center mt-6">
          <button type="submit" className="bg-orange-500 text-white rounded-full px-6 py-3">Sign up</button>
        </div>
      </form>
    </YourDetailsLayout>
  );
};

export default YourDetails;