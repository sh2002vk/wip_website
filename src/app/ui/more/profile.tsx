'use client';

import React, { useState, ChangeEvent } from 'react';

type ProfileType = {
  name: string;
  company: string;
  position: string;
  email: string;
  location: string;
  hiringFor: string;
  area: string;
  documents: string;
  bio: string;
  contactEmail: string;
  phone: string;
  culture: string;
  learningOpportunities: string;
  benefits: string;
  photo: string;
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileType>({
    name: '',
    company: '',
    position: '',
    email: '',
    location: '',
    hiringFor: '',
    area: '',
    documents: '',
    bio: '',
    contactEmail: '',
    phone: '',
    culture: '',
    learningOpportunities: '',
    benefits: '',
    photo: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          photo: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full mx-auto bg-white p-2">
      {/* Left Section */}
      <div className="flex flex-col items-center md:w-1/3">
        <div className="flex flex-col items-center">
          <div className="relative mt-10 mb-4">
            {profile.photo ? (
              <img src={profile.photo} alt="Profile" className="rounded-full h-40 w-40 object-cover" />
            ) : (
              <div className="bg-gray-300 rounded-full h-40 w-40 flex items-center justify-center text-gray-600">
                No Image
              </div>
            )}
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
            )}
          </div>
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Name"
                className="mt-4 text-gray-600 border-gray-300 rounded text-sm text-center"
              />
              <input
                type="text"
                name="company"
                value={profile.company}
                onChange={handleChange}
                placeholder="Company"
                className="mt-2 text-gray-600 border-gray-300 rounded text-sm text-center"
              />
              <input
                type="text"
                name="position"
                value={profile.position}
                onChange={handleChange}
                placeholder="Position Title(s)"
                className="mt-2 text-gray-600 border-gray-300 rounded text-sm text-center"
              />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="mt-2 text-gray-600 border-gray-300 rounded text-sm text-center"
              />
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="City · Province · Country"
                className="mt-2 text-gray-600 border-gray-300 rounded text-sm text-center"
              />
            </>
          ) : (
            <>
              <h2 className="mt-4 text-xl font-bold">{profile.name || 'Name'}</h2>
              <p className="mt-2 text-gray-600">{profile.company || 'Company'}</p>
              <p className="mt-2 text-gray-600">{profile.position || 'Position Title(s)'}</p>
              <p className="mt-2 text-gray-600">{profile.email || 'email@example.com'}</p>
              <p className="mt-2 text-gray-600">{profile.location || 'City · Province · Country'}</p>
            </>
          )}
        </div>
        <div className="flex justify-center mt-auto mb-8">
          {isEditing ? (
            <button onClick={handleSave} className="bg-[#ff6f00] text-white px-3 py-3 rounded-lg w-40 transition-colors hover:bg-blue-400">Save</button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-[#ff6f00] text-white px-3 py-3 rounded-lg w-40 transition-colors hover:bg-blue-400">Edit Profile</button>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col md:w-2/3 p-4 space-y-6 mt-10 mr-8">
        <div className="flex flex-col mb-4 space-y-2">
          {isEditing ? (
            <>
              <div className="flex items-center mb-2">
                <p className="mr-2 w-32">Hiring for:</p>
                <input
                  type="text"
                  name="hiringFor"
                  value={profile.hiringFor}
                  onChange={handleChange}
                  placeholder="Google | Amazon | Facebook"
                  className="border-gray-300 rounded text-sm flex-grow"
                />
              </div>
              <div className="flex items-center mb-2">
                <p className="mr-2 w-32">Area:</p>
                <input
                  type="text"
                  name="area"
                  value={profile.area}
                  onChange={handleChange}
                  placeholder="Tech Roles"
                  className="border-gray-300 rounded text-sm flex-grow"
                />
              </div>
            </>
          ) : (
            <>
              <p><strong>Hiring for:</strong> {profile.hiringFor || 'Google | Amazon | Facebook'}</p>
              <p><strong>Area:</strong> {profile.area || 'Tech Roles'}</p>
              <p><strong>Documents:</strong> {profile.documents || 'Company, Logo Image'}</p>
            </>
          )}
        </div>

        <div className="mb-4 space-y-2">
          <h3 className="text-lg font-bold">Professional Bio</h3>
          {isEditing ? (
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              placeholder="Professional Bio"
              className="w-full border-gray-300 rounded text-sm"
            />
          ) : (
            <p>{profile.bio || 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis quas sapiente inventore totam ullam obcaecati amet consectetur animi nesciunt esse?'}</p>
          )}
        </div>

        <div className="mb-4 space-y-2">
          <h3 className="text-lg font-bold">Contact Information</h3>
          {isEditing ? (
            <>
              <div className="flex items-center mb-2">
                <p className="mr-2 w-32">Email:</p>
                <input
                  type="email"
                  name="contactEmail"
                  value={profile.contactEmail}
                  onChange={handleChange}
                  placeholder="something@email.com"
                  className="border-gray-300 rounded text-sm flex-grow"
                />
              </div>
              <div className="flex items-center mb-2">
                <p className="mr-2 w-32">Phone:</p>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="123-456-7890"
                  className="border-gray-300 rounded text-sm flex-grow"
                />
              </div>
            </>
          ) : (
            <>
              <p>Email: {profile.contactEmail}</p>
              <p>Phone: {profile.phone}</p>
            </>
          )}
        </div>

        <div className="mb-16 space-y-2">
          <h3 className="text-lg font-bold">Company Culture and Benefits</h3>
          {isEditing ? (
            <>
              <div className="flex items-center mb-2">
                <p className="mr-2 w-32">Culture:</p>
                <input
                  type="text"
                  name="culture"
                  value={profile.culture}
                  onChange={handleChange}
                  className="border-gray-300 rounded text-sm flex-grow"
                />
              </div>
              <div className="flex items-center mb-2">
                <p className="mr-2 w-32">Learning Opportunities:</p>
                <input
                  type="text"
                  name="learningOpportunities"
                  value={profile.learningOpportunities}
                  onChange={handleChange}
                  className="border-gray-300 rounded text-sm flex-grow"
                />
              </div>
              <div className="flex items-center mb-2">
                <p className="mr-2 w-32">Benefits:</p>
                <input
                  type="text"
                  name="benefits"
                  value={profile.benefits}
                  onChange={handleChange}
                  className="border-gray-300 rounded text-sm flex-grow"
                />
              </div>
            </>
          ) : (
            <>
              <p>Culture: {profile.culture}</p>
              <p>Learning Opportunities: {profile.learningOpportunities}</p>
              <p>Benefits: {profile.benefits}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
