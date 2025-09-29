import { createContext, useContext, useEffect, useState } from "react";

const UsernameContext = createContext<string | null>(null)

const UsernameContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [username, setUsername] = useState<string | null>(null)

    const fetchData = async () => {
        const res = await fetch("http://localhost:3000/auth/user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        })

        if (!res.ok) return
        const data = await res.json();
        setUsername(data.username)
    }

    useEffect(() => {
        (async () => await fetchData())()
    }, [])

    return <UsernameContext.Provider value={username}>
        {children}
    </UsernameContext.Provider>
}

const username = () => useContext(UsernameContext);
export { UsernameContextProvider, username }