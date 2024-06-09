import { useEffect, useState } from "react"
import { useDeleteExpMutation, useModifyExpMutation } from "../states/experiencesApi"
import InfoModal from "./infoModal"

export default function ExperienceBlock({ info, index, modifyExps, deleteExpById }) {

    const [company, setCompany] = useState(info.company)
    const [title, setTitle] = useState(info.title)
    const [interval, setInterval] = useState(info.interval)

    const [isThereChange, setIsThereChange] = useState(false)

    const [modaltext, setModalText] = useState("")
    const [modalIcon, setModalIcon] = useState("info")
    const [isModalVisible, setModalVisible] = useState(false)

    const [saveExp] = useModifyExpMutation()
    const [deleteExp] = useDeleteExpMutation()

    const onSave = () => {
        saveExp({
            body: {
                "company": company,
                "title": title,
                "interval": interval
            },
            id: info.id
        }).then(res => {
            if (res.error) {
                openModalWithParams(`Hiba történt a lista módosítása során:\n\r${res.error.data.message}`,"error")
            } else {
                modifyExps(info.id, {
                    "id": info.id,
                    "company": company,
                    "title": title,
                    "interval": interval
                })

                setIsThereChange(false)

                openModalWithParams("Lista sikeresen frissítve!", "success")
            }
        }).catch(err => {
            openModalWithParams(`Hiba történt a lista módosítása során:\n\r${err.message}`,"error")
        })
    }

    const onDelete = () => {
        if (!confirm("Biztos vagy benn, hogy törlöd ezt az elemet?\n Ez később nem vonható vissza!")) return

        deleteExp({
            id: info.id
        }).then(res => {
            if (res.error) {
                openModalWithParams(`Hiba történt a lista módosítása során:\n\r${res.error.data.message}`,"error")
            } else {
                deleteExpById(info.id)
                setIsThereChange(false)

                openModalWithParams("Lista sikeresen frissítve!", "success")
            }
        }).catch(err => {
            openModalWithParams(`Hiba történt a lista módosítása során:\n\r${err.message}`,"error")
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
        if (title != info.title) return true
        if (interval != info.interval) return true
    }

    useEffect(() => {
        setIsThereChange(_isThereChange())
    }, [company, title, interval])

    return (
        <>
            <div className="w-full flex justify-evenly items-center p-2 my-2 text-xs">
                <p className="mr-2">{index + 1}.</p>
                <input type="text" className="p-2 w-1/4 border border-gray-300 rounded-md" value={company} onChange={(e) => setCompany(e.target.value)} />
                <input type="text" className="p-2 w-1/4 border border-gray-300 rounded-md" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="text" className="p-2 w-1/4 border border-gray-300 rounded-md" value={interval} onChange={(e) => setInterval(e.target.value)} />
                {isThereChange ?
                    <button className="p-2 w-16 border border-gray-200 bg-green-500 rounded-md text-white text-xs hover:bg-green-300 duration-300" onClick={() => onSave()}>Mentés</button>
                    :
                    <div className="w-16"></div>
                }
                <button className="p-2 border border-gray-200 bg-red-300 rounded-md text-xs hover:bg-red-200 duration-300" onClick={() => onDelete()}>❌</button>
            </div>

            {isModalVisible ?
                <InfoModal isVisible={isModalVisible} text={modaltext} icon={modalIcon} closeModal={closeModal} />
                :
                <></>
            }

        </>
    )
}