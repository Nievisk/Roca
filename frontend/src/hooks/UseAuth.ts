import { useState } from "react"
import { useForm, type FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

export const UseAuth = <T extends FieldValues>(schema: any, url: string
) => {
    const [statusCode, setStatusCode] = useState<number>()
    const [loading, setLoading] = useState<boolean>(false)

    const navigate = useNavigate()

    const {
        formState: { errors },
        handleSubmit,
        register
    } = useForm<T>({
        resolver: zodResolver(schema)
    })


    const handleSubmitForm = handleSubmit(async (data) => {
        setLoading(true)

        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            credentials: "include"
        })

        if (!res.ok) {
            setStatusCode(res.status);
            setLoading(false)
            return
        }

        setLoading(false)
        navigate("/")
    })

    return { statusCode, handleSubmitForm, loading, errors, register }
}