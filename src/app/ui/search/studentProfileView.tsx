'use client'
import React, {useEffect, useState} from 'react';
import {string} from "prop-types";

export default function StudentProfileView() {
    // Initialize state with an empty profile structure
    const [profileOverview, setProfileOverview] = useState({
        name: '',
        age: '',
        school: '',
        schoolDetails: '',
        major: '',
        location: '',
        keywords: [] // Correctly initialized as an empty array
    });

    const [profile, setProfile] = useState({
        bio: '',
        skills: [],
        experience: []
    });

    // Fetch profile data on component mount
    useEffect(() => {
        const fetchProfileOverviewData = async () => {
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

            setProfileOverview(fetchedData);
        };
        const fetchProfileData = async () => {
            // Placeholder for your actual API call
            const fetchedData = {
                bio: 'This is where the candidate will insert a concise introduction about themselves, where they will share some information about things they would like recruiters to know about them. We need to set a word limit to this section. Ideally this section will not be too long, but I’ve also included a scroll bar at the right just in case. ',
                skills: ['TPM', 'PM', 'Writing'],
                experience: ['Binance', 'Capital One']
            };
            setProfile(fetchedData);
        }

        fetchProfileOverviewData();
        fetchProfileData();
    }, []);

    const handleSaveProfile = () => {
        console.log('Save profile button clicked');
        // Here, you can add logic to save the profile
        // For example, making an API call to save the profile data
    };

    // Function to handle the "Contact" button click
    const handleContact = () => {
        console.log('Contact button clicked');
        // Here, you can add logic to initiate contact
        // For example, redirecting to a contact form or initiating an email
    };

    const handleExitProfileView = () => {
        console.log('Exit button clicked');
        // Here, you can add logic to save the profile
        // For example, making an API call to save the profile data
    };

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
                backgroundColor: '#ffffff',
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
                            <p>{profileOverview.name} • {profileOverview.age}</p>
                        </div>
                        <div style={textStyle('bold', '16px')}>
                            <p>{profileOverview.school}</p>
                        </div>
                        <div style={textStyle('normal', '16px', '20px')}>
                            <p>{profileOverview.schoolDetails} • {profileOverview.major}</p>
                        </div>
                        <div style={{...textStyle('lighter', '16px'), marginBottom: '20px'}}>
                            <p>{profileOverview.location}</p>
                        </div>
                        <div style={{...textStyle('bold', '16px'), color: '#FF6F00'}}>
                            <p>{profileOverview.keywords.join(', ')}</p>
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
                    }}
                            onClick={handleSaveProfile}
                    >
                        Save profile to
                    </button>
                    <button style={{
                        backgroundColor: '#FF6F00',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                    }}
                            onClick={handleContact}
                    >
                        Contact
                    </button>
                </div>
            </div>

            {/* Placeholder for Additional Profile Details */}
            <div style={{
                flexGrow: '1',
                backgroundColor: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                borderLeft: '1px solid black',
                padding: '20px'
            }}>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    {/* Use a button element instead of div for semantic correctness and accessibility */}
                    <button
                        onClick={handleExitProfileView}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: 0,
                            display: 'flex', // To keep the flex alignment
                            justifyContent: 'center',
                            alignItems: 'center', // Center the image inside the button
                        }}
                    >
                        <img
                            src='/wip.png'
                            alt="Exit Profile View"
                            style={{width: '40px', height: '40px'}}
                        />
                    </button>
                </div>
                <div>
                    <p>Looking for</p>
                    <div style={{
                        fontWeight:'bold',
                        marginBottom:'20px'
                    }}>
                        <p>SOFTWARE DEVLOPER, PROGRAMMER, IT SPECIALIST</p>
                    </div>
                    <p>Availability</p>
                    <div style={{
                        fontWeight:'bold',
                        marginBottom:'20px'
                    }}>
                        <p>SUMMER 2024</p>
                    </div>
                    <p>Document highlights</p>
                    <div style={{
                        display: 'flex', // Enables flexbox layout
                        alignItems: 'center', // Aligns items vertically in the center
                        paddingTop: '10px', // Adds some padding around the container for spacing
                        paddingBottom: '20px'
                    }}>
                        <button style={{ marginRight: '10px', padding: '5px 20px', cursor: 'pointer', border: '1px grey solid', borderRadius: '10px' }}>Resume</button>
                        <button style={{ marginRight: '10px', padding: '5px 20px', cursor: 'pointer', border: '1px grey solid', borderRadius: '10px' }}>Cover Letter</button>
                        <button style={{ marginRight: '10px', padding: '5px 20px', cursor: 'pointer', border: '1px grey solid', borderRadius: '10px' }}>Transcript</button>
                        <button style={{ padding: '5px 20px', backgroundColor: '#FF6F00', cursor: 'pointer', border: '1px #FF6F00 solid', borderRadius: '10px', fontWeight:"bold",color:"white"}}>Personality Test</button>
                    </div>
                    <div style={{
                        fontWeight:"bold"
                    }}>
                        <p>About</p>
                    </div>
                    <div style={{
                        display: 'flex', // Makes the div a flex container
                        flexDirection: 'column', // Aligns children vertically
                        padding: '10px',
                        marginBottom: '20px', // Adds some padding around the content
                    }}>
                        <p style={{maxWidth:"850px"}}>{profile.bio}</p> {/*// This is bad*/}
                    </div>
                    <div style={{
                        fontWeight:"bold"
                    }}>
                        <p>Skill Sets</p>
                    </div>
                    <p style={{fontWeight:'normal', marginBottom:'20px'}}>{profile.skills.join(', ')}</p>
                    <div style={{
                        fontWeight:"bold"
                    }}>
                        <p>Previous Experience</p>
                    </div>
                    <div>
                        {profile.experience.map((item, index) => (
                            <p key={index} style={{ fontWeight: 'normal' }}>
                                {item}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}