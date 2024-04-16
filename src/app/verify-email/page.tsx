"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
    const [token, setToken] = useState('');
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    const verifyUserEmail = async () => {
        try {
            setError(false);
            const response = await axios.post('/api/users/verify-email', { token });
            console.log("Email Verified", response.data);
            setVerified(true);
            toast.success(response.data.message);
            setTimeout(() => {
                router.push('/login');
            }, 2000)
        } catch (error) {
            console.error("Email Verification Failed");
            setError(true);
            toast.error("Email Verification Failed");
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1];
        if (urlToken) {
            setToken(urlToken);
        }
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            {/* <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2> */}

            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-5"
                onClick={verifyUserEmail}>Verify</button>

            {/* {verified && (
                <div>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )} */}
        </div>
    );
}