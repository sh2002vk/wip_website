'use client'
import React, {useEffect, useState} from 'react';
import {string} from "prop-types";

export default function StudentProfileView() {
    // Initialize state with an empty profile structure
    const [profile, setProfile] = useState({
        name: '',
        age: '',
        school: '',
        schoolDetails: '',
        major: '',
        location: '',
        keywords: [] // Correctly initialized as an empty array
    });

    // Fetch profile data on component mount
    useEffect(() => {
        const fetchProfileData = async () => {
            // Placeholder for your actual API call
            const fetchedData = {
                name: 'Jane Doe',
                age: '29',
                school: 'University of British Columbia',
                schoolDetails: 'Robert H Lee School of Management',
                major: 'Business + Computer Science',
                location: 'Calgary - Alberta - Canada',
                keywords: ['C++', 'Python'] // Example keywords
            };

            setProfile(fetchedData);
        };

        fetchProfileData();
    }, []);

    // Common styles for text containers
    const textStyle = (fontWeight, fontSize, marginBottom = '0px') => ({
        textAlign: 'center',
        width: '80%',
        fontWeight,
        fontSize,
        marginBottom,
    });

    return (
        <div style={{display: 'flex', justifyContent: 'space-between', height: '100vh'}}>
            {/* Profile Overview Section */}
            <div style={{
                width: '300px',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderLeft: '1px solid black',
                padding: '10px 0 40px 0',
            }}>
                {/* Top-right Mini Profile Image */}
                <div>
                    <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                        <img
                            src='/wip.png'
                            alt="Mini Profile"
                            style={{width: '40px', height: '40px'}}
                        />
                    </div>

                    {/* Main Profile Image and Details */}
                    <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                        <img
                            src='/wip.png'
                            alt="Profile"
                            style={{
                                width: '180px',
                                height: '180px',
                                backgroundColor: '#ffffff',
                                borderRadius: '50%',
                                padding: '20px',
                                marginBottom: '20px',
                                objectFit: 'cover',
                            }}
                        />
                        <div style={textStyle('bolder', '20px')}>
                            <p>{profile.name} • {profile.age}</p>
                        </div>
                        <div style={textStyle('bold', '16px')}>
                            <p>{profile.school}</p>
                        </div>
                        <div style={textStyle('normal', '16px', '20px')}>
                            <p>{profile.schoolDetails} • {profile.major}</p>
                        </div>
                        <div style={{...textStyle('lighter', '16px'), marginBottom: '20px'}}>
                            <p>{profile.location}</p>
                        </div>
                        <div style={{...textStyle('bold', '16px'), color: '#FF6F00'}}>
                            <p>{profile.keywords.join(', ')}</p>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div style={{display: 'flex', justifyContent: 'center', gap: '10px', width: '100%'}}>
                    <button style={{
                        backgroundColor: '#FF6F00',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                    }}>Save profile to
                    </button>
                    <button style={{
                        backgroundColor: '#FF6F00',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                    }}>Contact
                    </button>
                </div>
            </div>

            {/* Placeholder for Additional Profile Details */}
            <div style={{
                flexGrow: 1,
                backgroundColor: '#d1d1d1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderLeft: '1px solid black',
                padding: '20px',
            }}>
                <h1>Student Profile</h1>
                <p>Profile Detail 1</p>
            </div>
        </div>
    );
}