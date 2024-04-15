import connectDatabase from "@/db/databaseConnection";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

connectDatabase().then(() => {
    console.log("Database connected successfully");
})

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { token } = await req.json();
        console.log(token);

        if (!token) {
            return NextResponse.json({ error: "token not found" }, { status: 400 });
        }

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: new Date() }
        });

        console.log("User", user);
        if (!user) {
            return NextResponse.json({ message: "Invalid Token details" }, { status: 400 })
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "User verification Successfully", success: true }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}