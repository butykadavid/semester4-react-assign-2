import { Link } from "react-router-dom";

export default function ApplicationsBlock({ job, index }) {


    return <div className="w-full flex justify-between items-center p-2 my-2 text-xs">
        <div className="flex justify-between items-center">
            <p>{index + 1}.</p>
            <p className="ml-2 text-sm">{job.position}</p>
            <p className="ml-2"> </p>
            <p className="ml-2 text-gray-500">{job.company}</p>
        </div>
        <button className="p-2 self-end border border-gray-200 bg-gray-300 rounded-md text-xs hover:bg-gray-200 duration-300">
            <Link to={`/jobdetails/${job.id}`}>Részletek</Link>
        </button>
    </div>
}