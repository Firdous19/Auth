"use client"

import React, { useEffect, useState, useRef } from "react"
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "@/app/components/Input";
import Link from "next/link";

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: '',
        password: '',
        username: ''
    })

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOnSignUp = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.post('/api/users/signup', user);
            console.log("Sign Up Success", response.data);
            setLoading(false);
            setUser({ email: '', password: '', username: '' });
            toast.success(response.data.message);
            router.push('/login');
        } catch (error: any) {
            setLoading(false);
            console.error("Sign Up Failed");
            toast.error(error.response.data.message);
        }
    }


    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0)
            setButtonDisabled(false);
        else
            setButtonDisabled(true);
    }, [user]);

    return (
        <div>
            <form className="border-2 w-[600px] px-10 py-10 mx-auto space-y-5 my-10 rounded-lg shadow-xl " onSubmit={handleOnSignUp}>
                <div className="space-y-2 text-center">
                    {loading && <p className="text-blue-600">Loading...</p>}
                    <h1 className="text-3xl font-semibold">Sign up for an account</h1>
                    <p><span className="text-gray-500">Already have an account? </span>
                        <Link href={'/login'}>Login</Link>
                    </p>
                </div>
                <div className="space-y-4">
                    <Input label="username" type="text" placeholder="Enter your username" value={user.username} onChange={handleOnChange} />
                    <Input label="email" type="email" placeholder="Enter your email"
                        value={user.email} onChange={handleOnChange} />
                    <Input label="password" type="password" placeholder="Enter your password" value={user.password} onChange={handleOnChange} />

                </div>
                <button className="bg-blue-600 py-2 px-4 rounded-md text-white border-2 border-blue-600 hover:bg-transparent hover:text-blue-600 transition-all duration-300 ease-in-out cursor-pointer" disabled={buttonDisabled} type="submit">Sign up</button>
            </form>
        </div >
    )
}   