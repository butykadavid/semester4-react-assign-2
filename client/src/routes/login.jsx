import { useState } from "react"
import { useLoginUserMutation } from "../states/usersApi"
import { useDispatch } from "react-redux"
import { login } from "../states/userSlice";
import { useNavigate } from "react-router-dom";

export default function LogIn() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const [apiLogin] = useLoginUserMutation()
    const dispatch = useDispatch()

    const resetValues = () => {
        setEmail("")
        setPassword("")
    }

    const handleLogin = () => {
        apiLogin({
            body: {
                "email": email,
                "password": password
            }
        }).unwrap().then(data => {
            if (data.error){
                console.log("HIBA")
            } else {
                dispatch(login(data))
                resetValues()
                navigate("/")
            }
        }).catch(err => {
            console.log("HIBA")
        })
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-96 shadow-lg border-gray-300 border rounded-md p-5">
                {/* Title */}
                <div className="w-full flex justify-start items-center border-gray-300 border-b pb-3">
                    <h1 className="m-0 text-xl">Bejelentkezés</h1>
                </div>

                {/* Content */}
                <div className="w-full">
                    <div className="my-5">

                        <div className="w-full flex flex-col justify-center items-start mb-4">
                            <label htmlFor="email">E-mail cím</label>
                            <input type="email" name="email" value={email} className="pl-1 border-gray-300 border text-xs w-full" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="w-full flex flex-col justify-center items-start mb-4">
                            <label htmlFor="password">Jelszó</label>
                            <input type="password" name="password" value={password} className="pl-1 border-gray-300 border text-xs w-full" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    <div className="w-full flex justify-end items-center mt-10">
                        <div className="w-1/2 flex justify-between">
                            <button className="pb-1 px-2 text-md rounded-md text-gray-700 bg-gray-200 border border-gray-300 hover:bg-gray-100 duration-300" onClick={() => resetValues()}>Reset</button>
                            <button className="pb-1 px-2 text-md rounded-md text-white bg-green-500 border border-gray-300 hover:bg-green-300 duration-300" onClick={() => handleLogin()}>Bejelentkezés</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )

}