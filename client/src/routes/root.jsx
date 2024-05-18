import { Outlet, Link } from "react-router-dom";

export default function Root() {
    return (
        <div className="h-screen">
            <nav className="w-screen h-1/6 border-gray-400 border-b p-5 flex justify-between items-center">
                <div className="w-1/2 flex justify-start items-center">
                    <Link to={'/'} className="pl-2 pr-10 font-mono text-2xl">JOBHUNTER</Link>
                    <Link to={'/'} className="px-2">Főoldal</Link>
                    <Link to={'/register'} className="px-2">Regisztráció</Link>
                    <Link to={'/login'} className="px-2">Bejelentkezés</Link>
                </div>
            </nav>
            <div className="w-screen h-5/6">
                <Outlet />
            </div>
        </div>
    )
}