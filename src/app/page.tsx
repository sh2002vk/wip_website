// src/pages/index.tsx (or appropriate page file)
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '../firebase'; // Adjust the path if necessary
import { createUserWithEmailAndPassword } from 'firebase/auth';
import DashboardPage from './home/dashboard/page';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Optionally, use Link for client-side navigation
      window.location.href = '/home/dashboard';
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <div className="flex justify-center mb-6">
          <Image src="/wip.png" alt="Logo" width={150} height={150} />
        </div>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="flex items-center justify-between">
            <button
              onClick={handleSignUp}
              className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Sign Up</span>
            </button>
            <Link href="/home">
              {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"> */}
                Forgot Password?
              {/* </a> */}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
