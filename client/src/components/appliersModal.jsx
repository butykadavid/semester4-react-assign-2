import { useGetApplicantsQuery } from "../states/usersApi"

export default function AppliersModal({ isVisible, closeModal, jobId }) {

    const { data, isLoading, isSuccess } = useGetApplicantsQuery(jobId)

    if (isLoading) {
        return (
            <div className="loader"></div>
        )
    }

    if (isVisible) {

        if (isSuccess) {

            return (
                <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-800/50" onClick={() => closeModal()}>
                    <div className="w-96 flex flex-col justify-start items-start p-5 shadow-xl rounded-md bg-white border border-gray-300">
                        <div className="w-full flex justify-between items-center border-b border-gray-300 pb-2">
                            <h1>Jelentkezők</h1>
                        </div>

                        <div className="py-4 w-full">

                            {data.map((i, index) => {
                                return (
                                    <div className="flex justify-between" key={index}>
                                        <div className="flex">
                                            <p className="text-md mr-4">{index + 1}.</p>
                                            <p className="text-md">{i.user.fullname}</p>
                                        </div>
                                        <p>{i.user.email}</p>
                                    </div>
                                )
                            })}
                            
                        </div>

                    </div>
                </div>
            )

        } else {

            return (
                <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-800/50" onClick={() => closeModal()}>
                    <div className="w-72 flex flex-col justify-start items-start p-5 shadow-xl rounded-md bg-white border border-gray-300">
                        <div className="w-full flex justify-between items-center border-b border-gray-300 pb-2">
                            <h1>Jelentkezők</h1>
                        </div>

                        <p className="text-sm text-justify py-2">Nem sikerült betölteni a jelentkezőket</p>

                    </div>
                </div>
            )

        }

    }
}