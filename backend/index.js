import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { B_PORT } from "./config/index.js";
import connectToDatabase from "./database/index.js";
import sequelize from "./database/sequelize.js";
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";

import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { Server } from "socket.io";
import { createServer } from "node:http";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.static(join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", function(req, res) {
    return res.sendFile(join(__dirname, "index.html"));
});

app.use(authRoute);
app.use(userRoute);
app.use(messageRoute);


server.listen(B_PORT, async function() {
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

const socketsConnected = new Set();
const messages = new Set();

function onConnected(socket) {
    socketsConnected.add(socket.id);

    io.emit("total-users", socketsConnected.size);

    socket.on("disconnect", function() {
        socketsConnected.delete(socket.id);
        io.emit("total-users", socketsConnected.size);
    });

    console.log(socket);

    socket.on("chat-message", function(message) {
        socket.broadcast.emit("chat-message", { message, id: socket.id });
        socket.emit("chat-message", { message, id: socket.id });
    })


}

io.on("connection", onConnected);
