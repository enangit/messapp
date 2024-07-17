import jwt from "jsonwebtoken";
import { Router } from "express";
import { JWT_SECRET } from "../config/index.js";
import User from "../models/user.model.js";

const userRoute = Router();


userRoute.get("/profile", async function(req, res) {
    try {
        const token = await req.cookies;

        if (Object.keys(token).length <= 0) {
            return res.status(401).json({ message: "Unauthorize action!" });
        }

        const decoded = jwt.verify(token?.jwt, JWT_SECRET);

        if (decoded) {
            const { userId } = decoded;

            const userDetails = await User.findOne({
                where: {
                    id: userId
                },
                attributes: {
                    exclude: ["password", "id", "createdAt", "updatedAt"]
                }

            });

            return res.status(200).json({ message: "Details has been fetched!", data: userDetails });
        }
    } catch (error) {
        console.log("Profile router error: ", error.message);
        return res.status(500).json({ message: "Internal server error!" });
    }
});

export default userRoute;
