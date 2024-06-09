import { useEffect, useState } from "react"
import JobBlock from "./jobBlock"
import { useGetJobsQuery } from "../states/jobsApi";

export default function ProfileCardEmployer({ profile }) {
    const { data: jobData, isLoading: isJobLoading, isSuccess: isJobSuccess } = useGetJobsQuery({userId: profile.id})

    const [_jobs, setJobs] = useState([])

    const modifyJobs = (id, newJobObj) => {
        const rest = _jobs.filter(job => job.id != id)

        const newJobsArr = [...rest, newJobObj].sort((a, b) => a.id - b.id)
        setJobs(newJobsArr)
    }

    const deleteJobById = (id) => {
        const rest = _jobs.filter(job => job.id != id)

        const newJobsArr = [...rest].sort((a, b) => a.id - b.id)
        setJobs(newJobsArr)
    }

    useEffect(() => {
        if(jobData) setJobs(jobData.data)
    }, [jobData])

    if (isJobLoading) {
        return (
            <div className="loader"></div>
        )
    }

    if (isJobSuccess) {
        return (
            <div className="w-4/5 flex flex-col border border-gray-300 shadow-lg rounded-md p-5">
                <div className="w-full flex justify-between items-center pb-5 border-b border-gray-300">
                    <h1>{profile.fullname}</h1>
                    <p className="text-sm text-gray-400 capitalize">{profile.role}</p>
                </div>

                <div className="flex justify-start text-sm items-center py-5 border-b border-gray-300">
                    <h2>📧</h2>
                    <p className="ml-2">{profile.email}</p>
                </div>

                {/* Jobs container */}
                <div className="flex flex-col justify-center items-center py-5">

                    <h1 className="self-start mb-4">Aktív álláshírdetések</h1>

                    {_jobs.length === 0 ?
                        <h1 className="text-gray-400">Nincsenek közzétett álláshírdetések</h1>
                        :
                        <>
                            {_jobs.map((item, index) => {
                                return (
                                    <JobBlock key={item.id} info={item} index={index} modifyJobs={modifyJobs} deleteJobById={deleteJobById} />
                                )
                            })}
                        </>
                    }

                </div>

            </div>
        )
    }
}