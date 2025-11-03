import { Link } from "react-router-dom"
import { username } from "../context/authContext"

export const HeaderComponent = () => {
    const logoutFun = async () => {
        await fetch("https://localhost:3000/auth/logout", {
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })
    }

    return (
        <div className="flex px-6 py-1 justify-end items-center bg-gray-200 border border-gray-300 h-12 w-full">
            {
                username() ? (
                    <div className="bg-gray-400 h-8 w-16 flex justify-center text-white items-center rounded" onClick={async () => await logoutFun()}>logout</div>
                ) : (
                    <Link className="bg-gray-400 h-8 w-16 flex justify-center text-white items-center rounded" to="/auth/sign-in">login</Link>
                )
            }
        </div>
    )
}