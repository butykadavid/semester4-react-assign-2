import { useGetJobQuery } from "../states/jobsApi";
import { useCreateJobUserMutation } from "../states/usersApi";
import { useNavigate, useParams } from 'react-router-dom';

import JobCard from '../components/jobCard'
import { useSelector } from "react-redux";
import { useState } from "react";
import InfoModal from "../components/infoModal";

export default function JobDetails() {
    const { jobId } = useParams()

    const [modaltext, setModalText] = useState("")
    const [modalIcon, setModalIcon] = useState("info")
    const [isModalVisible, setModalVisible] = useState(false)

    const isAuthenticated = useSelector(state => !!state.user.token)

    const { data, isSuccess: isGetJobSuccess, isLoading: isGetJobLoading } = useGetJobQuery(jobId)

    const [createJobUser] = useCreateJobUserMutation()

    const navigate = useNavigate()

    const onApply = () => {
        if (!isAuthenticated) {
            navigate("/login")

            return
        }

        createJobUser({
            body: {
                "jobId": Number(jobId)
            }
        }).then(result => {
            if (result.error) {
                openModalWithParams(`Hiba történt a jelentkezés során:\n\r${result.error.data.message}`,"error")
            } else {
                openModalWithParams(`Sikeres jelentkezés!`,"success")
            }
          })
          .catch(error => {
            openModalWithParams(`Hiba történt a jelentkezés során:\n\r${error.message}`,"error")
          });
    }

    const openModalWithParams = (text, icon) => {
        setModalText(text)
        setModalIcon(icon)
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }


    if (isGetJobLoading) {
        return (
            <div className="loader"></div>
        )
    }

    if (isGetJobSuccess) {
        return (
        <>
            <div className="flex flex-col justify-center items-center">
                <JobCard job={data} isDetailsPageLayout={true} />
                <button onClick={() => onApply()} className="mt-5 py-1 px-2 text-lg rounded-md text-white bg-green-500 border border-gray-300 hover:bg-green-300 duration-300">Jelentkezek</button>
            </div>

            <InfoModal isVisible={isModalVisible} text={modaltext} icon={modalIcon} closeModal={closeModal}/>
        </>
        )
    }
}