import React, {useEffect, useState} from 'react';
const API_URL = process.env.API_URL

// const data = [
//     {
//         days: '4',
//         progress: 15,
//         reviewed: 15,
//         applied: 100,
//         role: 'Software Dev',
//         saves: '2',
//         applicants: [
//             {
//                 name: 'jeff',
//                 imageUrl: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg'
//             }
//         ]
//     },
//     {
//         days: '22',
//         progress: 50,
//         reviewed: 1,
//         applied: 2,
//         role: 'Data Scientist',
//         saves: '9',
//         applicants: [
//             {
//                 name: 'jeff',
//                 imageUrl: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg'
//             },
//             {
//                 name: 'ralph',
//                 imageUrl: 'https://kidszoo.org/wp-content/uploads/2017/06/IMG_2034-2-scaled.jpg'
//             }
//         ]
//     },
//     {
//         days: '14',
//         progress: 20,
//         reviewed: 5,
//         applied: 25,
//         role: 'Product Manager',
//         saves: '14',
//         applicants: [
//             {
//                 name: 'jeff',
//                 imageUrl: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg'
//             },
//             {
//                 name: 'ralph',
//                 imageUrl: 'https://kidszoo.org/wp-content/uploads/2017/06/IMG_2034-2-scaled.jpg'
//             },
//             {
//                 name: 'bonky',
//                 imageUrl: 'https://static.wixstatic.com/media/26033f_3f35e4c31fae46a3bc0cf00873fd747c~mv2.jpg/v1/fill/w_624,h_528,al_c,q_80,enc_auto/26033f_3f35e4c31fae46a3bc0cf00873fd747c~mv2.jpg'
//             }
//         ]
//     },
//     {
//         days: '12',
//         progress: 90,
//         reviewed: 9,
//         applied: 10,
//         role: 'Project Manager',
//         saves: '12',
//         applicants: [
//             {
//                 name: 'jeff',
//                 imageUrl: 'https://i.natgeofe.com/k/7ce14b7f-df35-4881-95ae-650bce0adf4d/mallard-male-standing_square.jpg'
//             },
//             {
//                 name: 'ralph',
//                 imageUrl: 'https://kidszoo.org/wp-content/uploads/2017/06/IMG_2034-2-scaled.jpg'
//             },
//             {
//                 name: 'bonky',
//                 imageUrl: 'https://static.wixstatic.com/media/26033f_3f35e4c31fae46a3bc0cf00873fd747c~mv2.jpg/v1/fill/w_624,h_528,al_c,q_80,enc_auto/26033f_3f35e4c31fae46a3bc0cf00873fd747c~mv2.jpg'
//             },
//             {
//                 name: 'bonky21',
//                 imageUrl: 'https://static.wixstatic.com/media/26033f_3f35e4c31fae46a3bc0cf00873fd747c~mv2.jpg/v1/fill/w_624,h_528,al_c,q_80,enc_auto/26033f_3f35e4c31fae46a3bc0cf00873fd747c~mv2.jpg'
//             }
//         ]
//     }
// ];
const ActivePostings = ({user}) => {

    const [data, setData] = useState([]);

    const fetchRowInformation = async () => {
        try {
            const response = await fetch(`${API_URL}/action/recruiter/getActivePostingInformation?recruiterID=${user.uid}`)
            const rows = await response.json();
            // console.log(rows);
            setData(rows);
        } catch (error) {
            console.log(error);
        }
    }

    const daysUntilClosed = (dateClosed: string) => {
        const today = new Date().getTime(); // Current time in milliseconds
        const closedDate = new Date(dateClosed).getTime(); // Closed date in milliseconds
        const differenceInTime = closedDate - today;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
        return differenceInDays;
    };    

    useEffect(() => {
        fetchRowInformation();
    }, [user.uid])

    return (
        <div className="h-full overflow-y-auto">
            <div className="p-1 sticky top-0 bg-[#F5f5f5] z-30">
                <h1 className="text-xl font-semibold">
                    Your Active Postings
                    <span className="bg-gray-200 text-sm font-medium py-1 px-2 rounded-full ml-2">
                        {data.length}
                    </span>
                </h1>
                <div className="grid grid-cols-5 gap-4 border-b pb-2 mt-4">
                    <div className="text-left text-medium" style={{ width: '120px' }}></div>
                    <div className="text-center text-medium" style={{ width: '100px' }}>
                        Days
                        <span className="ml-1 text-xs text-gray-300 transform relative">
                            ▼
                        </span>
                    </div>
                    <div className="text-left text-medium" style={{ width: '150px' }}>
                        Applicants
                        <span className="ml-1 text-xs text-gray-300 transform relative">
                            ▼
                        </span>
                    </div>
                    <div className="ml-8 text-center text-medium" style={{ width: '90px' }}>
                        Progress
                        <span className="ml-1 text-xs text-gray-300 transform relative">
                            ▼
                        </span>
                    </div>
                    <div className="ml-4 text-center text-medium" style={{ width: '80px' }}>
                        Saves
                        <span className="ml-1 text-xs text-gray-300 transform relative">
                            ▼
                        </span>
                    </div>
                </div>
            </div>

            <div className="p-1 pt-0">
                {Array.isArray(data) && data.map((item, index) => (
                    <div key={index} className="grid grid-cols-5 gap-4 items-center py-3 border-b">
                        <div className="text-left" style={{ width: '120px' }}>
                            <span className="text-medium font-medium">{item.job.Role}</span>
                        </div>
                        <div className="text-center" style={{ width: '100px' }}>
                            <span className="text-medium font-light">{daysUntilClosed(item.job.DateClosed)}</span>
                        </div>
                        <div className="relative flex items-center text-left" style={{ width: '150px' }}>
                            <div className="relative">
                                {item.applications.length > 0 && (
                                    <div className="w-10 h-10 rounded-full overflow-hidden z-20 relative flex items-center justify-center bg-gray-300">
                                        {/*<img src={item.applicants.imageUrl} alt={item.role} className="w-full h-full object-cover" />*/}
                                        <div className="text-lg font-bold text-gray-500">{item.applications[0].Student.FirstName.charAt(0)}</div>
                                    </div>
                                )}
                                {item.applications.length > 1 && (
                                    <div className="w-6 h-6 rounded-full overflow-hidden absolute bottom-0 left-8 z-10 flex items-center justify-center bg-gray-300">
                                        {/*<img src={item.applicants.imageUrl} alt={item.role} className="w-full h-full object-cover" />*/}
                                        <div className="text-sm font-bold text-gray-500">{item.applications[1].Student.FirstName.charAt(0)}</div>
                                    </div>
                                )}
                            </div>
                            {item.applications.length > 1 && (
                                <span className="ml-5 text-gray-400 text-xs">+ {item.applications.length - 2} others</span>
                            )}
                        </div>
                        <div className="ml-8 flex flex-col items-center" style={{ width: '90px' }}>
                            <div className="relative w-8/12 max-w-xs h-3 bg-orange-200 rounded-full">
                                <div
                                    className="absolute top-0 left-0 h-full bg-orange-400 rounded-full"
                                    style={{ width: `${item.percentage}%` }}
                                ></div>
                            </div>
                            <span className="mt-2 text-gray-400 text-sm">
                                {item.interactedApplications}/{item.applications.length}
                            </span>
                        </div>
                        <div className="ml-4 text-center" style={{ width: '80px' }}>
                            <span className="text-medium font-light">{item.saves}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActivePostings;