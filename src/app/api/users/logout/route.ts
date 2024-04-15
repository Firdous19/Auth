import connectDatabase from "@/db/databaseConnection";
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

connectDatabase().then(() => {
    console.log("Database connected successfully");
})

export async function GET(req: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Logged out successfully",
            success: true
        });

        //Removing the token
        response.cookies.set('token', '', {
            httpOnly: true,
            expires: new Date(0)
        });

        return response;

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }

}