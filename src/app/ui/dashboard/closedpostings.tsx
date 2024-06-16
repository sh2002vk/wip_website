import React from 'react';

const data = {
    closedPostings: 20,
    percentage: 20
}
const ClosedPostings = () => {
    return (
        <div className="h-full overflow-y-auto">
            <div className="p-4 sticky top-0">
                <h1 className="text-2xl font-light">Closed Postings:</h1>
            </div>
            <div className="p-4 sticky">
                <p className="text-7xl font-light text-orange-500">{data.closedPostings}</p>
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