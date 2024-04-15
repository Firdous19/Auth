import { models, Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        //required is true, if the field is not provided an error message is displayed
        required: [true, "Please provide a username"],
        unique: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordTokenExpiry: {
        type: Date
    },
    verifyToken: {
        type: String
    },
    verifyTokenExpiry: {
        type: Date
    },

}, { timestamps: true });

//Finding if the model is present or not if not making the model in MongoDb
const User = models.users || model("users", userSchema);

export default User;