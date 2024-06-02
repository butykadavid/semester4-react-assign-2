import { useEffect, useRef, useState } from "react"
import InfoModal from "./infoModal"
import { useModifyJobMutation, useDeleteJobMutation } from "../states/jobsApi"

export default function jobBlock({ info, index, modifyJobs, deleteJobById }) {

    const _ref = useRef(null)

    const [company, setCompany] = useState(info.company)
    const [position, setPosition] = useState(info.position)
    const [description, setDescription] = useState(info.description)
    const [minSal, setMinSal] = useState(info.salaryFrom)
    const [maxSal, setMaxSal] = useState(info.salaryTo)
    const [city, setCity] = useState(info.city)
    const [type, setType] = useState(info.type)
    const [isHomeOffice, setIsHomeOffice] = useState(info.homeOffice)

    const [isThereChange, setIsThereChange] = useState(false)

    const [modaltext, setModalText] = useState("")
    const [modalIcon, setModalIcon] = useState("info")
    const [isModalVisible, setModalVisible] = useState(false)

    const [saveJob] = useModifyJobMutation()
    const [deleteJob] = useDeleteJobMutation()

    const onSave = () => {
        saveJob({
            body: {
                company: company,
                position: position,
                description: description,
                salaryFrom: Number(minSal),
                salaryTo: Number(maxSal),
                type: type,
                city: city,
                homeOffice: Boolean(isHomeOffice)
            },
            id: info.id
        }).then(res => {
            if (res.error) {
                openModalWithParams(`Hiba történt a lista módosítása során:\n\r${res.error.data.message}`, "error")
            } else {
                modifyJobs(info.id, {
                    "id": info.id,
                    company: company,
                    position: position,
                    description: description,
                    salaryFrom: Number(minSal),
                    salaryTo: Number(maxSal),
                    type: type,
                    city: city,
                    homeOffice: isHomeOffice
                })

                setIsThereChange(false)

                openModalWithParams("Lista sikeresen frissítve!", "success")
            }
        }).catch(err => {
            openModalWithParams(`Hiba történt a lista módosítása során:\n\r${err.message}`, "error")
        })
    }

    const onDelete = () => {
        if (!confirm("Biztos vagy benn, hogy törlöd ezt az elemet?\n Ez később nem vonható vissza!")) return

        deleteJob({
            id: info.id
        }).then(res => {
            if (res.error) {
                openModalWithParams(`Hiba történt a lista módosítása során:\n\r${res.error.data.message}`, "error")
            } else {
                deleteJobById(info.id)
                setIsThereChange(false)

                openModalWithParams("Lista sikeresen frissítve!", "success")
            }
        }).catch(err => {
            openModalWithParams(`Hiba történt a lista módosítása során:\n\r${err.message}`, "error")
        })
    }

    const openModalWithParams = (text, icon) => {
        setModalText(text)
        setModalIcon(icon)
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }

    const _isThereChange = () => {
        if (company != info.company) return true
        if (position != info.position) return true
        if (description != info.description) return true
        if (minSal != info.salaryFrom) return true
        if (maxSal != info.salaryTo) return true
        if (type != info.type) return true
        if (city != info.city) return true
        if (isHomeOffice != info.homeOffice) return true
    }

    useEffect(() => {
        setIsThereChange(_isThereChange())
    }, [company, position, description, minSal, maxSal, city, type, isHomeOffice])

    useEffect(() => {
        _ref.current.checked = isHomeOffice
    }, [])

    return (
        <>
            <div className="w-full flex justify-between items-center p-2 my-2 rounded-md border border-gray-300 bg-gray-100">
                <p className="p-6">{index + 1}</p>
                <div className="w-2/3 flex flex-wrap justify-evenly items-center">
                    <input type="text" className="p-2 m-2 w-1/4 border border-gray-300 rounded-md" value={company} onChange={(e) => setCompany(e.target.value)} />
                    <input type="text" className="p-2 m-2 w-1/4 border border-gray-300 rounded-md" value={position} onChange={(e) => setPosition(e.target.value)} />
                    <textarea type="text" className="p-2 m-2 w-1/4 border border-gray-300 rounded-md" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input type="number" className="p-2 m-2 w-1/4 border border-gray-300 rounded-md" value={minSal} onChange={(e) => setMinSal(e.target.value)} />
                    <input type="number" className="p-2 m-2 w-1/4 border border-gray-300 rounded-md" value={maxSal} onChange={(e) => setMaxSal(e.target.value)} />
                    <input type="text" className="p-2 m-2 w-1/4 border border-gray-300 rounded-md" value={city} onChange={(e) => setCity(e.target.value)} />
                    <select className="p-2 m-2 w-1/4 border-gray-300 border rounded-sm" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value=""></option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="internship">Internship</option>
                        <option value="contract">Contract</option>
                    </select>
                    <div className="flex flex-col justify-start">
                        <div className="flex justify-center items-center">
                            <input ref={_ref} type="checkBox" name="profile_type" className="mr-2" onClick={(e) => setIsHomeOffice(e.target.checked)} />
                            <label htmlFor="homeOffice">Home office</label>
                        </div>
                    </div>
                </div>

                <div className="flex h-full flex-col justify-between items-center">
                    <div className="flex h-2/3 justify-evenly items-center p-6">
                        {isThereChange ?
                            <button className="p-2 w-16 mr-2 border border-gray-200 bg-green-500 rounded-md text-white text-xs hover:bg-green-300 duration-300" onClick={() => onSave()}>Mentés</button>
                            :
                            <div className="w-16 mr-2"></div>
                        }
                        <button className="p-2 border border-gray-200 bg-red-300 rounded-md text-white text-xs hover:bg-red-200 duration-300" onClick={() => onDelete()}>❌</button>
                    </div>
                    <button className="p-2 self-end border border-gray-200 bg-gray-300 rounded-md text-xs hover:bg-gray-200 duration-300" onClick={() => onDetails()}>Jelentkezők megtekintése</button>
                </div>
            </div>

            {isModalVisible ?
                <InfoModal isVisible={isModalVisible} text={modaltext} icon={modalIcon} closeModal={closeModal} />
                :
                <></>
            }

        </>
    )
}