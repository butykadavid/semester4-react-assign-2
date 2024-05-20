export default function InfoModal({ isVisible, text, icon, closeModal }) {

    // icon can be:
    // success, error, info

    if (isVisible) {

        return (
            <div className="absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-800/50" onClick={() => closeModal()}>
                <div className="w-72 flex flex-col justify-start items-start p-5 shadow-xl rounded-md bg-white border border-gray-300">
                    <div className="w-full flex justify-between items-center border-b border-gray-300 pb-2">
                        <h1>Info</h1>
                        {icon == "success" ?
                            <h1>✅</h1>
                            :
                            <></>
                        }
                        {icon == "error" ?
                            <h1>⛔</h1>
                            :
                            <></>
                        }
                        {icon == "info" ?
                            <h1>ℹ️</h1>
                            :
                            <></>
                        }
                    </div>
                    <p className="text-sm text-justify py-2">{text}</p>
                </div>
            </div>
        )

    }
}