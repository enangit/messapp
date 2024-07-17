import mysql2 from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from "../config/index.js";

async function connectToDatabase() {
    const connection = await mysql2.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USERNAME,
        password: DB_PASSWORD,
    })

    try {
        const databaseCreated = await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`);

        if (databaseCreated) {
            console.log("Database has been created successfully!");
        }
    } catch (err) {
        console.log("Error: ", err.message);
    }

    connection.end();
}

export default connectToDatabase;
