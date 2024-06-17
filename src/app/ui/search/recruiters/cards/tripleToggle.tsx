'use client'
import React from 'react';

export default function MultiToggleSwitch({leftToggle, middleToggle, rightToggle, activeToggles, setActiveToggles }) {
    
    const handleToggle = (toggle) => {
        if (activeToggles.includes(toggle)) {
            setActiveToggles(activeToggles.filter(t => t !== toggle));
        } else {
            setActiveToggles([...activeToggles, toggle]);
        }
    };

    return (
        <div className='flex text-xs'>
            <button
                id={leftToggle}
                onClick={() => handleToggle(leftToggle)}
                className={`font-medium text-gray-700 px-2 py-2 leading-none border rounded-l text-black border-gray-300 flex-1
                            ${activeToggles.includes(leftToggle) ? 'bg-gray-300' : 'bg-white'}`}
            >
                {leftToggle}
            </button>

            <button
                id={middleToggle}
                onClick={() => handleToggle(middleToggle)}
                className={`font-medium text-gray-700 px-2 py-2 leading-none border text-black border-gray-300 flex-1
                            ${activeToggles.includes(middleToggle) ? 'bg-gray-300' : 'bg-white'}`}
            >
                {middleToggle}
            </button>

            <button
                id={rightToggle}
                onClick={() => handleToggle(rightToggle)}
                className={`font-medium text-gray-700 px-2 py-2 leading-none border rounded-r text-black border-gray-300 flex-1
                            ${activeToggles.includes(rightToggle) ? 'bg-gray-300' : 'bg-white'}`}
            >
                {rightToggle}
            </button>
        </div>
    )
}
