'use client';

import React, { useState, ChangeEvent, useRef } from 'react';
import Select from 'react-select';

type ExperienceType = {
  title: string;
  description: string;
};

type ProfileType = {
  name: string;
  email: string;
  location: string;
  institution: string;
  degree: string;
  specialization: string;
  lookingFor: { value: string; label: string }[];
  availability: string;
  about: string;
  skills: string;
  experiences: ExperienceType[];
  photo: string;
};

const roles = [
  { value: 'Software Engineer', label: 'Software Engineer' },
  { value: 'Business Analyst', label: 'Business Analyst' },
  { value: 'Project Manager', label: 'Project Manager' },
  { value: 'Data Scientist', label: 'Data Scientist' },
  { value: 'Product Manager', label: 'Product Manager' }
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileType>({
    name: '',
    email: '',
    location: '',
    institution: '',
    degree: '',
    specialization: '',
    lookingFor: [],
    availability: '',
    about: '',
    skills: '',
    experiences: [],
    photo: '',
  });

  const photoInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleExperienceChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => {
      const updatedExperiences = [...prevProfile.experiences];
      updatedExperiences[index] = { ...updatedExperiences[index], [name]: value };
      return { ...prevProfile, experiences: updatedExperiences };
    });
  };

  const handleAddExperience = () => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      experiences: [...prevProfile.experiences, { title: '', description: '' }],
    }));
  };

  const handleRemoveExperience = (index: number) => {
    setProfile((prevProfile) => {
      const updatedExperiences = prevProfile.experiences.filter((_, i) => i !== index);
      return { ...prevProfile, experiences: updatedExperiences };
    });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: keyof ProfileType) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prevProfile) => ({
          ...prevProfile,
          [field]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLookingForChange = (selectedOptions: any) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      lookingFor: selectedOptions,
    }));
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
                onChange={(e) => handleFileChange(e, 'photo')}
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
              <input
                type="text"
                name="institution"
                value={profile.institution}
                onChange={handleChange}
                placeholder="Institution"
                className="mt-2 text-gray-600 border-gray-300 rounded text-sm text-center"
              />
              <input
                type="text"
                name="degree"
                value={profile.degree}
                onChange={handleChange}
                placeholder="Degree"
                className="mt-2 text-gray-600 border-gray-300 rounded text-sm text-center"
              />
              <input
                type="text"
                name="specialization"
                value={profile.specialization}
                onChange={handleChange}
                placeholder="Specialization"
                className="mt-2 text-gray-600 border-gray-300 rounded text-sm text-center"
              />
            </>
          ) : (
            <>
              <h2 className="mt-4 text-xl font-bold">{profile.name || 'Name'}</h2>
              <p className="mt-2 text-gray-600 ">{profile.email || 'email@example.com'}</p>
              <p className="mt-2 text-gray-600">{profile.location || 'City · Province · Country'}</p>
              <p className="mt-2 text-gray-600">{profile.institution || 'Institution'}</p>
              <p className="mt-2 text-gray-600">{profile.degree || 'Degree'}</p>
              <p className="mt-2 text-gray-600">{profile.specialization || 'Specialization'}</p>
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
        <div className="flex flex-col mb-2 space-y-4">
          {isEditing ? (
            <>
              <div className="flex items-center mb-2">
                <p className="mr-2 w-32">Looking For:</p>
                <Select
                  isMulti
                  name="lookingFor"
                  value={profile.lookingFor}
                  options={roles}
                  onChange={handleLookingForChange}
                  className="w-full text-sm "
                />
              </div>
              <div className="flex items-center mb-2">
                <p className="mr-2 w-32">Availability:</p>
                <input
                  type="text"
                  name="availability"
                  value={profile.availability}
                  onChange={handleChange}
                  placeholder="Summer 2024"
                  className="border-gray-300 rounded text-sm flex-grow"
                />
              </div>
            </>
          ) : (
            <>
              <p><strong>Looking For:</strong> {profile.lookingFor.length > 0 ? profile.lookingFor.map(option => option.label).join(', ') : 'Select roles'}</p>
              <p><strong>Availability:</strong> {profile.availability || 'Set your availability'}</p>
            </>
          )}
        </div>

        <div className="mb-4 space-y-2">
          <h3 className="font-bold">About</h3>
          {isEditing ? (
            <textarea
              name="about"
              value={profile.about}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              className="w-full border-gray-300 rounded text-sm max-w-full"
              style={{ maxWidth: '100%' }}
            />
          ) : (
            <p>{profile.about || 'Tell us about yourself'}</p>
          )}
        </div>

        <div className="mb-4 space-y-2">
          <h3 className="font-bold">Skill Set</h3>
          {isEditing ? (
            <textarea
            name="skills"
            value={profile.skills}
            onChange={handleChange}
            placeholder="List your skills"
            className="w-full border-gray-300 rounded text-sm max-w-full"
            style={{ maxWidth: '100%' }}
          />
          ) : (
            <p>{profile.skills || 'List your skills'}</p>
          )}
        </div>

        <div className="pb-2 space-y-2">
          <h3 className="font-bold">Previous Experience</h3>
          {isEditing ? (
            <>
              {profile.experiences.map((experience, index) => (
                <div key={index} className="mb-4 border p-4 rounded-lg relative">
                  <button
                    onClick={() => handleRemoveExperience(index)}
                    className="absolute top-0 left-0 bg-gray-400 text-white px-2 rounded-lg"
                  >
                    x
                  </button>
                  <div className="flex items-center ml-6 mb-2">
                    <p className="mr-2 w-32">Title:</p>
                    <input
                      type="text"
                      name="title"
                      value={experience.title}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Experience Title"
                      className="border-gray-200 rounded text-sm flex-grow"
                    />
                  </div>
                  <div className="flex items-center ml-6">
                    <p className="mr-2 w-32">Description:</p>
                    <textarea
                      name="description"
                      value={experience.description}
                      onChange={(e) => handleExperienceChange(index, e)}
                      placeholder="Describe your experience"
                      className="border-gray-200 rounded text-sm flex-grow"
                    />
                  </div>
                </div>
              ))}
              <button onClick={handleAddExperience} className="bg-blue-400 text-white px-3 py-2 rounded">
                Add Experience
              </button>
            </>
          ) : (
            <>
              {profile.experiences.length > 0 ? (
                profile.experiences.map((experience, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="text-md font-bold">{experience.title}</h4>
                    <p>{experience.description}</p>
                  </div>
                ))
              ) : (
                <p>No experiences added</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
