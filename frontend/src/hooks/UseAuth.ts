import { useState } from "react"
import { useForm, type FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

export const UseAuth = <T extends FieldValues>(
    schema: any,
    url: string
) => {
    const [statusCode, setStatusCode] = useState<number>()
    const [loading, setLoading] = useState<boolean>(false)

    const {
        formState: { errors },
        handleSubmit,
        register
    } = useForm<T>({
        resolver: zodResolver(schema)
    })

    const handleSubmitForm = handleSubmit(async (data) => {
        console.log(data)
    })

    return { statusCode, handleSubmitForm, loading, errors, register }
}