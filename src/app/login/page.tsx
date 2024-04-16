"use client"
import { useEffect, useState } from "react"
import axios from "axios";
import Input from "../components/Input";
import Link from "next/link";
import Button from "../components/Button";
import toast, { Toaster } from "react-hot-toast";
import ToasterComp from "../components/ToasterComp";

export default function LoginPage() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleOnSignIn = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            console.log("Sign In Success", response);
            toast.success(response.data.message);
            setLoading(false);
            setUser({ email: '', password: '' });
        } catch (error) {
            setLoading(false);
            console.error("Sign In Failed");
        }
    }
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0)
            setButtonDisabled(false);
        else
            setButtonDisabled(true);
    }, [user])

    return (
        <div>
            <form className="border-2 w-[600px] px-10 py-10 mx-auto space-y-5 my-10 rounded-lg shadow-xl " onSubmit={handleOnSignIn}>
                <div className="space-y-2 text-center">
                    {loading && <p className="text-blue-600">Loading...</p>}
                    <h1 className="text-3xl font-semibold">Sign in to your account</h1>
                    <p><span className="text-gray-500">Don't have an account? </span>
                        <Link href={'/signup'}>Sign up</Link>
                    </p>
                </div>
                <div className="space-y-4">
                    <Input label="email" type="email" placeholder="Enter your email" value={user.email} onChange={handleOnChange} />
                    <Input label="password" type="password" placeholder="Enter your password" value={user.password} onChange={handleOnChange} />

                </div>
                <Button buttonDisabled={buttonDisabled} type="submit">Sign In</Button>
            </form>
        </div >
    )
}