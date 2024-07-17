import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { B_PORT } from "./config/index.js";
import connectToDatabase from "./database/index.js";
import sequelize from "./database/sequelize.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", function(req, res) {
    res.status(200).send("<h1> Hello, World!</h1>");
});

app.use(authRoute);
app.use(userRoute);
app.use(messageRoute);

app.listen(B_PORT, async function() {
    sequelize.authenticate()
        .then(function() {
            console.log("Sequelize database connection success!");
        })
        .catch(function(err) {
            console.log(`Sequelize error, ${err?.message}`);
        });
    await connectToDatabase();
    console.log(`Listening on port: ${B_PORT}. App is running on http://localhost:${B_PORT}`);
})
