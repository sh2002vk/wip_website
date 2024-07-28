// src/pages/page.tsx
'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../../firebase'; // Ensure the correct import path

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const [role, setRole] = useState('student');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/home/dashboard'); // Redirect to dashboard if already logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

  const startOnboarding = () => {
    router.push('/onboarding/whyWip');
  }

  const determineAccountType = async (uid) => {
    try {
      const response = await fetch(`http://localhost:4000/profile/recruiter/getFullProfile?recruiterID=${uid}`);
      const account = await response.json();
      if (!response.ok) {
        return 'student'; // Return role directly
      }
      return 'recruiter'; // Return role directly
    } catch (error) {
      console.log(error);
      throw new Error('Failed to determine account type');
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      let uid;
      if (isLogin) {
        // Handle Login
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        uid = user.uid;
      } else {
        // Handle Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        uid = user.uid;
      }
      const accountType = await determineAccountType(uid);
      console.log("Login success");
      if (accountType === 'student') {
        router.push('/home-student'); // Redirect to student home
      } else {
        router.push('/home'); // Redirect to recruiter home
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setError('Failed to authenticate. Please try again.');
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <div className="flex justify-center mb-6">
          <Image src="/wip.png" alt="Logo" width={150} height={150} />
        </div>
        <form onSubmit={handleAuth} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end mt-1">
              <Link href="/home" className="font-medium text-xs text-blue-500 hover:text-blue-800">
                Forgot password?
              </Link>
            </div>
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          {/*Code for recruiter and student toggle*/}
          {/*<div className="mb-4 text-center">*/}
          {/*  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">*/}
          {/*    I am a*/}
          {/*  </label>*/}
          {/*  <div className="flex justify-center">*/}
          {/*    <label className="inline-flex items-center mr-4">*/}
          {/*      <input*/}
          {/*        type="radio"*/}
          {/*        className="form-radio"*/}
          {/*        name="role"*/}
          {/*        value="student"*/}
          {/*        checked={role === 'student'}*/}
          {/*        onChange={() => setRole('student')}*/}
          {/*      />*/}
          {/*      <span className="ml-2 font-light">Student</span>*/}
          {/*    </label>*/}
          {/*    <label className="inline-flex items-center">*/}
          {/*      <input*/}
          {/*        type="radio"*/}
          {/*        className="form-radio"*/}
          {/*        name="role"*/}
          {/*        value="recruiter"*/}
          {/*        checked={role === 'recruiter'}*/}
          {/*        onChange={() => setRole('recruiter')}*/}
          {/*      />*/}
          {/*      <span className="ml-2 font-light">Recruiter</span>*/}
          {/*    </label>*/}
          {/*  </div>*/}
          {/*</div>*/}
          <div className="flex items-center justify-center mb-4">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-800 md:text-base"
            >
              {isLogin ? 'Log in' : 'Sign up'}
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => startOnboarding()}
              className="font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              {isLogin ? 'Need an account? Sign up' : 'Have an account? Log in'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
