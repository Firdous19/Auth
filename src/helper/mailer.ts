import nodemailer from "nodemailer";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";

// type EmailProps = {
//     email: string,
//     emailType: string,
//     userId: string
// }

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            });
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
        }

        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "c7b4041909a339",
                pass: "93e3450edd47c0"
            }
        });

        const mailOptions = {
            from: 'firdous@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
            //Todo for forgot password
            html: `<p>Click <a href="${process.env.DOMAIN}/verify-email?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br>${process.env.DOMAIN}/verify-email?token=${hashedToken}
            </p>`,
        }

        console.log(hashedToken);


        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error("Error in sending mail", error.message)
    }
}