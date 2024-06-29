// src/pages/page.tsx
'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase'; // Ensure the correct import path

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push('/home/dashboard'); // Redirect to dashboard if already logged in
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Handle Login
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Handle Sign Up
        await createUserWithEmailAndPassword(auth, email, password);
      }
      console.log("Login success");
      router.push('/home/dashboard'); // Redirect to dashboard after successful login/sign up
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <div className="flex justify-center mb-6">
          <Image src="/wip.png" alt="Logo" width={150} height={150} />
        </div>
<<<<<<< HEAD
        <form onSubmit={handleAuth} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
=======
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
>>>>>>> 9a426a4f575cf7e415c702d2cec8f0caafb89613
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
<<<<<<< HEAD
              type="submit"
              className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              {isLogin ? 'Log in' : 'Sign up'}
            </button>
          </div>
          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              {isLogin ? 'Need an account? Sign up' : 'Have an account? Log in'}
            </button>
            <Link href="/home" className="font-bold text-sm text-blue-500 hover:text-blue-800">
              Forgot Password?
=======
              onClick={handleSignUp}
              className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Sign Up</span>
            </button>
            <Link href="/home">
              {/* <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"> */}
                Forgot Password?
              {/* </a> */}
>>>>>>> 9a426a4f575cf7e415c702d2cec8f0caafb89613
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
