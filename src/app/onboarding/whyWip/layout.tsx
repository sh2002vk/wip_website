'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const WhyWipLayout = ({ children, title }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center items-center bg-gray-100 w-full h-screen">
        <div className="w-full p-5 max-w-3xl text-center">
          <h2 className="text-4xl font-semibold mb-4">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

const WhyWip = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const router = useRouter();

  const slides = [
    {
      title: "Student only. Student first.",
      description: "WIP is only available to post-secondary students who are seeking internship opportunities.",
      icon: "/student.png",
    },
    {
      title: "Your application matters",
      description: "Each student is assigned a quota which gives importance to every application that a recruiter receives.",
      icon: "/Star.png",
    },
    {
      title: "Recruiters find you",
      description: "Recruiters will reach out to candidates who are potential culture and behavioural fits with their companies",
      icon: "/Hands.png",
    }
  ];

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleSoundsGoodClick = () => {
    router.push('/onboarding/yourDetails');
  };

  return (
    <WhyWipLayout title="Burnout from mass-applying?">
      <p className="text-xl font-light mb-8">
        WorkInProgress makes sure you <span className="text-orange-500">stand out.</span>
      </p>

      <div className="w-full h-2/3 mb-8 relative p-10">
        <div className="flex justify-center items-center w-full mb-4">
          <img src={slides[slideIndex].icon} alt="Icon" className="h-20 w-20"/>
        </div>
        <h3 className="text-2xl font-semibold mb-2">{slides[slideIndex].title}</h3>
        <p className="font-light text-lg ml-10 mr-10">{slides[slideIndex].description}</p>

        <button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
          onClick={prevSlide}
        >
          ◀
        </button>
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
          onClick={nextSlide}
        >
          ▶
        </button>
      </div>

      <button className="bg-[#ff7002] text-white rounded-full px-6 py-3" onClick={handleSoundsGoodClick}>
        Sounds good
      </button>
    </WhyWipLayout>
  );
};

export default WhyWip;
