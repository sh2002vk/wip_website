'use client'
import React, { useState } from 'react';

export default function ToggleSwitch ({leftToggle, rightToggle, activeToggle, setActiveToggle }) {

    const handleToggle = (toggle) => {
        setActiveToggle(toggle);
    };

    return (
        <div className='flex'>
            <button         
                id = {leftToggle}
                onClick={() => handleToggle(leftToggle)}
                className={`text-m font-medium text-gray-700 px-4 py-2 leading-none border rounded-l text-black border-gray-300 flex-1
                            ${activeToggle === leftToggle ? 'bg-gray-300' : 'bg-white'}`}
            >
                {leftToggle}
            </button>

            <button
                id = {rightToggle}
                onClick={() => handleToggle(rightToggle)}
                className={`text-m font-medium text-gray-700 px-4 py-2 leading-none border rounded-r text-black border-gray-300 flex-1
                            ${activeToggle === rightToggle ? 'bg-gray-300' : 'bg-white'}`}
            >
                {rightToggle}
            </button>
        </div>

    )
}
