'use client';
import React, {useContext, useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import {OnboardingContext} from "@/app/onboarding/OnboardingContext";

type LayoutProps = {
  children: React.ReactNode;
  // title?: string;
};

const VerificationLayout = ({ children }: LayoutProps) => {

  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center items-center bg-gray-100 w-full h-screen">
        <div className="w-full p-2 max-w-md text-center">
          <h1 className="text-4xl font-semibold mb-4">Just making sure it’s you</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

const Verification = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const router = useRouter();
  const { userDetails, setUserDetails } = useContext(OnboardingContext);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle verification code submission logic here
    setUserDetails({
      ...userDetails,
      verificationCode: code.join(""),
    })
    // console.log(code.join(""));
    router.push('/onboarding/password');
  };

  return (
    <VerificationLayout>
      <p className="text-lg font-light mb-8">
        We have sent a verification code to {userDetails.email}
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between">
          {code.map((data, index) => {
            return (
              <input
                key={index}
                type="text"
                name="code"
                maxLength={1}
                className="w-16 h-16 text-center border-none rounded"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
        </div>
        <div className="text-left mt-2">
          <p className="text-sm">
            Didn’t receive a code?{" "}
            <a href="#" className="text-[#ff7002]">
              Click to resend
            </a>
          </p>
        </div>
        <div className="text-center mt-10">
          <button type="submit" className="bg-[#ff7002] text-white rounded-full px-6 py-3">Submit</button>
        </div>
      </form>
    </VerificationLayout>
  );
};

export default Verification;

