import { useRef, useState } from "react"
import { useCreateUserMutation } from "../states/usersApi"
import { useLoginUserMutation } from "../states/usersApi"
import { useCreateExpMutation } from "../states/experiencesApi"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../states/userSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {

    const cb_ref = useRef(null)
    const navigate = useNavigate()

    const [isEmployer, setIsEmployer] = useState(false)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [experiencesStr, setExperiencesStr] = useState("")

    const [createUser, { isLoading, isSuccess }] = useCreateUserMutation()

    const [apiLogin] = useLoginUserMutation()
    const [createExp] = useCreateExpMutation()
    const dispatch = useDispatch()

    const resetValues = () => {
        setIsEmployer(false)
        cb_ref.current.checked = false
        setFullName("")
        setEmail("")
        setPassword("")
        setExperiencesStr("")
    }

    const registration = async () => {

        try {
            // registration part
            await createUser({
                body: {
                    email: email,
                    password: password,
                    fullname: fullName,
                    role: isEmployer ? 'company' : 'jobseeker',
                },
            }).unwrap();

            // login part
            const loginResponse = await apiLogin({
                body: {
                    email: email,
                    password: password,
                },
            }).unwrap();

            dispatch(login(loginResponse));

            await new Promise(resolve => setTimeout(resolve, 0));

            // adding experiences part
            const reqBody = processText(experiencesStr)
            await createExp(reqBody).unwrap();

        } catch (err) {
            console.error(err);
        }

        resetValues()

        navigate("/")
    }

    const processText = (str) => {
        const result = []

        str.split('\n').forEach(item => {
            const tempArr = item.split(";")
            const obj = {
                "company": tempArr[0],
                "title": tempArr[1],
                "interval": tempArr[2],
            }

            result.push(obj)
        })

        return result
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-96 shadow-lg border-gray-300 border rounded-md p-5">
                {/* Title */}
                <div className="w-full flex justify-between items-center border-gray-300 border-b pb-3">
                    <h1 className="m-0 text-xl">Regisztráció</h1>
                    {isSuccess ? <h1 className="text-sm">✅ Sikeres regisztráció</h1> : <></>}
                </div>

                {/* Content */}
                <div className="w-full mt-5">
                    <div className="flex flex-col justify-start">
                        <div>
                            <input ref={cb_ref} type="checkBox" name="profile_type" value={isEmployer} className="mr-2" onChange={() => console.log(":D")} onClick={(e) => setIsEmployer(e.target.checked)} />
                            <label htmlFor="munkaltato">Munkáltató vagyok</label>
                        </div>
                    </div>

                    <div className="my-5">
                        <div className="w-full flex flex-col justify-center items-start mb-4">
                            <label htmlFor="name">Teljes név</label>
                            <input type="text" name="name" value={fullName} className="pl-1 border-gray-300 border text-xs w-full" onChange={(e) => setFullName(e.target.value)} />
                        </div>
                        <div className="w-full flex flex-col justify-center items-start mb-4">
                            <label htmlFor="email">E-mail cím</label>
                            <input type="email" name="email" value={email} className="pl-1 border-gray-300 border text-xs w-full" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="w-full flex flex-col justify-center items-start mb-4">
                            <label htmlFor="password">Jelszó</label>
                            <input type="password" name="password" value={password} className="pl-1 border-gray-300 border text-xs w-full" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </div>

                    {isEmployer ?

                        <div></div>

                        :

                        <div className="w-full flex flex-col justify-center items-start mb-4">
                            <div className="flex">
                                <label>Tapasztalat</label>
                                <p className="m-0 ml-1 grayscale text-md cursor-pointer" title="Formátum: (soronként) [CÉG_NEVE];[POZÍCIÓ];[ÉV_TŐL]-[ÉV_IG]">ℹ️</p>
                            </div>
                            <textarea className="pl-1 border-gray-300 border text-xs w-full" rows="5" value={experiencesStr} onChange={(e) => setExperiencesStr(e.target.value)} />
                        </div>

                    }

                    <div className="w-full flex justify-end items-center mt-10">
                        <div className="w-1/2 flex justify-evenly">
                            <button className="pb-1 px-2 text-md rounded-md text-gray-700 bg-gray-200 border border-gray-300 hover:bg-gray-100 duration-300" onClick={() => resetValues()}>Reset</button>
                            <button className="pb-1 px-2 text-md rounded-md text-white bg-green-500 border border-gray-300 hover:bg-green-300 duration-300" onClick={() => registration()}>Regisztrálok</button>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}