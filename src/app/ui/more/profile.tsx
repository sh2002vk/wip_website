'use client';

import React, { useState, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';


type ProfileType = {
  name: string;
  company: string;
  position: string;
  email: string;
  location: string;
  hiringFor: string[];
  // area: string;
  // documents: string;
  // bio: string;
  contactEmail: string;
  phone: string;
  linkedInProfile: string;
  // culture: string;
  // learningOpportunities: string;
  // benefits: string;
  photo: string;
};

export default function Profile(user) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileType>({
    name: '',
    company: '',
    position: '',
    email: '',
    location: '',
    hiringFor: [],
    // area: '',
    // documents: '',
    // bio: '',
    contactEmail: '',
    phone: '',
    linkedInProfile: '',
    // culture: '',
    // learningOpportunities: '',
    // benefits: '',
    photo: '',
  });

  // Added to store the original profile data
  const [originalProfile, setOriginalProfile] = useState<ProfileType>(profile);

  //Since there are some attributes missing in the backend, need to filter the profile and pass the correct variables to the backend
  const getAvailableFields = (profile) => {
    // Mapping from frontend keys to backend keys
    const keyMapping = {
      name: ['FirstName', 'LastName'], // name should be split into FirstName and LastName
      company: 'CompanyName',
      email: 'EmailID',
      location: 'Locations',
      position: 'Roles',
      phone: 'PhoneNumber',
      linkedInProfile: 'LinkedInProfile',
    };
  
    let filteredProfile = {};
  
    for (let key in keyMapping) {
      if (profile[key]) {
        if (Array.isArray(keyMapping[key])) {
          // Handle case where one key maps to multiple backend keys
          filteredProfile[keyMapping[key][0]] = profile[key].split(' ')[0];
          filteredProfile[keyMapping[key][1]] = profile[key].split(' ')[1];
        } else {
          filteredProfile[keyMapping[key]] = profile[key];
        }
      }
    }
  
    return filteredProfile;
  };

  const updateProfile = async (updatedProfile) => {
    const filteredProfile = getAvailableFields(updatedProfile);

    try {
      const response = await fetch('http://localhost:4000/account/recruiter/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recruiterID: user.user.uid,
          updatedData: filteredProfile
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Profile updated successfully:', data);
        setOriginalProfile(updatedProfile); // Save the updated profile as the new original
      } else {
        console.error('Failed to update profile:', data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  {/*Replace with actual api endpoint once launched */}
  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:4000/profile/recruiter/getFullProfile?recruiterID=${user.user.uid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {

          //If no problem fetching recruiter profile, fetch their job posting titles
          const jobRolesResponse = await fetch(`http://localhost:4000/action/job/getJobRoles?recruiterID=${user.user.uid}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const jobRolesData = await jobRolesResponse.json();
          let topJobRoles: string[] = [];

          if (jobRolesResponse.ok) {
            console.log(jobRolesData);
            topJobRoles = getTopJobRoles(jobRolesData);
          } else {
            console.error(jobRolesData.message);
          }


          let recruiter = data.data;
          const fetchedProfile = {
            name: `${recruiter.FirstName} ${recruiter.LastName}`,
            company: recruiter.CompanyName,
            position: recruiter.Roles,
            email: recruiter.EmailID,
            location: recruiter.Locations || '', //********Need to discuss about how to separate city, province and country
            hiringFor: topJobRoles || [], //********Need to discuss about how to separate different roles
                        // area: recruiter.Area || 'TODO', //Need to add this attribute to backend
            // documents: recruiter.Documents || 'TODO', //Need to add this attribute to backend
            // bio: recruiter.Bio || 'Need to add this attribute to backend', //Need to add this attribute to backend
            contactEmail: recruiter.EmailID,
            phone: recruiter.PhoneNumber || '',
            linkedInProfile: recruiter.LinkedInProfile || '',
                        // culture: recruiter.Culture || 'Need to add this attribute to backend', //Need to add this attribute to backend
            // learningOpportunities: recruiter.LearningOpportunities || 'Need to add this attribute to backend', //Need to add this attribute to backend
            // benefits: recruiter.Benefits || 'Need to add this attribute to backend', //Need to add this attribute to backend
            photo: '',
          };

          setProfile(fetchedProfile);
          setOriginalProfile(fetchedProfile); // Store the fetched profile as the original
        } else {
          console.error('Failed to fetch profile:', data.message);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [user.user.uid]);

  //Combined use for api call to job/getJobRoles, this function will count the top 4 most frequently appearing job titles the recruiter post
  const getTopJobRoles = (jobRolesData) => {
    const jobRoleCounts = jobRolesData.reduce((acc, role) => {
      acc[role] = (acc[role] || 0) + 1;
      return acc;
    }, {});

    const sortedJobRoles = Object.entries(jobRoleCounts).sort((a, b) => b[1] - a[1]);
    return sortedJobRoles.slice(0, 4).map(entry => entry[0]);
  };


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log(profile);

  updateProfile(profile);
  };

  const handleCancel = () => {
    setProfile(originalProfile); // Revert to the original profile
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

  const handleOpenLinkedinProfile = () => {
    if(profile.linkedInProfile){
      console.log(profile.linkedInProfile);
      try {
        let url = new URL(profile.linkedInProfile);
        window.open(url, '_blank', 'noopener,noreferrer');

      } catch (e) {
        console.error("Invalid URL: ", e);
      }
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
                className="mt-4 text-black border-gray-300 rounded text-sm text-center"
              />
              <input
                type="text"
                name="company"
                value={profile.company}
                onChange={handleChange}
                placeholder="Company"
                className="mt-2 text-black border-gray-300 rounded text-sm text-center"
              />
              <input
                type="text"
                name="position"
                value={profile.position}
                onChange={handleChange}
                placeholder="Position Title(s)"
                className="mt-2 text-black border-gray-300 rounded text-sm text-center"
              />
              <p className="mt-2 text-black">{profile.email || 'email@example.com'}</p>
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleChange}
                placeholder="City · Province · Country"
                className="mt-2 text-black border-gray-300 rounded text-sm text-center"
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
        <div className="flex justify-center mt-auto mb-8 space-x-2">
          {isEditing ? (
            <>
              <button 
                onClick={handleSave} 
                className="bg-[#ff6f00] text-white px-3 py-3 rounded-lg w-24 transition-colors hover:bg-blue-400"
              >
                Save
              </button>
              <button 
                onClick={handleCancel} 
                className="bg-gray-300 text-black px-3 py-3 rounded-lg w-24 transition-colors hover:bg-gray-400"
              >
                Cancel
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="bg-[#ff6f00] text-white px-3 py-3 rounded-lg w-40 transition-colors hover:bg-blue-400">Edit Profile</button>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col md:w-2/3 p-4 space-y-6 mt-10 mr-8">
        <p>
          <strong>Hiring for:</strong> 
          {profile.hiringFor.map((role, index) => (
              <div key={index} className="">
                <p>{role}</p>
              </div>
          ))}
        </p>

        {/* <div className="mb-4 space-y-2">
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
        </div> */}

        <div className="mb-4 space-y-2">
          <h3 className="text-lg font-bold">Contact Information</h3>
          {isEditing ? (
            <>
              <div className="flex items-center mb-2">
                <p className="mr-2 w-32">Email:</p>
                {/* <input
                  type="email"
                  name="contactEmail"
                  value={profile.contactEmail}
                  onChange={handleChange}
                  placeholder="something@email.com"
                  className="border-gray-300 rounded text-sm flex-grow"
                /> */}
                <p>{profile.contactEmail}</p>
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
              <div className="flex items-center mb-2">
                <p className="mr-2 w-32">LinkedIn Profile:</p>
                <input
                  type="text"
                  name="linkedInProfile"
                  value={profile.linkedInProfile}
                  onChange={handleChange}
                  placeholder="https://www.linkedin.com/in/example/"
                  className="border-gray-300 rounded text-sm flex-grow"
                />
              </div>
            </>
          ) : (
            <>
              <p>Email: {profile.contactEmail}</p>
              <p>Phone: {profile.phone}</p>
              <p onClick={handleOpenLinkedinProfile} style={{ cursor: 'pointer' }}>                    
                <FontAwesomeIcon icon={faLinkedin} size="xl"/>
                &nbsp; LinkedIn Profile
              </p>
            </>
          )}
        </div>

        {/*
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
        */}
      </div>
    </div>
  );
}
