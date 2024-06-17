'use client'
import React from 'react';
import Image from 'next/image';

export default function StudentCard({name, age, institution, degree, availability, experience = [], skills = [] }) {
    return (
        <div className="min-w-[20rem] max-w-[20rem] min-h-[30rem] max-h-[30rem] rounded-2xl overflow-auto shadow-md bg-gray-100 p-6 m-4 flex flex-col items-center justify-center">
            
            {/* Items that should be middle-aligned */}
            <div className='flex flex-col items-center text-center'>
                <div className="py-8 flex h-16 w-16 rounded-full bg-gray-300 overflow-hidden items-center justify-center">
                    {/* For now, using WIP logo as a template */}
                    <Image src="/wip.png" alt="profile picture" width={64} height={64} layout="responsive" />
                </div>
                <div className="text-center py-4">
                    <div className="text-xl font-bold">{name}</div>
                    <p className="text-sm text-gray-600">Age: {age}</p>
                    <p className="text-sm text-gray-600">{institution}</p>
                    <p className="text-sm text-gray-600">{degree}</p>
                </div>
            </div>

            {/* Items that should be left aligned */}
            <div className='justify-left text-left w-full'>
                <div className="py-2">
                    <h3 className="text-base font-semibold">Availability</h3>
                    <p className="text-sm text-gray-600">{availability}</p>
                </div>
                <div className="py-2">
                    <h3 className="text-base font-semibold">Previous Experience</h3>
                    <ul className="text-sm text-gray-600">
                        {experience.map((job, index) => (
                            <li key={index}>{job.title} - {job.company}</li>
                        ))}
                    </ul>
                </div>
                <div className="py-2">
                    <h3 className="text-base font-semibold">Skill sets</h3>
                    <p className="text-sm text-gray-600">{skills.join(', ')}</p>
                </div>
            </div>
        </div>
    );
}
