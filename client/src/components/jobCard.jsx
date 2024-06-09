import { Link } from "react-router-dom";

export default function JobCard({ job, isDetailsPageLayout }) {

    return (
        <div className="w-96 min-h-48 h-fit shadow-lg border-gray-300 border rounded-md m-5 p-5 text-xl">
            <div className="border-gray-300 border-b pb-3">
                <div className="flex justify-between items-center">
                    <h1>{job.position}</h1>
                    <p className="text-gray-400 text-sm">{job.company}</p>
                </div>
                <p className="text-sm font-thin text-justify mt-2">{job.description}</p>
            </div>
            <div className="flex flex-wrap justify-between text-xs pt-3 uppercase text-gray-500">
                <p className="m-1 px-2 py-1 border-gray-300 border rounded-md">📍 {job.city}</p>
                <p className="m-1 px-2 py-1 border-gray-300 border rounded-md">💸 {job.salaryFrom} - {job.salaryTo}</p>
                <p className="m-1 px-2 py-1 border-gray-300 border rounded-md">⏱️ {job.type}</p>
                {job.homeOffice ?
                    <p className="m-1 px-2 py-1 border-gray-300 border rounded-md">🌎 Remote</p>
                    :
                    <p className="m-1 px-2 py-1 border-gray-300 border rounded-md">🌎 On-site</p>
                }
            </div>

            {isDetailsPageLayout ?
                <></>
                :
                <div className="w-full flex justify-end items-center">
                    <Link to={`/jobdetails/${job.id}`} className="mt-5 pb-1 px-2 text-sm rounded-md text-gray-700 bg-gray-200 border border-gray-300 hover:bg-gray-100 duration-300">Learn more</Link>
                </div>
            }

        </div>
    )
}