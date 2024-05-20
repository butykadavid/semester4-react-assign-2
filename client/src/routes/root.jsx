import { useDispatch, useSelector } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { logout } from "../states/userSlice";

export default function Root() {

    const isAuthenticated = useSelector(state => !!state.user.token)
    const profileId = useSelector(state => {
        if (!isAuthenticated) return

        try {
            return state.user.user.id
        } catch (err) {
            console.log(err)
        }
    })
    const isEmployer = useSelector(state => {
        if (state.user.user === null) return false

        return state.user.user.role === "company"
    })

    //const navigate = useNavigate()

    const dispatch = useDispatch()

    const _logout = () => {
        dispatch(logout())

        // navigate("/")
        window.location.reload(false);
    }

    return (

        <div className="w-screen h-screen">
            <nav className="w-screen h-1/6 border-gray-400 border-b p-5 flex justify-between items-center">
                <div className="w-1/2 flex justify-start items-center">
                    <Link to={'/'} className="pl-2 pr-10 font-mono text-2xl">JOBHUNTER</Link>
                    <Link to={'/'} className="px-2">Főoldal</Link>
                </div>

                {isAuthenticated ?
                    <div>
                        {isEmployer ?
                            <Link to={'/newjob'} className="px-2 py-1 mx-1 border-gray-300 border rounded-md hover:bg-gray-200 duration-300">🆕  Álláshirdetés létrehozása</Link>
                            :
                            <></>
                        }
                        <Link to={`/profile/${profileId}`} className="px-2 py-1 mx-1 border-gray-300 border rounded-md hover:bg-gray-200 duration-300">👤 Profil</Link>
                        <Link className="px-2 py-1 mx-1 border-gray-300 border rounded-md hover:bg-gray-200 duration-300" onClick={() => _logout()}>❌ Kijelentkezés</Link>
                    </div>
                    :
                    <div>
                        <Link to={'/register'} className="px-2">Regisztráció</Link>
                        <Link to={'/login'} className="px-2">Bejelentkezés</Link>
                    </div>
                }

            </nav>
            <div className="w-screen h-5/6 flex justify-center">
                <Outlet />
            </div>
        </div>
    )
}