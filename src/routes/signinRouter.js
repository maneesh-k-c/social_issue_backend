const express = require('express')
const signinRouter = express.Router()
const bcrypt = require('bcryptjs')
const register = require('../models/userData')
const login = require('../models/loginData')
const jwt = require('jsonwebtoken')
const Company = require('../models/companyData')


signinRouter.post("/", async (req, res) => {
    const { username, password } = req.body;
    console.log(username);

    try {
        const oldUser = await login.findOne({ username })
        if (!oldUser) return res.status(404).json({ success: false, error: true, message: "User doesn't Exist" })
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)
        console.log("user", isPasswordCorrect);

        if (!isPasswordCorrect) return res.status(400).json({ success: false, error: true, message: "Incorrect password" })

        if (oldUser.role === '1') {
            const companyDetails = await Company.findOne({ login_id: oldUser._id })
            if (companyDetails) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    username: oldUser.username,
                    role: oldUser.role,
                    status:oldUser.status,
                    login_id: oldUser._id,
                    company_id: companyDetails._id
                })
            }
        }
        else {

            return res.status(200).json({
                success: true,
                error: false,
                username: oldUser.username,
                login_id: oldUser._id,
                role: oldUser.role,
            })
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
    }
})
module.exports = signinRouter