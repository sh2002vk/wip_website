'use client'

import Link from 'next/link'; // Ensure this import is used if Link is needed elsewhere in your component
import React from 'react';

export default function Parameters() {
  const [availability, setAvailability] = React.useState(0);
  const [preference, setPreference] = React.useState("UNAVAILABLE");

  function handleRemote(){
    setPreference("REMOTE");
    console.log("HIT REMOTE");
  }

  function handleHyrbid(){
    setPreference("HYBRID");
    console.log("HIT HYBRID");
  }

  function handleInPerson(){
    setPreference("IN PERSON");
    console.log("HIT INPERSON");
  }

  function handleFour(){
    setAvailability(4);
  }

  function handleEight(){
    setAvailability(8);
  }

  function handleTwelve(){
    setAvailability(12);
  }

  return (
    <div className="flex flex-col h-screen w-25 bg-gray-200">
      <div id="AVAILABILITY OPTIONS">
        <div className="flex justify-start text-xs"><p>AVAILABILITY</p></div>
        <div className="flex justify-center space-x-0 py-1">
          <button onClick={handleRemote} className="bg-white hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2.5 border border-black-500 hover:border-transparent rounded text-xs">
            REMOTE
          </button>
          <button onClick={handleHyrbid} className="bg-white hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2.5 border border-black-500 hover:border-transparent rounded text-xs">
            HYBRID
          </button>
          <button onClick={handleInPerson} className="bg-white hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2.5 border border-black-500 hover:border-transparent rounded text-xs">
            IN PERSON
          </button>
        </div>

        <div className="flex justify-center space-x-0">
          <button onClick={handleFour} className="bg-white hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2 border border-black-500 hover:border-transparent rounded text-xs">
            4 months
          </button>
          <button onClick={handleEight} className="bg-white hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2 border border-black-500 hover:border-transparent rounded text-xs">
            8 months
          </button>
          <button onClick={handleTwelve} className="bg-white hover:bg-black-500 text-black-700 font-semibold hover:text-white py-1 px-2 border border-black-500 hover:border-transparent rounded text-xs">
            12 months
          </button>
        </div>
      </div>
    </div>
  );
}
