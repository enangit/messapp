import { Router } from "express";
import { Op } from "sequelize";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import isValid from "../utils/validateText.js";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.js";
import { NODE_ENV } from "../config/index.js";

const authRoute = Router();

authRoute.post("/login", async function(req, res) {
    try {
        const { username, password } = await req.body;

        if (!isValid(username, password)) {
            return res.status(409).json({ message: "Username or password cannot be empty!" });
        }

        const userData = await User.findOne({
            where: {
                [Op.or]: [
                    { username: username },
                    { email: username }
                ]
            }
        });


        if (!userData) {
            return res.status(409).json({ message: "Unable to find your account, please register first!" });
        }

        const isPasswordValid = await bcryptjs.compare(password, userData.password);

        if (!isPasswordValid) {
            return res.status(409).json({ message: "Username or password is incorrect!" });
        }

        const token = generateToken(userData?.id);

        if (!token) {
            throw new Error({ message: "There's an error generating token, please proceed to login!" });
        }

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000,
            secure: NODE_ENV === "production"
        });

        return res.status(200).json({ message: "Login successful!" });
    }
    catch (error) {
        console.log(`\n Login Error: `, error.message);
        return res.status(500).json({ message: "Internal server error!" })
    }
});


authRoute.post("/signup", async function(req, res) {
    const { firstName, lastName, email, username, password, confirmPassword, gender } = await req.body;

    if (
        !isValid(firstName,
            lastName,
            username,
            password,
            confirmPassword,
            gender)
    ) {
        return res.status(409).json({ message: "Please fill in all inputs." });
    }

    if (!email.trim().includes("@")) {
        return res.status(409).json({ message: "Email is invalid!" });
    }

    if (password.trim() !== confirmPassword.trim()) {
        return res.status(409).json({ message: "Password does not match!" });
    }

    try {
        const usernameExists = await User.findOne({
            where: {
                [Op.or]: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if (usernameExists) {
            return res.status(409).json({ message: "User already registered!" });
        }

        const profileURI = new URL(`https://avatar.iran.liara.run/public/${gender}?username=${username}`);

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const userId = uuidv4();

        const userCreated = await User.create({
            id: userId,
            firstName: firstName,
            lastName: lastName,
            profileUri: profileURI.toString(),
            email: email,
            username: username,
            password: hashedPassword,
            gender: gender
        });


        if (!userCreated) {
            return res.status(500).json({ message: "User creation failed, try again later!" });
        }

        const token = generateToken(userId);

        if (!token) {
            throw new Error({ message: "There's an error generating token, please proceed to login!" });
        }

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 15 * 24 * 60 * 60 * 1000,
            secure: NODE_ENV === "production"
        });

        return res.status(200).json({ message: "You are now registered!" });
    }
    catch (error) {
        console.log(`\n Registration Error: `, error.message);
        return res.status(500).json({ message: "Internal server error." });
    }

});


authRoute.post("/logout", function(req, res) {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        return res.status(200).json({ message: "Logout successful!" });
    }
    catch (error) {
        console.log(`\n Logout Error: `, error.message);
        return res.status(500).json({ message: "Internal server error." });
    }
});

export default authRoute;
