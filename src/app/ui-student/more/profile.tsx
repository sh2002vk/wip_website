'use client';

import React, {useState, ChangeEvent, useRef, useEffect} from 'react';
import Select from 'react-select';

type ExperienceType = {
  company: string;
  title: string;
  description: string | null;
};

type ProfileType = {
  firstName: string;
  lastName: string;
  email: string;
  location: string | null;
  institution: string;
  // degree: string;
  specialization: string;
  lookingFor: { value: string; label: string }[];
  startAvailability: string | null;
  availability: string | null;
  about: string;
  skills: string;
  experiences: ExperienceType[];
  photo: string;
};

const roles = [
  { value: 'Software Engineer', label: 'Software Engineer' },
  { value: 'Frontend Engineer', label: 'Frontend Engineer' },
  { value: 'Business Analyst', label: 'Business Analyst' },
  { value: 'Product Manager', label: 'Product Manager' },
  { value: 'Project Manager', label: 'Project Manager' },
  { value: 'Data Scientist', label: 'Data Scientist' },
  { value: 'Consultant', label: 'Consultant' },
  { value: 'Financial Analyst', label: 'Financial Analyst' }
];

const locations = [
  { value: 'Vancouver, BC', label: 'Vancouver, BC' },
  { value: 'Surrey, BC', label: 'Surrey, BC' },
  { value: 'Coquitlam, BC', label: 'Coquitlam, BC' },
  { value: 'North Vancouver, BC', label: 'North Vancouver, BC' },
  { value: 'Delta, BC', label: 'Delta, BC' },
  { value: 'West Vancouver, BC', label: 'West Vancouver, BC' },
  { value: 'Richmond, BC', label: 'Richmond, BC' },
  { value: 'Calgary, AB', label: 'Calgary, AB' },
  { value: 'Seattle, WA', label: 'Seattle, WA' },
  { value: 'Toronto, ON', label: 'Toronto, ON' },
]

const terms = [
    "F24",
    "W25",
    "S25",
    "F25"
]

const duration = [
  "4 Months",
  "8 Months",
  "12+ Months"
]
const durationMap: { [key: string]: string } = {
  "4 Months": "4",
  "8 Months": "8",
  "12+ Months": "12"
}

export default function Profile(user) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileType>({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    institution: '',
    // degree: '',
    specialization: '',
    lookingFor: [],
    startAvailability: '',
    availability: '',
    about: '',
    skills: '',
    experiences: [],
    photo: '',
  });
  const [photoURL, setPhotoURL] = useState('');

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
      experiences: [...prevProfile.experiences, { title: '', description: '' , company: ''}],
    }));
  };

  const handleRemoveExperience = (index: number) => {
    setProfile((prevProfile) => {
      const updatedExperiences = prevProfile.experiences.filter((_, i) => i !== index);
      return { ...prevProfile, experiences: updatedExperiences };
    });
  };

  const handleSave = () => {
    console.log(profile);
    if (profile.firstName && profile.lastName && profile.email && profile.experiences.every(exp => exp.company && exp.title)) {
      setIsEditing(false);
      updateProfile(profile);
    } else {
      // Handle the case where required fields are not filled
      alert('Please fill out the required fields.');
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>, field: keyof ProfileType) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);

      try {
        const response = await fetch('http://localhost:4000/photo/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload photo');
        }

        const data = await response.json();
        console.log(data);

        setPhotoURL(data.url);
        setProfile((prevProfile) => ({
          ...prevProfile,
          photo: file.name,
        }));

      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleLookingForChange = (selectedOptions: any) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      lookingFor: selectedOptions,
    }));
  };

  const handleLocationChange = (selectedOptions: any) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      location: selectedOptions?.value || null,
    }));
  };

  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);

  const handleOptionChange = (key, option) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [key]: option,
    }));

    if (key === 'startAvailability') {
      setSelectedTerm(option);
    } else if (key === 'availability') {
      setSelectedDuration(option);
    }
  };

  {/*Replace with actual api endpoint once launched */}
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:4000/profile/student/getFullProfile?studentID=${user.user.uid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {

          let student = data.data;
          console.log("STUDENT", student)
          const interests = student.Interest ? student.Interest.map(interest => ({
            value: interest,
            label: interest
          })) : [];
          const workExp = student.WorkExperience ? student.WorkExperience.map(exp => ({
            company: exp.company,
            title: exp.title,
            description: exp.description || '',
          })) : [];
          console.log("WORKEXP", workExp);

          setProfile((prevProfile) => ({
            ...prevProfile,
            firstName: student.FirstName,
            lastName: student.LastName,
            email: student.EmailID,
            location: student.Location,
            institution: student.School,
            specialization: student.AcademicMajor,
            lookingFor: interests,
            startAvailability: student.StartAvailability,
            availability: `${student.Duration}`,
            about: student.PersonalStatement,
            skills: student.Skills ? student.Skills.join(', ') : '',
            experiences: workExp,
            photo: student.Photo || '', // Use existing photoURL or default to empty string
          }));

          setSelectedTerm(student.StartAvailability);
          setSelectedDuration(student.Duration);
          console.log("updated work exp to", student.WorkExperience);

          console.log("FETHCED", data.data);

        } else {
          console.error('Failed to fetch profile:', data.message);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    setLoading(true);
    fetchProfile();
    setLoading(false);
  }, [user.user.uid]);


  const fetchSignedURL = async (filename: string) => {
    try {
      const response = await fetch(`http://localhost:4000/photo/generate-signed-url?filename=${filename}`);
      if (!response.ok) {
        throw new Error('Failed to fetch signed URL');
      }
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error('Error fetching signed URL:', error);
      return '';
    }
  };
  React.useEffect(() => {
    if (profile.photo) {
      fetchSignedURL(profile.photo).then((url) => {
        setPhotoURL(url);
      });
    }
  }, [profile.photo]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  const getAvailableFields = (profile) => {
    // Mapping from frontend keys to backend keys
    const keyMapping = {
      firstName: 'FirstName',
      lastName: 'LastName',
      email: 'EmailID',
      location: 'Location',
      institution: 'School',
      specialization: 'AcademicMajor',
      lookingFor: 'Interest', // This needs to be handled differently since it's an array of objects
      startAvailability: 'StartAvailability',
      availability: 'Duration',
      about: 'PersonalStatement',
      skills: 'Skills', // This needs to be handled differently since it's a comma-separated string
      experiences: 'WorkExperience', // This needs to be handled differently since it has to map title to position
      photo: 'Photo', // Assuming there's a photo attribute
    };

    let filteredProfile = {};

    for (let key in keyMapping) {
        if (key === "firstName") {
          // Handle case where one key maps to multiple backend keys
          filteredProfile[keyMapping[key]] = profile[key] ? profile[key] : '';
        } else if (key === "lastName") {
          filteredProfile[keyMapping[key]] = profile[key] ? profile[key] : '';
        } else if (key === 'availability') {
          filteredProfile[keyMapping[key]] = profile[key] !== '' ? profile[key] : null;
        } else if (key === 'lookingFor') {
          filteredProfile[keyMapping[key]] = profile[key] ? profile[key].map(item => item.value) : []; // Convert to array of strings
        } else if (key === 'skills') {
          filteredProfile[keyMapping[key]] = profile[key] ? profile[key].split(',').map(skill => skill.trim()) : [];
        } else if (key === 'experiences') {
          filteredProfile[keyMapping[key]] = profile[key].map(exp => ({
            ...exp
          }));
        } else {
          filteredProfile[keyMapping[key]] = profile[key];
        }
    }

    return filteredProfile;
  };


  const updateProfile = async (updatedProfile) => {
    const filteredProfile = getAvailableFields(updatedProfile);

    try {
      const response = await fetch('http://localhost:4000/account/student/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentID: user.user.uid,
          updatedData: filteredProfile
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Profile updated successfully:', data);
      } else {
        console.error('Failed to update profile:', data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const [touchedFields, setTouchedFields] = useState({ firstName: false, lastName: false });
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const getInputClassName = (name) => {
    return `mt-4 text-gray-600 rounded text-sm text-center ${
        touchedFields[name] && !profile[name] ? 'border-red-500' : 'border-gray-300'
    }`;
  };


  return (
    <div className="flex flex-col md:flex-row h-screen w-full mx-auto bg-white p-2">
      {/* Left Section */}
      <div className="flex flex-col items-center md:w-1/3">
        <div className="flex flex-col items-center">
          <div className="relative mt-10 mb-4">
            {photoURL ? (
              <img src={photoURL} alt="Profile" className="rounded-full h-40 w-40 object-cover" />
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
                name="firstName"
                value={profile.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="First Name"
                className={getInputClassName('firstName')}
              />
              <input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="First Name"
                  className={getInputClassName('lastName')}
              />
              {/* <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="mt-2 text-gray-600 border-gray-300 rounded text-sm text-center"
              /> */}
              <Select
                  name="location"
                  value={locations.find(loc => loc.label === profile.location)}
                  options={locations}
                  onChange={handleLocationChange}
                  className="mt-2 text-gray-600 border-gray-300 rounded text-sm text-center w-full"
                  placeholder="City · Province · Country"
                  isClearable
              />
              <input
                type="text"
                name="institution"
                value={profile.institution}
                onChange={handleChange}
                placeholder="Institution"
                className="mt-2 text-gray-600 border-gray-300 rounded text-sm text-center"
              />
              {/* <input
                type="text"
                name="degree"
                value={profile.degree}
                onChange={handleChange}
                placeholder="Degree"
                className="mt-2 text-gray-600 border-gray-300 rounded text-sm text-center"
              /> */}
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
              <h2 className="mt-4 text-xl font-bold">{profile.firstName + " " + profile.lastName || 'Name'}</h2>
              <p className="mt-2 text-gray-600 ">{profile.email || 'email@example.com'}</p>
              <p className="mt-2 text-gray-600">{profile.location || 'City · Province · Country'}</p>
              <p className="mt-2 text-gray-600">{profile.institution || 'Institution'}</p>
              {/* <p className="mt-2 text-gray-600">{profile.degree || 'Degree'}</p> */}
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
                {duration.map((option, optionIndex) => (
                    <button
                        key={optionIndex}
                        onClick={() => handleOptionChange("availability", durationMap[option])}
                        className={`px-4 py-1 mt-2 mr-2 border rounded transition duration-300 ${
                            selectedDuration === durationMap[option]
                                ? 'border-black font-bold'
                                : 'border-gray-300 text-gray-300'
                        }`}
                    >
                      {option}
                    </button>
                ))}
              </div>
              <div className="flex items-center mb-2">
                <p className="mr-2 w-32">Start Term:</p>
                {terms.map((option, optionIndex) => (
                    <button
                        key={optionIndex}
                        onClick={() => handleOptionChange("startAvailability", option)}
                        className={`px-4 py-1 mt-2 mr-2 border rounded transition duration-300 ${
                            selectedTerm === option
                                ? 'border-black font-bold'
                                : 'border-gray-300 text-gray-300'
                        }`}
                    >
                      {option}
                    </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p><strong>Looking For:</strong> {profile.lookingFor.length > 0 ? profile.lookingFor.map(option => option.label).join(', ') : 'Select roles'}</p>
              <p><strong>Availability:</strong> {profile.availability ? profile.availability + " Months" : 'Set your availability'}</p>
              <p><strong>Starting Term:</strong> {profile.startAvailability ? profile.startAvailability : 'Set your starting term'}</p>
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
            placeholder="Comma-seperate your skills"
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
                    <p className="mr-2 w-32">Company: <span className="text-red-500">*</span></p>
                    <input
                        type="text"
                        name="company"
                        value={experience.company}
                        onChange={(e) => handleExperienceChange(index, e)}
                        placeholder="Employer"
                        className="border-gray-200 rounded text-sm flex-grow"
                    />
                  </div>
                  <div className="flex items-center ml-6 mb-2">
                    <p className="mr-2 w-32">Title: <span className="text-red-500">*</span></p>
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
                      value={experience.description || ''}
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
                  <div key={index} className="experience-item mb-4 pl-4 border-l-4 border-gray-300">
                    <h4 className="text-md font-bold">{experience.title} - {experience.company}</h4>
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
