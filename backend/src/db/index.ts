import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";



const dbConnection = async (): Promise<void> => {
    try {
        const mongoUri = process.env.MONGODB_URI as string;
        if (!mongoUri) {
            throw new Error("Mongodb uri is not available")
        }
        const conn = await mongoose.connect(mongoUri, { dbName: DB_NAME });
        console.log('Connected Successfully ::  ', conn.connection.host)
    } catch (error) {
        console.error("MongoDb connection error ", error);
        process.exit(1)
    }
}

export default dbConnection;