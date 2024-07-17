import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/index.js";

function generateToken(userId) {
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15d" });
    return token;
}

export default generateToken;
