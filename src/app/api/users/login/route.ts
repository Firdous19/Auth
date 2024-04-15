import connectDatabase from "@/db/databaseConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

async function isPasswordCorrect({ password, user }: any) {
    const result = await bcrypt.compare(password, user.password);
    return result;
}

connectDatabase().then(() => {
    console.log("Database connected successfully");
})

type SignUp = {
    email: string,
    password: string
}

export async function POST(req: NextRequest,) {
    const { email, password }: SignUp = await req.json();

    if (!email || !password) {
        return NextResponse.json({ message: "Inavalid Credentials" }, { status: 400 })
    }

    const user = await User.findOne({ email });

    if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 402 })
    }

    const isCorrect = await isPasswordCorrect({ password, user });

    if (!isCorrect) {
        return NextResponse.json({ message: "Inavlid credentials" }, { status: 403 });
    }

    return NextResponse.json({ message: "Login Successfully", user }, { status: 200 })

}