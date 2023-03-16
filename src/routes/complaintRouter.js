const express = require('express')
const RegisterRouter = express.Router()
const bcrypt = require('bcryptjs')
const register = require('../models/userData')
const login = require('../models/loginData')
const company = require('../models/companyData')









module.exports = RegisterRouter