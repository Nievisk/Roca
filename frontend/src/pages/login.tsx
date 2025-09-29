import { Link } from "react-router-dom"
import { UseAuth } from "../hooks/UseAuth"
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { loginSchema } from "../schemas/loginSchema";

export const Login = () => {
    const url = "http://localhost:3000/auth/login"
    const {
        register,
        errors,
        handleSubmitForm,
        loading,
        statusCode
    } = UseAuth<{ username: string, password: string }>(loginSchema, url);

    return (
        <section className="w-full h-screen flex justify-center items-center">
            <form onSubmit={handleSubmitForm} className="h-92 w-72 flex flex-col">
                <header><h1 className="text-3xl text-bold">Sign in</h1></header>

                <div className="mt-6 flex flex-col">
                    <input type="text" placeholder="username" className="bg-gray-200 border-b border-black outline-none h-7 w-full px-1 placeholder:text-gray-500 text-sm"
                        {...register("username")} />
                </div>

                <div className="relative mt-2">
                    <input type="password" placeholder="password" className="bg-gray-200 border-b border-black h-7 w-full px-1 placeholder:text-gray-500 text-sm outline-none"
                        {...register("password")} />
                    {
                        (statusCode === 404 || errors.password) ? <p className="mt-1 text-xs text-red-500">Incorrect email or password</p> : ""
                    }
                </div>

                <div className="mt-5 w-full flex justify-center h-11">
                    <button className={`bg-gray-500 w-full rounded text-white flex justify-center items-center ${loading ? "opacity-70" : "opacity-100"} hover:opacity-70`}>
                        {
                            loading ? <AiOutlineLoading3Quarters className="animate-spin text-xl" /> : "SIGN IN"
                        }
                    </button>
                </div>

                <h2 className="w-full flex justify-center mt-1">or sign up <Link to="/auth/sign-up" className="ml-1 text-blue-400">here</Link></h2>

            </form>
        </section>
    )
}