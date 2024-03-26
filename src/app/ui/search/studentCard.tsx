// use client
import React from 'react';
import Image from 'next/image';

export default function StudentCard({name, age, institution, degree, availability, experience, skills }) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6 m-4">
            <div className="flex items-center">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gray-300 overflow-hidden">
                    {/* Replace with your image path or component */}
                    {/* <Image src={yourImagePath} alt="profile picture" width={64} height={64} /> */}
                </div>
                <div className="ml-4">
                    <div className="text-xl font-bold">{name}</div>
                    <p className="text-gray-600">Age: {age}</p>
                    <p className="text-gray-600">{institution}</p>
                    <p className="text-gray-600">{degree}</p>
                </div>
            </div>
            <div className="py-4">
                <h3 className="text-lg font-semibold">Availability</h3>
                <p className="text-gray-600">{availability}</p>
            </div>
            <div className="py-4">
                <h3 className="text-lg font-semibold">Previous Experience</h3>
                <ul className="text-gray-600">
                    {experience.map((job, index) => (
                        <li key={index}>{job.title} - {job.company}</li>
                    ))}
                </ul>
            </div>
            <div className="py-4">
                <h3 className="text-lg font-semibold">Skill sets</h3>
                <p className="text-gray-600">{skills.join(', ')}</p>
            </div>
        </div>
    );
}
