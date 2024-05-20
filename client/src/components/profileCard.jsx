import ExperienceBlock from "./experienceBlock"

export default function ProfileCard({ profile, experiences }) {

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
            <div className="flex flex-col justify-center items-center text-sm py-5">

                {experiences.length === 0 ?
                    <h1 className="text-gray-400">Nincsenek korábbi munkahelyek</h1>
                    :
                    <>
                        {experiences.map((item, index) => {
                            return (
                                <ExperienceBlock key={index} info={item} index={index} />
                            )
                        })}
                    </>
                }

            </div>

        </div>
    )
}