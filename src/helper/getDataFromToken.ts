import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { PayLoad } from "@/app/api/users/login/route";

export const getDataFromToken = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value || "";

        if (!token) {
            throw new Error("No token found");
        }

        const verify = jwt.verify(token, process.env.TOKEN_SECRET!);

        if (!verify) {
            throw new Error("Invalid token");
        }

        const decodedInfo: any = jwt.decode(token);

        if (!decodedInfo) {
            throw new Error("Invalid token");
        }

        return decodedInfo.id;

    } catch (error: any) {
        throw new Error(error.message);
    }
}