import { useEffect, useState } from "react"
import ExperienceBlock from "./experienceBlock"
import { useGetExpQuery } from "../states/experiencesApi"
import { useGetApplicationsQuery } from "../states/usersApi"
import ApplicationsBlock from "./applicationsBlock"

export default function ProfileCardJobSeeker({ profile }) {

    const { data: expData, isLoading: isExpLoading, isSuccess: isExpSuccess } = useGetExpQuery()
    const { data: appsData, isLoading: isAppsLoading, isSuccess: isAppsSuccess } = useGetApplicationsQuery(profile.id)

    const [_experiences, setExperiences] = useState([])
    const [_applications, setApplications] = useState([])

    const modifyExps = (id, newExpObj) => {
        const rest = _experiences.filter(exp => exp.id != id)

        const newExpsArr = [...rest, newExpObj].sort((a, b) => a.id - b.id)
        setExperiences(newExpsArr)
    }

    const deleteExpById = (id) => {
        const rest = _experiences.filter(exp => exp.id != id)

        const newExpsArr = [...rest].sort((a, b) => a.id - b.id)
        setExperiences(newExpsArr)
    }

    useEffect(() => {
        if (expData) setExperiences(expData.data)
    }, [expData])

    useEffect(() => {
        if (appsData) setApplications(appsData)
    }, [appsData])

    if (isExpLoading || isAppsLoading) {
        return (
            <div className="loader"></div>
        )
    }

    if (isExpSuccess && isAppsSuccess) {
        return <>
            <div className="w-1/2 flex flex-col border border-gray-300 shadow-lg rounded-md p-5 m-5">
                <div className="w-full flex justify-between items-center pb-5 border-b border-gray-300">
                    <h1>{profile.fullname}</h1>
                    <p className="text-sm text-gray-400 capitalize">{profile.role}</p>
                </div>

                <div className="flex justify-start text-sm items-center py-5 border-b border-gray-300">
                    <h2>📧</h2>
                    <p className="ml-2">{profile.email}</p>
                </div>

                {/* Experiences container */}
                <div className="flex flex-col justify-center items-center py-5">

                    <h1 className="text-md self-start mb-4">Tapasztalatok</h1>

                    {_experiences.length === 0 ?
                        <h1 className="text-gray-400 text-sm">Nincsenek korábbi munkahelyek</h1>
                        :
                        <>
                            {_experiences.map((item, index) => {
                                return (
                                    <ExperienceBlock key={item.id} info={item} index={index} modifyExps={modifyExps} deleteExpById={deleteExpById} />
                                )
                            })}
                        </>
                    }

                </div>

                {/* Applications container */}
                <div className="flex flex-col justify-center items-center py-5">

                    <h1 className="text-md self-start mb-4">Jelentkezések</h1>

                    {_applications.length === 0 ?
                        <h1 className="text-gray-400 text-sm">Még nincsenek jelentkezések</h1>
                        :
                        <>
                            {_applications.map((item, index) => {
                                return (
                                    <ApplicationsBlock key={index} job={item.job} index={index} />
                                )
                            })}
                        </>
                    }

                </div>

            </div>
        </>
    } else {
        return <h1>Hiba lépett fel a profil adatainak betöltésekor</h1>
    }
}