"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const Register = () => {
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [confirmPassword, setConfirmPassword]=useState("")

    const [error,setError]=useState("")

    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(password === confirmPassword){
            setError("Your password does not match.")
        }

        try {
            const res = await fetch("/api/auth/register",{
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({email, password})
            })

            const data = await res.json()

            if(!res.ok){
                setError("Registeration failed")
            }

            router.push("/login")
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>Register</div>
  )
}

export default Register