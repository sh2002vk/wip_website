//only serving for the students
'use client'
import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setLoading(false);
        router.push('./'); // Redirect to student home
      }
      setLoading(false); // Set loading to false after user state is updated
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);