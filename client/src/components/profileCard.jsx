import { useEffect, useState } from "react"
import ExperienceBlock from "./experienceBlock"

export default function ProfileCard({ profile, experiences }) {

    const [_experiences, setExperiences] = useState(experiences)

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

    return (
        <div className="w-1/2 flex flex-col border border-gray-300 shadow-lg rounded-md p-5">
            <div className="w-full flex justify-between items-center pb-5 border-b border-gray-300">
                <h1>{profile.fullname}</h1>
                <p className="text-sm text-gray-400 capitalize">{profile.role}</p>
            </div>

            <div className="flex justify-start text-sm items-center py-5 border-b border-gray-300">
                <h2>📧</h2>
                <p className="ml-2">{profile.email}</p>
            </div>

            {/* Experiences container */}
            <div className="flex flex-col justify-center items-center text-xs py-5">

                {_experiences.length === 0 ?
                    <h1 className="text-gray-400">Nincsenek korábbi munkahelyek</h1>
                    :
                    <>
                        {_experiences.map((item, index) => {
                            return (
                                <ExperienceBlock key={item.id} info={item} index={index} modifyExps={modifyExps} deleteExpById={deleteExpById}/>
                            )
                        })}
                    </>
                }

            </div>

        </div>
    )
}