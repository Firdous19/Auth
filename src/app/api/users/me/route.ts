import connectDatabase from "@/db/databaseConnection";
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/user.model";

connectDatabase().then(() => {
    console.log("Database connected successfully");
});

export async function GET(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);
        console.log(userId);

        const user = await User.findById({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({ message: "User not found", success: false }, { status: 404 });
        }

        return NextResponse.json({ message: "User Found", success: true, user }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ message: "Error in fetching information about the user" }, { status: 500 });
    }
}