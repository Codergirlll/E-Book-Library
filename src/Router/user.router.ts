
import express from "express"
import { register, login } from "../controller/user.controller"
const User_Router = express.Router()

User_Router.post('/register', register)
User_Router.post('/login', login)

export = User_Router