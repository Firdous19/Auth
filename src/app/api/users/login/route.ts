import connectDatabase from "@/db/databaseConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

type SignUp = {
    email: string,
    password: string
}

export type PayLoad = {
    id: string,
    username: string
}

function generateToken(user: any) {
    const tokenPayLoad: PayLoad = {
        id: user._id,
        username: user.username
    }

    const token = jwt.sign(tokenPayLoad, process.env.TOKEN_SECRET!, { expiresIn: '1d' });

    return token;
}


connectDatabase().then(() => {
    console.log("Database connected successfully");
})


export async function POST(req: NextRequest,) {
    try {
        const { email, password }: SignUp = await req.json();

        if (!email || !password) {
            return NextResponse.json({ message: "Both the fields are required" }, { status: 400 })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 402 })
        }

        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
        }

        //Creating a token
        const token = generateToken(user);

        const response = NextResponse.json({
            message: "Logged In Successfull",
            success: true
        })

        //Setting the cookies
        response.cookies.set('token', token, {
            httpOnly: true
        });

        return response;

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

}