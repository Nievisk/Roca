import { Link } from "react-router-dom"
import { UseAuth } from "../hooks/UseAuth"
import { registerSchema } from "../schemas/RegisterSchema"
import type { RegisterContent } from "../interfaces/RegisterContent"

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";



export const Register = () => {
    const url = "http://localhost:3000/auth/register"
    const {
        register,
        errors,
        handleSubmitForm,
        loading,
        statusCode
    } = UseAuth<RegisterContent>(registerSchema, url);

    return (
        <section className="w-full h-screen flex justify-center items-center">
            <form onSubmit={handleSubmitForm} className="h-80 w-60">
                <header><h1 className="text-3xl text-bold">Sign up</h1></header>

                <div className="mt-6">
                    <input type="text" placeholder="username" className="bg-gray-200 border-b border-black outline-none h-7 w-full px-1 placeholder:text-gray-500 text-sm"
                        {...register("username")} />
                </div>

                <div className="relative mt-2">
                    <input type="password" placeholder="password" className="bg-gray-200 border-b border-black h-7 w-full px-1 placeholder:text-gray-500 text-sm outline-none pr-7"
                        {...register("password")} />

                    <IoEyeSharp className="absolute right-2 top-[6px] text-gray-500" />
                </div>

                <div className="relative mt-2">
                    <input type="password" placeholder="confirm password" className="bg-gray-200 border-b border-black h-7 w-full px-1 placeholder:text-gray-500 text-sm outline-none pr-7"
                        {...register("confirmPassword")} />

                    <IoEyeSharp className="absolute right-2 top-[6px] text-gray-500" />
                </div>

                <div className="flex gap-x-1 mt-2">
                    <input type="checkbox" {...register("admin")} />
                    <p className="text-sm">Be admin</p>
                </div>

                <div className="mt-5 w-full flex justify-center h-11">
                    <button className={`bg-gray-500 w-full rounded text-white flex justify-center items-center ${loading ? "opacity-70" : "opacity-100"} hover:opacity-70`}>
                        {
                            loading ? <AiOutlineLoading3Quarters className="animate-spin text-xl" /> : "SIGN UP"
                        }
                    </button>
                </div>

                <h2 className="w-full flex justify-center mt-1">or sign in <Link to="/sign-in" className="ml-1 text-blue-400">here</Link></h2>

            </form>
        </section>
    )
}