import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

import Message from "../models/message.model.js";
import { JWT_SECRET } from "../config/index.js";

const messageRoute = Router();

messageRoute.get("/message", async function(req, res) {
    try {
        const token = await req.cookies;

        if (Object.keys(token).length <= 0) {
            return res.status(401).json({ message: "Unauthorize action!" });
        }

        console.log("get message route: ", token.jwt);

        const decoded = jwt.verify(token.jwt, JWT_SECRET);

        if (decoded) {
            const { userId } = decoded;

            const messages = await Message.findAll({
                where: {
                    userId: userId
                }
            });

            return res.status(200).json({ message: "Messages has been fetched!", data: messages });
        }
    } catch (error) {
        console.log("Message router error: ", error.message);
        return res.status(500).json({ message: "Internal server error!" });
    }
});

messageRoute.post("/message", async function(req, res) {
    try {
        const token = await req.cookies;

        if (Object.keys(token).length <= 0) {
            return res.status(401).json({ message: "Unauthorize action!" });
        }

        const messageId = uuidv4();
        const { userId } = decoded;
        const messageBody = await req.body;


        const messageSaved = await Message.create({
            messageId: messageId,
            userId: userId,
            message: messageBody,
        })

        if (!messageSaved) {
            throw new Error({ message: "Error saving message!" });
        }

        return res.status(200).json({ message: "Messages has been sent!", data: messageSaved });

    } catch (error) {
        console.log("Message router error: ", error.message);
        return res.status(500).json({ message: "Internal server error!" });
    }
});

export default messageRoute;
