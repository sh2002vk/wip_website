'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type LayoutProps = {
  children: React.ReactNode;
  title?: string;
};

const PasswordLayout = ({ children, title }: LayoutProps) => {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col justify-center items-center bg-gray-100 w-full h-screen">
        <div className="w-full p-2 max-w-2xl text-center rounded-lg">
          <h1 className="text-4xl font-semibold mb-4">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

const Password = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [passwordRequirements, setPasswordRequirements] = useState({
    length: false,
    uppercase: false,
    number: false,
    symbol: false
  });
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (formData.password === formData.confirmPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password) => {
    const requirements = {
      length: password.length >= 12,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordRequirements(requirements);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password submission logic here
    console.log(formData);
    router.push('/onboarding/welcome');
  };

  return (
    <PasswordLayout title="Keeping your account secure">
      <p className="text-lg font-light mb-8">
        Let’s set up your password
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-left mb-1" htmlFor="password">Password<span className="text-red-500">*</span></label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full p-3 pl-3 border-none rounded-3xl"
            required
          />
          <div className="text-left mt-2">
            <p className="text-sm font-light mb-1">
              Requirements:
            </p>
            <ul className="list-none text-sm font-light">
              <li className={`flex items-center ${passwordRequirements.length ? "text-[#ff7002]" : "text-gray-500"}`}>
                ✓ Be at least 12 characters
              </li>
              <li className={`flex items-center ${passwordRequirements.uppercase ? "text-[#ff7002]" : "text-gray-500"}`}>
                ✓ Include at least one uppercase letter
              </li>
              <li className={`flex items-center ${passwordRequirements.number ? "text-[#ff7002]" : "text-gray-500"}`}>
                ✓ Include at least one number
              </li>
              <li className={`flex items-center ${passwordRequirements.symbol ? "text-[#ff7002]" : "text-gray-500"}`}>
                ✓ Include at least one symbol
              </li>
            </ul>
          </div>
        </div>
        <div>
          <label className="block text-left mb-1" htmlFor="confirmPassword">Confirm password<span className="text-red-500">*</span></label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
            className="w-full p-3 pl-3 border-none rounded-3xl"
            required
          />
          <div className="text-left mt-2">
            {formData.confirmPassword && (
              <p className={`text-sm font-light ${passwordsMatch ? "text-green-500" : "text-red-500"}`}>
                {passwordsMatch ? "Passwords match" : "Passwords do not match"}
              </p>
            )}
          </div>
        </div>
        <div className="text-center mt-6">
          <button type="submit" className="bg-[#ff7002] text-white rounded-full px-6 py-3">Submit</button>
        </div>
      </form>
    </PasswordLayout>
  );
};

export default Password;
