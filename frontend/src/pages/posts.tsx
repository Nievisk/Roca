import { useEffect, useRef, useState } from "react";
import { HeaderComponent } from "../components/header"
import { HiPencilSquare } from "react-icons/hi2";
import { Link, useSearchParams } from "react-router-dom";
import { type PostData } from "../interfaces/posts";
import { RiUser4Line } from "react-icons/ri";
import { formatDistanceStrict } from "date-fns"
import { MdArrowLeft } from "react-icons/md";
import { MdArrowRight } from "react-icons/md";


export const Posts = () => {
    const [posts, setPosts] = useState<PostData>()
    const [statusCode, setStatusCode] = useState<number>()
    const [params] = useSearchParams()
    const category = params.get("category");
    const title = params.get("title")

    const pageRef = useRef<number>(1)

    const fetchData = async (page?: number) => {
        if (page && posts?.posts) {
            page = page < 1 ? 1 : page > posts.total_pages ? posts.total_pages : page
            pageRef.current = page
            sessionStorage.setItem("page", String(pageRef.current))
        }

        const url = `http://localhost:3000/posts/search?category=${category}&text=${title}&page=${page || 1}`

        const res = await fetch(url);
        const data = await res.json()

        setStatusCode(res.status);
        setPosts(data)
    }

    useEffect(() => {
        (async () => await fetchData(Number(sessionStorage.getItem("page")) || 1))()
    }, [])

    return (
        <>
            <HeaderComponent />
            <div className="w-screen h-screen flex items-center flex-col">

                <header className="w-[450px] bg-gray-800 text-white rounded flex h-11 mt-16 items-center px-3 justify-between">
                    <p className="font-bold text-xl">POSTS</p>
                    <HiPencilSquare className="text-[30px] hover:opacity-70" />
                </header>

                {
                    statusCode === 404 ? (
                        <div className="w-[450px] bg-gray-300 h-20 flex justify-center items-center mt-4 font-bold">NOTHING WAS FOUND</div>
                    ) : posts?.posts.map((post) => {
                        return <>
                            <Link to={`/post/${post.id}`}
                                key={post.id}
                                className="mt-2 mb-2 bg-gray-600 w-[450px] text-whitte rounded h-28 flex flex-col p-2 text-white relative hover:opacity-8e0">

                                <div className="flex gap-x-1 items-center">
                                    <RiUser4Line className="text-xl bg-gray-700 text-green-500 w-8 h-7 p-1 rounded-full border border-gray-500" />
                                    <p className="text-sm font-bold text-green-500">{post.User.username}</p>
                                </div>

                                <p className="text-xl">{post.title}</p>
                                <p className="text-xs w-[360px]">{post.text.slice(0, 100) + "..."}</p>

                                <p className="absolute right-4 bottom-2 font-bold">{formatDistanceStrict(new Date(), new Date(post.createdAt))}</p>
                            </Link>
                        </>
                    })
                }

                {
                    posts && posts.total_pages > 1 &&
                    <div className="flex gap-x-1 mt-3 justify-end text-3xl w-[450px]">
                        <MdArrowLeft
                            onClick={async () => await fetchData(pageRef.current - 1)}
                            className={`bg-gray-500 text-white w-12 ${ pageRef.current === 1 ? "opacity-80" : "opacoty-100"}`} />
                        <MdArrowRight
                            onClick={async () => await fetchData(pageRef.current + 1)}
                            className={`bg-gray-500 text-white w-12 ${ pageRef.current === posts.total_pages ? "opacity-80" : "opacoty-100"}`} />
                    </div>
                }

            </div>
        </>
    )
}