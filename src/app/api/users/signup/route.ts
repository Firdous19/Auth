import connectDatabase from "@/db/databaseConnection";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from "bcryptjs"
import { sendEmail } from "@/helper/mailer";

type Request = {
    username: string,
    email: string,
    password: string
}

connectDatabase().then(() => {
    console.log("Database Connected Successfully");
})

export async function POST(req: NextRequest) {
    try {
        const { username, email, password }: Request = await req.json();

        // if (!username || !email || !password) {
        //     throw new Error("All Fields are required");
        // }

        // if (!email.includes("@gmail.com")) {
        //     throw new Error("Invalid email format");
        // }

        // if (password.length < 6) {
        //     throw new Error("Password must of atleast 6 character");
        // }

        console.log(username, email, password)

        const isUserExisted = await User.findOne({ email });

        if (isUserExisted) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ username, email, password: hashedPassword });

        if (!user) {
            return NextResponse.json({ error: "Error in creating user" }, { status: 400 });
        }

        console.log(user);

        //Send Verification mail
        await sendEmail({ email, emailType: "VERIFY", userId: user._id })

        return NextResponse.json({
            message: "User registered Successfully please verify your email to login",
            success: true,
            user
        });

    } catch (error: any) {
        return NextResponse.json({ errorMessage: error.message, status: 500 })
    }
}