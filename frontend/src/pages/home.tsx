import { useNavigate } from "react-router-dom";
import { HeaderComponent } from "../components/header"
import { IoSearch } from "react-icons/io5";
import { useState } from "react";

export const Home = () => {
    const [input, setInput] = useState()
    const navigate = useNavigate()
    return (
        <div className="h-screen w-screen flex flex-col items-center">
            <HeaderComponent />
            <div
                className="w-[550px] h-60 mt-36 flex flex-col items-center">

                <form className="flex gap-2" onSubmit={() => navigate(`/posts?text=${input}`)}>
                    <input className="w-60 h-8 bg-gray-200 text-gray-500 rounded-full outline-none px-3 border border-gray-300"
                        onChange={(e: any) => setInput(e.target.value)}
                        value={input}
                        placeholder="search..." />
                    <button><IoSearch className="bg-gray-400 rounded-full h-8 w-8 p-1 text-white" /></button>
                </form>

                <div className="mt-10 w-[450px] flex justify-center gap-3 flex-wrap">
                    <button onClick={() => navigate("/posts?category=music")}
                        className="px-4 h-7 bg-gray-400 rounded-xl text-white hover:opacity-80">Music</button>

                    <button onClick={() => navigate("posts?category=games")}
                        className="px-4 h-7 bg-gray-400 rounded-xl text-white hover:opacity-80">Games</button>

                    <button onClick={() => navigate("/posts?category=movies&series")}
                        className="px-4 h-7 bg-gray-400 rounded-xl text-white hover:opacity-80">Movies & series</button>

                    <button onClick={() => navigate("/posts?category=other")}
                        className="px-4 h-7 bg-gray-400 rounded-xl text-white hover:opacity-80">Other</button>

                    <button onClick={() => navigate("/posts?category=animes")}
                        className="px-4 h-7 bg-gray-400 rounded-xl text-white hover:opacity-80">Animes</button>

                    <button onClick={() => navigate("/posts?category=art")}
                        className="px-4 h-7 bg-gray-400 rounded-xl text-white hover:opacity-80">Art</button>
                </div>

            </div>
        </div>
    )
}