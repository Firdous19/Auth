import mongoose, { mongo } from "mongoose";

async function connectDatabase() {
    try {
        //! means the mongodb url will not be undefined
        await mongoose.connect(process.env.MONGO_DB_URL!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Mongo Db connected successfully")
        })

        connection.on("error", (error) => {
            console.log("Mongo Db connection error...Please make sure database is up and running", error);
            // Exiting the Application
            process.exit();
        })

    } catch (error) {
        console.log("Error in connecting the database", error);
    }
}

export default connectDatabase;