import { useRef, useState } from "react"
import { useCreateJobMutation } from "../states/jobsApi"
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function NewJob() {

    const _ref = useRef(null)

    const isAuthenticated = useSelector(state => !!state.user.token)

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    const [company, setCompany] = useState('')
    const [position, setPosition] = useState('')
    const [description, setDescription] = useState('')
    const [minSal, setMinSal] = useState(0)
    const [maxSal, setMaxSal] = useState(1000000)
    const [city, setCity] = useState('')
    const [type, setType] = useState('')
    const [isHomeOffice, setIsHomeOffice] = useState(false)

    const [createJob, { isLoading, isSuccess }] = useCreateJobMutation()

    const addJobPost = async () => {
        try {

            await createJob({
                body: {
                    company: company,
                    position: position,
                    description: description,
                    salaryFrom: Number(minSal),
                    salaryTo: Number(maxSal),
                    type: type,
                    city: city,
                    homeOffice: isHomeOffice
                },
            }).unwrap().then(() => {
                alert("Álláshírdetés sikeresen létrehozva!")
                resetValues()
            });
        } catch (err) {
            console.log(err)
        }
    }

    const resetValues = () => {
        setCompany('')
        setPosition('')
        setDescription('')
        setMinSal(0)
        setMaxSal(1000000)
        setCity('')
        setType('')
        setIsHomeOffice(false)

        _ref.current.checked = false
    }

    return <>
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-96 shadow-lg border-gray-300 border rounded-md p-5">
                {/* Title */}
                <div className="w-full flex justify-between items-center border-gray-300 border-b pb-3">
                    <h1 className="m-0 text-xl">Új álláshírdetés</h1>
                </div>

                {/* Content */}
                <div className="w-full mt-5">
                    <div className="my-5">
                        <div className="w-full flex flex-col justify-center items-start mb-4">
                            <label htmlFor="comp">Vállalat</label>
                            <input type="text" name="comp" className="pl-1 border-gray-300 border text-xs w-full" value={company} onChange={(e) => setCompany(e.target.value)} />
                        </div>
                        <div className="w-full flex flex-col justify-center items-start mb-4">
                            <label htmlFor="position">Pozíció megnevezése</label>
                            <input type="text" name="position" className="pl-1 border-gray-300 border text-xs w-full" value={position} onChange={(e) => setPosition(e.target.value)} />
                        </div>
                        <div className="w-full flex flex-col justify-center items-start mb-4">
                            <label htmlFor="desc">Leírás</label>
                            <textarea name="desc" rows={3} className="pl-1 border-gray-300 border text-xs w-full" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                        <div className="flex justify-between items-center mb-4">
                            <div className="w-1/2 flex flex-col justify-center items-start pr-2">
                                <label htmlFor="minFiz">Minimum fizetés</label>
                                <input type="number" name="minFiz" className="pl-1 border-gray-300 border text-xs w-full" value={minSal} onChange={(e) => setMinSal(e.target.value)} />
                            </div>
                            <div className="w-1/2 flex flex-col justify-center items-start pl-2">
                                <label htmlFor="maxFiz">Maximum fizetés</label>
                                <input type="number" name="maxFiz" className="pl-1 border-gray-300 border text-xs w-full" value={maxSal} onChange={(e) => setMaxSal(e.target.value)} />
                            </div>
                        </div>
                        <div className="w-full flex flex-col justify-center items-start mb-4">
                            <label htmlFor="city">Város</label>
                            <input type="text" name="city" className="pl-1 border-gray-300 border text-xs w-full" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                    </div>
                    <div className="w-full flex justify-start items-start mb-4">
                        <label className="mr-2">Típus</label>

                        <select className="border-gray-200 border rounded-sm" value={type} onChange={(e) => setType(e.target.value)}>
                            <option value=""></option>
                            <option value="full-time">Full-time</option>
                            <option value="part-time">Part-time</option>
                            <option value="internship">Internship</option>
                            <option value="contract">Contract</option>
                        </select>
                    </div>


                    <div className="flex flex-col justify-start">
                        <div>
                            <input ref={_ref} type="checkBox" name="profile_type" className="mr-2" onChange={() => console.log(":D")} onClick={(e) => setIsHomeOffice(e.target.checked)} />
                            <label htmlFor="homeOffice">Home office</label>
                        </div>
                    </div>

                    <div className="w-full flex justify-end items-center mt-10">
                        <div className="w-1/2 flex justify-evenly">
                            <button className="pb-1 px-2 text-md rounded-md text-gray-700 bg-gray-200 border border-gray-300 hover:bg-gray-100 duration-300" onClick={() => resetValues()}>Reset</button>
                            <button className="pb-1 px-2 text-md rounded-md text-white bg-green-500 border border-gray-300 hover:bg-green-300 duration-300" onClick={() => addJobPost()}>Létrehozás</button>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    </>
}