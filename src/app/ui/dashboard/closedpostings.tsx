import React, {useEffect, useState} from 'react';

const data = {
    closedPostings: 20,
    percentage: 20
}
const ClosedPostings = ({user}) => {

    const [closedPostings, setClosedPostings] = useState([]);
    const fetchClosedPostings = async () => {
        try {
            const response = await fetch(`http://localhost:4000/action/recruiter/getApplications?recruiterID=${user.uid}`)
            const applications = await response.json();
            const completedApps = applications.filter(application => application.Status == 'COMPLETE');
            setClosedPostings(completedApps);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchClosedPostings();
    }, [user.uid])

    return (
        <div className="h-full overflow-y-auto">
            <div className="p-4 sticky top-0">
                <h1 className="text-2xl font-light">Closed Postings:</h1>
            </div>
            <div className="p-4 sticky">
                <p className="text-7xl font-light text-[#ff6f00]">{closedPostings.length}</p>
            </div>
            <div className="p-4 sticky w-1/2">
                <p className="text-lg font-light ">{'This beats '}
                    <span className="text-lg font-light">{data.percentage + '% '}</span>
                    <span className="text-lg font-light">{'of the recruiters on our platform.'}</span>
                </p>
            </div>
        </div>
    )
};

export default ClosedPostings;