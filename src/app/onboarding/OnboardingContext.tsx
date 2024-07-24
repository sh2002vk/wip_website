'use client';
import React, { createContext, useState, FC, ReactNode } from 'react';

interface OnboardingContextType {
    userDetails: {
        email: string;
        password: string;
        verificationCode: string;
        [key: string]: any; // You can add more fields as needed
    };
    setUserDetails: React.Dispatch<React.SetStateAction<{
        email: string;
        password: string;
        verificationCode: string;
        [key: string]: any;
    }>>;
}

export const OnboardingContext = createContext<OnboardingContextType>({
    userDetails: {
        email: '',
        password: '',
        verificationCode: '',
    },
    setUserDetails: () => {},
});

// Create a provider component
export const OnboardingProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [userDetails, setUserDetails] = useState({
        email: '',
        password: '',
        verificationCode: '',
    });

    return (
        <OnboardingContext.Provider value={{ userDetails, setUserDetails }}>
            {children}
        </OnboardingContext.Provider>
    );
};
