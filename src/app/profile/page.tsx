"use client"

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function Profile() {
    const [data, setData] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const getUserDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/users/me');
            setData(response.data.user._id);
            setLoading(false);
        } catch (error: any) {
            toast.error(error.message);
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            setLoading(true);
            await axios.get('/api/users/logout');
            setLoading(false);
            toast.success('Logged out successfully');
            router.push('/login');
        } catch (error: any) {
            setLoading(false);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl mb-3">Profile</h1>
            <hr />
            <h2 className="p-1 rounded bg-green-500">{data === '' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
            <hr />
            <button
                onClick={logout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout</button>

        </div>
    );
}