import nodemailer from "nodemailer";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NODEMAILER } from '../../const'


export const sendEmail = async ({ email, emailType, userId }: any) => {

    let html;

    try {
        const hashedToken = await bcrypt.hash(userId.toString(), 10);
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            });
            html = `<p>Click <a href="${process.env.DOMAIN}/verify-email?token=${hashedToken}">here</a> verify your email
            or copy and paste the link below in your browser. <br>${process.env.DOMAIN}/verify-email?token=${hashedToken}
            </p>`
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            });
            html = `< p > Click < a href = "${process.env.DOMAIN}/reset-password?token=${hashedToken}" > here < /a> to reset your password
            or copy and paste the link below in your browser. < br > ${process.env.DOMAIN} /reset-password?token=${hashedToken}
                < /p>`
        }

        const transport = nodemailer.createTransport({
            host: NODEMAILER.MAILER_HOST,
            port: NODEMAILER.MAILER_PORT,
            auth: {
                user: NODEMAILER.MAILER_AUTH_USER,
                pass: NODEMAILER.MAILER_AUTH_PASSWORD
            }
        });;

        const mailOptions = {
            from: 'firdous@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your Password",
            html: html
        }

        console.log(hashedToken);


        const mailResponse = await transport.sendMail(mailOptions);
        return mailResponse;

    } catch (error: any) {
        throw new Error("Error in sending mail", error.message)
    }
}