'use client';
import React, {useContext, useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import {OnboardingContext} from "@/app/onboarding/OnboardingContext";

const API_URL = process.env.API_URL

type LayoutProps = {
  children: React.ReactNode;
  // title?: string;
};

const YourDetailsLayout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center items-center bg-gray-100 w-full h-screen">
        <div className="w-full p-5 max-w-2xl text-center">
          <h1 className="text-4xl font-semibold mb-4">Welcome!</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

const YourDetails = () => {
  const { userDetails, setUserDetails } = useContext(OnboardingContext);
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    school: '',
    major: '',
    year: '',
  });

  useEffect(() => {
    const defaultFormData = {
      lastName: '',
      firstName: '',
      email: '',
      school: '',
      major: '',
      year: '',
    };
  
    // Merge userDetails with defaultFormData
    setFormData({
      ...defaultFormData,
      ...userDetails,
    });
  }, [userDetails]);

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleDetailChange = () => {
    console.log("HANDLE DETAIL CHANGE");
    setUserDetails({
      ...userDetails, // Preserve existing userDetails properties
      ...formData,    // Update with new formData values
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleDetailChange(); // Update context with form data
    // ADD API CALL
    console.log("SENDING VERIFICATION EMAIL");
    try {
      console.log(`calling ${API_URL}/action/verification/sendCode`);
      const response = await fetch(`${API_URL}/action/verification/sendCode`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        router.push('/onboarding/verification');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      alert("There was an error sending the verification code. Please check your email or try again later.");
    }
  };

  return (
    <YourDetailsLayout>
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
        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
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
          <div className="w-1/2 pl-2">
            <label className="block text-left mb-1" htmlFor="year">
                Year (Between 1-4)<span className="text-red-500">*</span>
            </label>
            <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                placeholder="Enter your standing"
                className="w-full p-3 pl-5 border-none rounded-3xl"
                min="1"
                max="4"
                required
            />
          </div>
        </div>
        <div className="text-center mt-6">
          <button type="submit" className="bg-[#ff7002] text-white rounded-full px-6 py-3">Sign up</button>
        </div>
      </form>
    </YourDetailsLayout>
  );
};

export default YourDetails;
